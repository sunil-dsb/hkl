"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const virtues = [
  {
    label: "First Virtue",
    title: "Humility",
    paragraphs: [
      "Humility is the opposite of Ego. Ego is the false idea that we are separate from, or better than, others. It is the “I, Me, and Mine” voice in our head that constantly seeks to possess and gain attention, credit, and control. Humility arises out of the consciousness that is grateful.",
      "It is living free from ego, as a lifelong learner who is open to growth and aware that we are part of something greater than ourselves. It allows us to listen deeply and grow through our experiences.",
    ],
    image:
      "https://framerusercontent.com/images/SqQ3sb2r3ovRvZmGZI0K9UJskxo.jpeg?width=683&height=1024",
    alt: "Humility — a quiet moment of reflection",
  },
  {
    label: "Second Virtue",
    title: "Kindness",
    paragraphs: [
      "Kindness is the opposite of self-centeredness. Kindness is rooted in humility and arises from the deep understanding of truth that all life is interconnected, calling us to treat every being with care & compassion.",
      "It means being thoughtful, gentle, and considerate in how we think, how we speak and how we act.",
    ],
    image:
      "https://framerusercontent.com/images/8TBIV05P4sdyFyEnCqnLiAE74o.jpeg?scale-down-to=512&width=1600&height=1066",
    alt: "Kindness — a global movement of care",
  },
  {
    label: "Third Virtue",
    title: "Love",
    paragraphs: [
      "Love is the universal force, arising from humility at the heart of all life. To love is to surrender unconditionally. As the heart awakens to love, separation dissolves — fear and hatred fall away and we recognize our oneness.",
      "Thus, we become capable of creating a world where compassion flows as a natural expression of our being.",
    ],
    image:
      "https://framerusercontent.com/images/k4lDYkGsFFNK73IbxOnr6fcFd1Y.jpg?scale-down-to=512&width=1865&height=1600",
    alt: "Love — the heart awakening",
  },
];

export default function StickyVirtues() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-sticky-steps-item]")
    );
    if (!items.length) return;

    let currentActive = -1;
    const setActiveStep = (activeIndex: number) => {
      if (currentActive === activeIndex) return;
      currentActive = activeIndex;
      for (let i = 0; i < items.length; i++) {
        const status =
          i < activeIndex ? "before" : i > activeIndex ? "after" : "active";
        items[i].setAttribute("data-sticky-steps-item-status", status);
      }
    };

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        const anchor = item.querySelector<HTMLElement>(
          "[data-sticky-steps-anchor]"
        );
        if (!anchor) return;

        ScrollTrigger.create({
          trigger: anchor,
          start: "center center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        });
      });
    }, root);

    setActiveStep(0);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      data-sticky-steps-init
      className="sticky-steps relative overflow-clip bg-primary-50 contain-[paint]"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div className="pb-2 pt-16 text-center sm:pt-20 lg:pt-24">
          <span className="badge">Three Virtues</span>
          <h2 className="mt-2 font-hkl text-4xl font-bold leading-[1.05] tracking-tight text-primary-950 sm:text-5xl md:text-6xl">
            The heart of{" "}
            <span className="font-playfair font-light italic text-olive">
              HKL
            </span>
          </h2>
        </div>

        {/* Collection — positioned ancestor so each item's absolute media stacks here */}
        <div className="sticky-steps__collection relative flex min-h-screen">
          <div className="flex flex-1 flex-col gap-y-16 py-12 sm:gap-y-20 sm:py-16 lg:gap-y-[30dvh] lg:py-[calc(50dvh-7.5em)]">
            {virtues.map((v, i) => (
              <div
                key={v.title}
                data-sticky-steps-item
                data-sticky-steps-item-status={i === 0 ? "active" : "after"}
                className="sticky-steps__item"
              >
                {/* Text — in flow, takes left half on lg+ */}
                <div
                  data-sticky-steps-anchor
                  className="sticky-virtue-text flex flex-col gap-5 sm:gap-6 lg:w-3/5 lg:pr-16"
                >
                  <span className="badge">{v.label}</span>
                  <h3 className="font-hkl text-4xl font-bold leading-[1.05] tracking-tight text-olive sm:text-5xl md:text-6xl">
                    {v.title}
                  </h3>
                  <div className="mt-2 flex flex-col gap-4">
                    {v.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="font-outfit text-base leading-[1.65] text-primary-950/75 sm:text-lg"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Media — absolute on lg+ (referencing the collection), in flow on mobile */}
                <div className="mt-10 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-2/5 lg:pl-12">
                  <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-full lg:items-center lg:justify-end">
                    <div className="sticky-virtue-visual relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-full bg-primary-100 lg:mx-0 lg:max-w-xs lg:self-center">
                      <Image
                        src={v.image}
                        alt={v.alt}
                        fill
                        sizes="(max-width: 1024px) 24rem, 20rem"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
