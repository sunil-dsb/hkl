"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BoxReveal, { BOX_COLORS } from "@/components/ui/BoxReveal";
import HoverButton from "@/components/ui/HoverButton";

gsap.registerPlugin(ScrollTrigger);

const heroCopyWords =
  "A simple 2-minute morning practice for a clearer, more intentional day. A more beautiful way to begin from within."
    .split(/\s+/)
    .filter(Boolean);

const aboutParagraphs = [
  "The HKL Global Movement is dedicated to inspiring everyone to awaken, go within, and reconnect with the virtues of Humility, Kindness & Love (HKL) that live within us.",
  "At a time when humanity is clouded by ego, coldness, and disconnection, HKL offers a path back home to truth, helping us make ourselves, our homes, our communities, and the world more beautiful.",
  "When we embody HKL, we transform ourselves, achieve true success, and live as our most authentic selves. In doing so, we create ripples of change that flow into our homes, our communities, and the wider world.",
  "The HKL Global Movement begins in the heart of each person and, as a secular movement, transcends culture, faith, and background, embracing and welcoming everyone.",
];

const imagePool = [
  {
    src: "https://framerusercontent.com/images/VZE7xHznRZSutJsYss9WpfKUgOU.png?width=1172&height=980",
    alt: "HKL Community",
  },
  {
    src: "https://framerusercontent.com/images/iz0KBElCjUQtg1RMVgKIn0OzhI4.png?scale-down-to=512&width=1350&height=1350",
    alt: "Mindful Practice",
  },
  {
    src: "https://framerusercontent.com/images/k4lDYkGsFFNK73IbxOnr6fcFd1Y.jpg?scale-down-to=1024&width=1865&height=1600",
    alt: "Inner Peace",
  },
  {
    src: "https://framerusercontent.com/images/7F2P3IS1PqJwFvXG8Rdj0W7eXs.png?width=1188&height=1372",
    alt: "Global Movement",
  },
  {
    src: "https://framerusercontent.com/images/0sI0giJRR4P1J7GIgXvx1sCtHOs.jpg?scale-down-to=512&width=6000&height=4000",
    alt: "HKL Reflection",
  },
  {
    src: "https://framerusercontent.com/images/ovvnYpSlsaR3IfhNsCLr61ynVmE.jpg?scale-down-to=512&width=2048&height=1365",
    alt: "HKL Gathering",
  },
  {
    src: "https://framerusercontent.com/images/IP3yjAXw4I2ud6ywrcsLZkS5xwI.jpg?width=355&height=464",
    alt: "HKL Portrait",
  },
  {
    src: "https://framerusercontent.com/images/BFJA67RPfw0o22y5ApQAe8vE.png?scale-down-to=512&width=813&height=813",
    alt: "HKL Artwork",
  },
  {
    src: "https://framerusercontent.com/images/ftU6A5k5VWDDcydJL3d98MBBE.jpg?scale-down-to=512&width=1218&height=1188",
    alt: "HKL Ceremony",
  },
  {
    src: "https://framerusercontent.com/images/H7M9STfWga0nPshdUfP1ujFeNYY.png?scale-down-to=512&width=604&height=604",
    alt: "HKL Symbol",
  },
  {
    src: "https://framerusercontent.com/images/pkSIpvOdO8V4wowcJgqjLgknU.jpg?scale-down-to=512&width=6000&height=4000",
    alt: "HKL Nature",
  },
  {
    src: "https://framerusercontent.com/images/4oD60pQtLyWkDEBcHvHxHflaEqo.png?scale-down-to=512&width=568&height=563",
    alt: "HKL Icon",
  },
  {
    src: "https://framerusercontent.com/images/vAwCMgSuSpTawsKubSVdzhNkqXc.jpg?scale-down-to=512&width=2400&height=1600",
    alt: "HKL Connection",
  },
  {
    src: "https://framerusercontent.com/images/g95gsMcKD7DFHbzKxS5yfYHuM3U.jpg?scale-down-to=512&width=4874&height=4232",
    alt: "HKL Practice",
  },
  {
    src: "https://framerusercontent.com/images/9Sz0GNVpBnTEwuHvg0RYoLrxVsQ.jpg?scale-down-to=1024&width=1536&height=2304",
    alt: "HKL Stillness",
  },
  {
    src: "https://framerusercontent.com/images/OhICYJl2YwVLBlUILpWXoxnJfc.jpg?scale-down-to=512&width=2400&height=1600",
    alt: "HKL Journey",
  },
];

