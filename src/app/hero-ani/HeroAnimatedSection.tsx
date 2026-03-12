"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BoxReveal, { BOX_COLORS } from "@/components/ui/BoxReveal";

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
];

const aboutImageColumns = [
  [imagePool[0], imagePool[1], imagePool[2], imagePool[3]],
  [imagePool[1], imagePool[2], imagePool[3], imagePool[0]],
  [imagePool[2], imagePool[3], imagePool[0], imagePool[1]],
  [imagePool[3], imagePool[0], imagePool[1], imagePool[2]],
];

const HeroAnimatedSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroHeaderLayerRef = useRef<HTMLDivElement>(null);
  const heroCopyLayerRef = useRef<HTMLDivElement>(null);
  const subtitleTextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutColumnRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    const heroSection = heroSectionRef.current;
    const heroMedia = heroMediaRef.current;
    const heroHeaderLayer = heroHeaderLayerRef.current;
    const heroCopyLayer = heroCopyLayerRef.current;
    const subtitleText = subtitleTextRef.current;
    const cta = ctaRef.current;
    const aboutSection = aboutSectionRef.current;

    if (
      !root ||
      !heroSection ||
      !heroMedia ||
      !heroHeaderLayer ||
      !heroCopyLayer ||
      !subtitleText ||
      !cta ||
      !aboutSection
    ) {
      return;
    }

    const applyHeroMediaBase = () => {
      gsap.set(heroMedia, {
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
      });
    };

    const applyColumnOffsets = () => {
      const isMobile = window.innerWidth < 1000;
      const columns = aboutColumnRefs.current;

      if (columns[0]) {
        gsap.set(columns[0], { x: 0, y: 1000 });
      }

      if (columns[1]) {
        gsap.set(columns[1], { x: isMobile ? 0 : -225, y: 500 });
      }

      if (columns[2]) {
        gsap.set(columns[2], { x: isMobile ? 0 : 225, y: 500 });
      }

      if (columns[3]) {
        gsap.set(columns[3], { x: 0, y: 1000 });
      }
    };

    ScrollTrigger.addEventListener("refreshInit", applyHeroMediaBase);
    ScrollTrigger.addEventListener("refreshInit", applyColumnOffsets);

    const ctx = gsap.context(() => {
      const wordEls = Array.from(
        subtitleText.querySelectorAll<HTMLElement>("[data-hero-word]")
      );
      const totalWords = wordEls.length || 1;
      const setHeaderY = gsap.quickSetter(heroHeaderLayer, "yPercent");
      const setCopyOpacity = gsap.quickSetter(heroCopyLayer, "opacity");
      const setCtaOpacity = gsap.quickSetter(cta, "opacity");
      const setCtaY = gsap.quickSetter(cta, "y", "px");
      const setMediaWidth = gsap.quickSetter(heroMedia, "width", "px");
      const setMediaHeight = gsap.quickSetter(heroMedia, "height", "px");
      const setMediaRadius = gsap.quickSetter(heroMedia, "borderRadius", "px");

      gsap.set(wordEls, { opacity: 0 });
      gsap.set(cta, { opacity: 0, y: 20 });
      gsap.set(heroCopyLayer, { opacity: 1 });
      applyHeroMediaBase();
      applyColumnOffsets();

      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: () => `+=${window.innerHeight * 3.5}`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const heroHeaderProgress = Math.min(progress / 0.29, 1);
          const heroWordsProgress = Math.max(
            0,
            Math.min((progress - 0.29) / 0.21, 1)
          );
          const heroCopyFade = Math.max(
            0,
            Math.min((progress - 0.64) / 0.08, 1)
          );
          const ctaProgress = Math.max(
            0,
            Math.min((progress - 0.45) / 0.1, 1)
          );
          const heroMediaProgress = Math.max(
            0,
            Math.min((progress - 0.71) / 0.29, 1)
          );

          setHeaderY(-heroHeaderProgress * 100);

          wordEls.forEach((word, index) => {
            const wordStart = index / totalWords;
            const wordEnd = (index + 1) / totalWords;
            const wordOpacity = Math.max(
              0,
              Math.min(
                (heroWordsProgress - wordStart) / (wordEnd - wordStart),
                1
              )
            );

            word.style.opacity = String(wordOpacity);
          });

          setCopyOpacity(1 - heroCopyFade);
          setCtaOpacity(ctaProgress * (1 - heroCopyFade));
          setCtaY(20 * (1 - ctaProgress));

          const heroMediaWidth = gsap.utils.interpolate(
            window.innerWidth,
            150,
            heroMediaProgress
          );
          const heroMediaHeight = gsap.utils.interpolate(
            window.innerHeight,
            150,
            heroMediaProgress
          );
          const heroMediaRadius = gsap.utils.interpolate(0, 10, heroMediaProgress);

          setMediaWidth(heroMediaWidth);
          setMediaHeight(heroMediaHeight);
          setMediaRadius(heroMediaRadius);
        },
      });

      aboutColumnRefs.current.forEach((column, index) => {
        if (!column) {
          return;
        }

        const targetY = index === 1 || index === 2 ? -250 : -500;

        gsap.to(column, {
          y: targetY,
          ease: "none",
          scrollTrigger: {
            trigger: aboutSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", applyHeroMediaBase);
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
          className="absolute left-1/2 top-1/2 z-0 h-[100svh] w-screen -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black will-change-[width,height,border-radius]"
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
          ref={heroHeaderLayerRef}
          className="absolute inset-0 z-10 flex items-end px-6 py-8 text-white sm:px-8 sm:py-8 lg:px-16 lg:py-14 will-change-transform"
        >
          <div className="w-full">
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
          className="absolute inset-0 z-10 flex items-end px-6 py-8 text-white sm:px-8 sm:py-8 lg:px-16 lg:py-14"
        >
          <div className="w-full space-y-6 md:space-y-8">
            <p
              ref={subtitleTextRef}
              className="w-full max-w-[20rem] text-left text-[1.05rem] font-light leading-[1.2] text-white/90 sm:max-w-[28rem] sm:text-xl lg:max-w-none lg:w-[50%] lg:text-[1.95rem]"
            >
              {heroCopyWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  data-hero-word
                  className="mb-[0.08em] mr-[0.22em] inline-block"
                >
                  {word}
                </span>
              ))}
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap items-center justify-start gap-4"
            >
              <button className="btn-mint flex gap-3 px-6 py-4">
                Start My Morning
              </button>
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
        className="relative mt-[275svh] min-h-[120svh] w-full overflow-hidden bg-primary-100 lg:h-[100svh] lg:min-h-0"
      >
        <div className="absolute inset-0 flex items-center justify-between px-4 py-10 sm:px-6 lg:px-16 lg:py-16">
          {aboutImageColumns.map((column, columnIndex) => (
            <div
              key={`about-col-${columnIndex}`}
              ref={(node) => {
                aboutColumnRefs.current[columnIndex] = node;
              }}
              className="relative flex h-[112%] flex-col justify-around will-change-transform lg:h-[125%]"
            >
              {column.map((image, imageIndex) => (
                <div
                  key={`${columnIndex}-${imageIndex}-${image.src}`}
                  className="relative h-[3.9rem] w-[3.9rem] overflow-hidden rounded-[10px] opacity-25 grayscale sm:h-[4.75rem] sm:w-[4.75rem] lg:h-[7.8rem] lg:w-[7.8rem] lg:opacity-100 lg:grayscale-0"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 999px) 76px, 125px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto flex min-h-[120svh] w-full max-w-xl items-center justify-center px-6 py-24 lg:absolute lg:left-1/2 lg:top-1/2 lg:min-h-0 lg:w-[40%] lg:max-w-xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-6 lg:py-0">
          <div className="space-y-8">
            <BoxReveal
              paragraphs={aboutParagraphs}
              boxColor={BOX_COLORS.mint}
              triggerStart="top 82%"
              triggerEnd="bottom 10%"
              scrub={1.6}
              overlap={10}
            />
            <div className="flex justify-center pt-4">
              <button className="btn-primary">Begin Practice</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroAnimatedSection;
