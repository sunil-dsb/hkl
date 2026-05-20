"use client";

import { useEffect, useRef } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import gsap from "gsap";
import HoverButton from "@/components/ui/HoverButton";

export default function HeroNewSection() {
    const stair1 = useRef<HTMLDivElement>(null);
    const stair2 = useRef<HTMLDivElement>(null);
    const stair3 = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stairs: collapsed at bottom, will grow up
            gsap.set([stair1.current, stair2.current, stair3.current], {
                transformOrigin: "bottom center",
                scaleY: 0,
                force3D: true,
            });
            gsap.set(contentRef.current, { opacity: 0, y: 30 });

            const tl = gsap.timeline({ delay: 0.55 });

            // Stairs grow up with stagger (organic settle via expo.out)
            tl.to(
                stair1.current,
                { scaleY: 0.05, duration: 1.6, ease: "expo.out" },
                0
            )
                .to(
                    stair2.current,
                    { scaleY: 0.12, duration: 1.8, ease: "expo.out" },
                    0.35
                )
                .to(
                    stair3.current,
                    { scaleY: 0.2, duration: 2, ease: "expo.out" },
                    0.7
                );

            // Content fades in while the stairs are still growing
            tl.to(
                contentRef.current,
                { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
                0.5
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center">
            {/* Video */}
            <div className="absolute inset-0">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/hero-poster.jpg"
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    <source src="https://www.pexels.com/download/video/6836692/" type="video/mp4" />
                </video>

                {/* Dark overlays on the video for readability */}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
            </div>

            {/* Content: Left Aligned to flow with the stairs on the right */}
            <div className="relative z-10 w-full px-6 sm:px-12 mt-6">
                <div ref={contentRef} className="relative max-w-5xl space-y-5 md:space-y-7">
                    <span
                        aria-hidden
                        className="pointer-events-none absolute -left-5 top-3 hidden h-14 w-px bg-mint/40 sm:block sm:-left-7 md:-left-10 md:h-20 md:top-4 lg:-left-12 lg:h-24"
                    />

                    <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-[5.4rem] font-hkl font-semibold tracking-[-0.028em] leading-[1.02] text-white">
                        Start your day with <br className="hidden md:block" />
                        <span className="italic font-light text-mint font-playfair">Humility</span>,{" "}
                        <span className="italic font-light text-mint font-playfair">Kindness</span> <span className="italic">&</span>{" "}
                        <span className="italic font-light text-mint font-playfair">Love</span>.
                    </h1>

                    <p className="text-lg sm:text-xl md:text-[1.35rem] font-outfit text-white/85 max-w-2xl font-light leading-[1.55]">
                        A simple 2-minute morning practice for a clearer, more intentional day.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <HoverButton variant="mint">Start My Morning</HoverButton>
                        <button className="btn flex gap-3 px-8 py-4 bg-white/10 text-white border border-white/30 hover:bg-white/20 focus-visible:ring-white text-lg backdrop-blur-sm shadow-xl">
                            Learn More
                            <RxArrowTopRight className="text-xl" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stairs Grid overlay - matching the primary background color */}
            <div className="absolute bottom-0 left-0 w-full h-screen grid grid-cols-3 z-20 pointer-events-none">
                <div ref={stair1} className="w-full h-full bg-primary-50 will-change-transform" />
                <div ref={stair2} className="w-full h-full bg-primary-50 will-change-transform" />
                <div ref={stair3} className="w-full h-full bg-primary-50 will-change-transform" />
            </div>
        </section>
    );
}