const aboutImageColumns = [
  [imagePool[0], imagePool[4], imagePool[8], imagePool[12]],
  [imagePool[1], imagePool[5], imagePool[9], imagePool[13]],
  [imagePool[2], imagePool[6], imagePool[10], imagePool[14]],
  [imagePool[3], imagePool[7], imagePool[11], imagePool[15]],
];

const HeroAnimatedSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroHeaderContentRef = useRef<HTMLDivElement>(null);
  const heroCopyLayerRef = useRef<HTMLDivElement>(null);
  const subtitleTextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutColumnRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const heroSection = heroSectionRef.current;
    const heroMedia = heroMediaRef.current;
    const heroHeaderContent = heroHeaderContentRef.current;
    const heroCopyLayer = heroCopyLayerRef.current;
    const subtitleText = subtitleTextRef.current;
    const cta = ctaRef.current;
    const aboutSection = aboutSectionRef.current;

    if (
      !root ||
      !heroSection ||
      !heroMedia ||
      !heroHeaderContent ||
      !heroCopyLayer ||
      !subtitleText ||
      !cta ||
      !aboutSection
    ) {
      return;
    }

    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const heroMediaFinalScale = {
      value: 150 / Math.max(window.innerWidth, window.innerHeight),
    };
    const applyHeroMediaBase = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      heroMediaFinalScale.value =
        150 / Math.max(viewport.width, viewport.height);
    };

    const headerParking = { y: 0 };

    const computeHeaderParking = () => {
      gsap.set(heroHeaderContent, {
        y: 0,
        scale: 1,
        opacity: 1,
        transformOrigin: "left top",
      });

      const rect = heroHeaderContent.getBoundingClientRect();
      const targetTop =
        window.innerWidth >= 1024 ? window.innerHeight * 0.165 : 64;
      headerParking.y = targetTop - rect.top;
    };

    const aboutMotion = {
      xTargets: [0, 0, 0, 0] as number[],
      yTargets: [-500, -250, -250, -500] as number[],
    };

    const getAboutMotion = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Mobile + small tablet: 2 horizontal rows (top + bottom). Horizontal drift parallax.
      if (width < 768) {
        const drift = Math.min(width * 0.08, 32);
        return {
          initial: [
            { x: -drift, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: drift, y: 0 },
          ],
          xTargets: [drift, 0, 0, -drift],
          yTargets: [0, 0, 0, 0],
        };
      }

      if (width < 1024) {
        return {
          initial: [
            { x: 0, y: Math.min(height * 0.58, 560) },
            { x: -90, y: Math.min(height * 0.34, 320) },
            { x: 90, y: Math.min(height * 0.34, 320) },
            { x: 0, y: Math.min(height * 0.58, 560) },
          ],
          xTargets: [0, -90, 90, 0],
          yTargets: [
            -Math.min(height * 0.28, 260),
            -Math.min(height * 0.17, 160),
            -Math.min(height * 0.17, 160),
            -Math.min(height * 0.28, 260),
          ],
        };
      }

      return {
        initial: [
          { x: 0, y: 1000 },
          { x: -225, y: 500 },
          { x: 225, y: 500 },
          { x: 0, y: 1000 },
        ],
        xTargets: [0, -225, 225, 0],
        yTargets: [-500, -250, -250, -500],
      };
    };

    const applyColumnOffsets = () => {
      const columns = aboutColumnRefs.current;
      const motion = getAboutMotion();

      aboutMotion.xTargets = motion.xTargets;
      aboutMotion.yTargets = motion.yTargets;

      columns.forEach((column, index) => {
        if (!column) {
          return;
        }

        gsap.set(column, {
          ...motion.initial[index],
          force3D: true,
        });
      });
    };

    ScrollTrigger.addEventListener("refreshInit", applyHeroMediaBase);
    ScrollTrigger.addEventListener("refreshInit", computeHeaderParking);
    ScrollTrigger.addEventListener("refreshInit", applyColumnOffsets);

    const ctx = gsap.context(() => {
      const wordEls = Array.from(
        subtitleText.querySelectorAll<HTMLElement>("[data-hero-word]")
      );
      const totalWords = wordEls.length || 1;
      const wordRanges = wordEls.map((_, index) => ({
        start: index / totalWords,
        end: (index + 1) / totalWords,
      }));
      const setWordOpacity = wordEls.map((word) =>
        gsap.quickSetter(word, "opacity")
      );
      const setHeaderY = gsap.quickSetter(heroHeaderContent, "y", "px");
      const setHeaderScale = gsap.quickSetter(heroHeaderContent, "scale");
      const setHeaderOpacity = gsap.quickSetter(heroHeaderContent, "opacity");
      const setCopyOpacity = gsap.quickSetter(heroCopyLayer, "opacity");
      const setCtaOpacity = gsap.quickSetter(cta, "opacity");
      const setCtaY = gsap.quickSetter(cta, "y", "px");
      const setMediaScaleX = gsap.quickSetter(heroMedia, "scaleX");
      const setMediaScaleY = gsap.quickSetter(heroMedia, "scaleY");

      gsap.set(wordEls, { opacity: 0 });
      gsap.set(cta, { opacity: 0, y: 20 });
      gsap.set(heroCopyLayer, { opacity: 0 });
      gsap.set(heroHeaderContent, {
        y: 0,
        scale: 1,
        opacity: 1,
        transformOrigin: "left top",
        force3D: true,
      });
      gsap.set(heroMedia, {
        xPercent: -50,
        yPercent: -50,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      const aboutColumns = aboutColumnRefs.current.filter(
        (column): column is HTMLDivElement => column !== null
      );
      gsap.set(aboutColumns, { force3D: true });
      applyHeroMediaBase();
      computeHeaderParking();
      applyColumnOffsets();

      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: () => `+=${window.innerHeight * 3.5}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const heroHeaderParkProgress = Math.max(
            0,
            Math.min(progress / 0.24, 1)
          );
          const heroWordsProgress = Math.max(
            0,
            Math.min((progress - 0.24) / 0.24, 1)
          );
          const heroCopyAppearProgress = Math.max(
            0,
            Math.min((progress - 0.22) / 0.06, 1)
          );
          const heroCopyFade = Math.max(
            0,
            Math.min((progress - 0.64) / 0.08, 1)
          );
          const ctaProgress = Math.max(
            0,
            Math.min((progress - 0.48) / 0.12, 1)
          );
          const heroHeaderExitProgress = Math.max(
            0,
            Math.min((progress - 0.68) / 0.14, 1)
          );
          const heroMediaProgress = Math.max(
            0,
            Math.min((progress - 0.71) / 0.29, 1)
          );
          const heroHeaderScaleProgress = Math.max(
            heroHeaderExitProgress * 0.45,
            heroMediaProgress
          );

          setHeaderY(headerParking.y * heroHeaderParkProgress);
          setHeaderScale(1 - 0.2 * heroHeaderScaleProgress);
          setHeaderOpacity(1 - heroHeaderExitProgress);

          for (let i = 0; i < wordRanges.length; i++) {
            const { start, end } = wordRanges[i];
            const raw = (heroWordsProgress - start) / (end - start);
            const wordOpacity = raw <= 0 ? 0 : raw >= 1 ? 1 : raw;
            setWordOpacity[i](wordOpacity);
          }

          setCopyOpacity(heroCopyAppearProgress * (1 - heroCopyFade));
          setCtaOpacity(ctaProgress * (1 - heroCopyFade));
          setCtaY(20 * (1 - ctaProgress));

          const mediaScale =
            1 + (heroMediaFinalScale.value - 1) * heroMediaProgress;
          setMediaScaleX(mediaScale);
          setMediaScaleY(mediaScale);
        },
      });

      aboutColumnRefs.current.forEach((column, index) => {
        if (!column) {
          return;
        }

        gsap.to(column, {
          x: () => aboutMotion.xTargets[index],
          y: () => aboutMotion.yTargets[index],
          ease: "none",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", applyHeroMediaBase);
      ScrollTrigger.removeEventListener("refreshInit", computeHeaderParking);
      ScrollTrigger.removeEventListener("refreshInit", applyColumnOffsets);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="overflow-x-clip bg-primary-50">
      <section
        ref={heroSectionRef}
        className="relative h-[100svh] w-full overflow-hidden bg-primary-50"
      >
        <div
          ref={heroMediaRef}
          className="absolute left-1/2 top-1/2 z-0 h-[100svh] w-screen overflow-hidden bg-black will-change-transform"
        >
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

          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
        </div>

        <div
          className="absolute inset-0 z-10 flex items-end px-6 py-8 text-white sm:px-8 sm:py-8 lg:px-16 lg:py-14"
        >
          <div
            ref={heroHeaderContentRef}
            className="w-full origin-top-left will-change-[transform,opacity]"
          >
            <h1 className="w-full max-w-[13ch] text-left font-hkl text-[2.65rem] font-semibold leading-[1.02] tracking-tight sm:text-[3rem] lg:max-w-none lg:w-[75%] lg:text-[4.7rem]">
              Start your day with <br className="hidden lg:block" />
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
          </div>
        </div>

        <div
          ref={heroCopyLayerRef}
          className="absolute inset-0 z-10 flex items-end px-6 py-8 text-white will-change-[opacity] sm:px-8 sm:py-8 lg:px-16 lg:py-14"
          style={{ opacity: 0 }}
        >
          <div className="w-full space-y-6 md:space-y-8">
            <p
              ref={subtitleTextRef}
              className="w-full max-w-[19rem] text-left text-[0.98rem] font-extralight leading-[1.18] tracking-[-0.015em] text-white/88 sm:max-w-[25rem] sm:text-[1.08rem] lg:max-w-none lg:w-[46%] lg:text-[1.68rem]"
            >
              {heroCopyWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  data-hero-word
                  className="mb-[0.08em] mr-[0.22em] inline-block"
                  style={{ opacity: 0 }}
                >
                  {word}
                </span>
              ))}
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap items-center justify-start gap-4 will-change-[transform,opacity]"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              <HoverButton variant="mint">Start My Morning</HoverButton>
              <button className="btn flex gap-3 border border-white/30 bg-white/10 px-6 py-4 text-lg text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white">
                Learn More
                <RxArrowTopRight className="text-lg" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={aboutSectionRef}
        className="relative z-20 mt-[250svh] flex min-h-screen w-full items-center overflow-hidden bg-primary-100 py-36 contain-[paint] sm:py-40 md:py-28 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-between px-4 py-10 sm:px-6 sm:py-12 md:flex-row md:items-center md:px-8 lg:px-14 lg:py-16">
          {aboutImageColumns.map((column, columnIndex) => {
            const hiddenOnMobile = columnIndex === 1 || columnIndex === 2;
            return (
            <div
              key={`about-col-${columnIndex}`}
              ref={(node) => {
                aboutColumnRefs.current[columnIndex] = node;
              }}
              className={`relative items-center justify-around will-change-transform ${
                hiddenOnMobile
                  ? "hidden"
                  : "flex flex-row gap-3 sm:gap-4"
              } md:flex md:h-[108%] md:flex-col md:gap-0 md:justify-around lg:h-[125%]`}
            >
              {column.map((image, imageIndex) => (
                <div
                  key={`${columnIndex}-${imageIndex}-${image.src}`}
                  className="relative h-[3.75rem] w-[3.75rem] rounded-[14px] bg-primary-50/92 p-1 shadow-[0_10px_30px_rgba(38,37,30,0.08)] ring-1 ring-primary-200/80 sm:h-[4.5rem] sm:w-[4.5rem] md:h-[5.6rem] md:w-[5.6rem] lg:h-[8.2rem] lg:w-[8.2rem]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 639px) 60px, (max-width: 1023px) 90px, 132px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            );
          })}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[24rem] px-6 sm:max-w-[28rem] md:max-w-[31rem] lg:w-[40%] lg:max-w-xl lg:px-6">
          <div className="space-y-8">
            <BoxReveal
              paragraphs={aboutParagraphs}
              paragraphClassName="text-[0.99rem] leading-[1.42] text-primary-950/82 sm:text-[1.04rem] lg:text-[1.05rem]"
              boxColor={BOX_COLORS.mint}
              initialProgress={0.35}
              triggerStart="top 82%"
              triggerEnd="bottom 10%"
              scrub={1.6}
              overlap={10}
            />
            <div className="flex justify-center pt-4">
              <HoverButton variant="primary">Begin Practice</HoverButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroAnimatedSection;
