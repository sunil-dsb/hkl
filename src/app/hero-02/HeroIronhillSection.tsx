"use client";

import { useLayoutEffect, useRef } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverButton from "@/components/ui/HoverButton";

gsap.registerPlugin(ScrollTrigger);

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float u_progress;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_spread;
  varying vec2 v_uv;

  float hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += vnoise(p * 1.0) * 0.5;
    v += vnoise(p * 2.0) * 0.25;
    v += vnoise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
    float dissolveEdge = uv.y - u_progress * 1.2;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * u_spread;
    float pixelSize = 1.0 / u_resolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);
    gl_FragColor = vec4(u_color, alpha);
  }
`;

type DissolveCanvas = {
  setProgress: (p: number) => void;
  resize: () => void;
  cleanup: () => void;
};

function setupDissolveCanvas(canvas: HTMLCanvasElement): DissolveCanvas | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    premultipliedAlpha: false,
  });
  if (!gl) return null;

  const compile = (type: number, source: string) => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };

  const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  const uProgress = gl.getUniformLocation(program, "u_progress");
  const uResolution = gl.getUniformLocation(program, "u_resolution");
  const uColor = gl.getUniformLocation(program, "u_color");
  const uSpread = gl.getUniformLocation(program, "u_spread");

  gl.uniform3f(uColor, 0xf3 / 255, 0xf2 / 255, 0xeb / 255);
  gl.uniform1f(uSpread, 0.5);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  let progress = 0;
  let needsRender = true;
  let rafId = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.round(rect.width * dpr);
    const ph = Math.round(rect.height * dpr);
    canvas.width = pw;
    canvas.height = ph;
    gl.viewport(0, 0, pw, ph);
    gl.uniform2f(uResolution, pw, ph);
    needsRender = true;
  };

  resize();

  const render = () => {
    gl.uniform1f(uProgress, progress);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  const tick = () => {
    if (needsRender) {
      render();
      needsRender = false;
    }
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return {
    setProgress: (p: number) => {
      progress = p;
      needsRender = true;
    },
    resize,
    cleanup: () => {
      if (rafId) cancelAnimationFrame(rafId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}

const aboutParagraphs = [
  "The HKL Global Movement is dedicated to inspiring everyone to awaken, go within, and reconnect with the virtues of Humility, Kindness & Love that live within us.",
  "At a time when humanity is clouded by ego, coldness, and disconnection, HKL offers a path back home to truth — helping us make ourselves, our homes, our communities, and the world more beautiful.",
  "When we embody HKL, we transform ourselves, achieve true success, and live as our most authentic selves. In doing so, we create ripples of change that flow into our homes, our communities, and the wider world.",
  "The HKL Global Movement begins in the heart of each person and, as a secular movement, transcends culture, faith, and background — embracing and welcoming everyone.",
];

const HeroIronhillSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const heroSection = heroSectionRef.current;
    const heroCanvas = heroCanvasRef.current;
    const aboutSection = aboutSectionRef.current;
    if (!root || !heroSection || !heroCanvas || !aboutSection) return;

    const heroDissolve = setupDissolveCanvas(heroCanvas);

    const ctx = gsap.context(() => {
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (colsRef.current) {
        gsap.from(colsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: colsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, root);

    const heroDissolveST = ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        heroDissolve?.setProgress(Math.min(self.progress * 1.1, 1.1));
      },
    });

    const onResize = () => {
      heroDissolve?.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      heroDissolveST.kill();
      ctx.revert();
      heroDissolve?.cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} className="overflow-x-clip bg-primary-50">
      <section
        ref={heroSectionRef}
        className="relative h-screen w-full overflow-hidden bg-primary-950 text-mint"
      >
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source
              src="https://www.pexels.com/download/video/6836692/"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/15" />
        </div>

        <div className="absolute left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center px-4 text-center text-white sm:px-6">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            <h1 className="font-hkl text-5xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
              Start your day with <br className="hidden md:block" />
              <span className="font-playfair font-light italic text-mint">
                Humility
              </span>
              ,{" "}
              <span className="font-playfair font-light italic text-mint">
                Kindness
              </span>{" "}
              <span className="italic">&amp;</span>{" "}
              <span className="font-playfair font-light italic text-mint">
                Love
              </span>
              .
            </h1>

            <p className="mx-auto max-w-2xl font-outfit text-lg font-light text-white/90 sm:text-xl">
              A simple 2-minute morning practice for a clearer, more intentional
              day.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <HoverButton variant="mint">Start My Morning</HoverButton>
              <button className="btn flex gap-3 border border-white/30 bg-white/10 px-6 py-4 text-lg text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white">
                Learn More
                <RxArrowTopRight className="text-md" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <canvas
          ref={heroCanvasRef}
          className="pointer-events-none absolute bottom-0 left-0 z-20 h-full w-full"
          aria-hidden="true"
        />
      </section>

      <section
        ref={aboutSectionRef}
        className="relative z-30 w-full overflow-hidden bg-primary-100 pt-16 pb-28 contain-[paint] sm:pt-20 sm:pb-32 md:pt-24 md:pb-36 lg:pt-28 lg:pb-44"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="text-center">
            <span className="font-outfit text-[0.7rem] font-medium uppercase tracking-[0.4em] text-primary-900/55 sm:text-xs">
              Our Movement
            </span>
          </div>

          <blockquote
            ref={quoteRef}
            className="relative mx-auto mt-6 max-w-4xl text-center sm:mt-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-playfair text-[6rem] leading-none text-olive/15 sm:-top-8 sm:text-[8rem]"
            >
              &ldquo;
            </span>
            <p className="relative font-hkl text-2xl font-bold leading-[1.22] tracking-tight text-primary-950 sm:text-3xl md:text-4xl lg:text-5xl">
              The most beautiful way to live is with{" "}
              <span className="text-olive">Humility</span>,{" "}
              <span className="text-olive">Kindness</span>, and{" "}
              <span className="text-olive">Love</span>.
            </p>
            <cite className="mt-6 inline-block font-outfit text-[0.7rem] font-medium uppercase not-italic tracking-[0.32em] text-primary-900/55 sm:mt-8 sm:text-xs">
              &mdash; Baba Ji
            </cite>
          </blockquote>

          <div className="my-14 flex justify-center sm:my-20">
            <div className="h-px w-20 bg-primary-900/20 sm:w-24" />
          </div>

          <div
            ref={colsRef}
            className="mx-auto max-w-4xl columns-1 gap-x-10 md:columns-2 md:gap-x-12 lg:gap-x-16"
          >
            {aboutParagraphs.map((p, i) => (
              <p
                key={i}
                className="mb-6 break-inside-avoid text-justify font-outfit text-base leading-relaxed text-primary-950/85 last:mb-0 lg:text-[1.06rem]"
              >
                {p}
              </p>
            ))}
          </div>

          <div ref={ctaRef} className="mt-14 flex justify-center sm:mt-20">
            <HoverButton variant="primary">Begin Practice</HoverButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroIronhillSection;
