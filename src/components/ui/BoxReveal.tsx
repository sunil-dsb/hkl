"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// mint   = #EAF0DD = rgb(234, 240, 221)
// p-100  = #f3f2eb = rgb(243, 242, 235)
const MINT_RGB = "234, 240, 221";
const P100_RGB = "235, 233, 223";
const BOX_OPACITY = 0.9;

interface BoxRevealProps {
    paragraphs: string[];
    className?: string;
    paragraphClassName?: string;
    wordClassName?: string;
    boxColor?: string;
    boxOpacity?: number;
    boxRadius?: "full" | "md";
    initialProgress?: number;
    triggerStart?: string;
    triggerEnd?: string;
    scrub?: number;
    overlap?: number;
}

export default function BoxReveal({
    paragraphs,
    className = "",
    paragraphClassName = "",
    wordClassName = "",
    boxColor = P100_RGB,
    boxOpacity = BOX_OPACITY,
    boxRadius = "full",
    initialProgress = 0,
    triggerStart = "top 95%",
    triggerEnd = "bottom 25%",
    scrub = 1.5,
    overlap = 15,
}: BoxRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const wordEls = Array.from(container.querySelectorAll<HTMLElement>(".br-word"));
        const spanEls = Array.from(container.querySelectorAll<HTMLElement>(".br-word > span"));

        if (wordEls.length === 0) return;

        for (const w of wordEls) {
            w.style.opacity = "0";
            w.style.backgroundColor = `rgba(${boxColor}, 0)`;
        }
        for (const s of spanEls) s.style.opacity = "0";

        const totalWords = wordEls.length;
        const overlapIn = overlap;
        const clampedInitialProgress = Math.max(0, Math.min(initialProgress, 0.95));
        const wordRanges = wordEls.map((_, i) => ({
            start: (i / totalWords),
            end: (i / totalWords) + (overlapIn / totalWords),
        }));
        const opacitySetters = wordEls.map((el) => gsap.quickSetter(el, "opacity"));
        const bgSetters = wordEls.map((el) => gsap.quickSetter(el, "backgroundColor"));
        const textOpacitySetters = spanEls.map((el) => gsap.quickSetter(el, "opacity"));

        const scaleIn = 1 / Math.min(
            1 + overlapIn / totalWords,
            1 + (totalWords - 1) / totalWords + overlapIn / totalWords
        );

        for (let i = 0; i < wordRanges.length; i++) {
            wordRanges[i].start *= scaleIn;
            wordRanges[i].end *= scaleIn;
        }

        const applyProgress = (progress: number) => {
            for (let i = 0; i < totalWords; i++) {
                const { start, end } = wordRanges[i];
                const wp = progress <= start ? 0 : progress >= end ? 1 : (progress - start) / (end - start);

                opacitySetters[i](wp);

                const boxFade = wp >= 0.9 ? (wp - 0.9) / 0.1 : 0;
                bgSetters[i](`rgba(${boxColor}, ${Math.max(0, 1 - boxFade) * boxOpacity})`);

                const tp = wp >= 0.9 ? (wp - 0.9) / 0.1 : 0;
                if (textOpacitySetters[i]) textOpacitySetters[i](Math.sqrt(tp));
            }
        };

        applyProgress(clampedInitialProgress);

        const st = ScrollTrigger.create({
            trigger: container,
            start: triggerStart,
            end: triggerEnd,
            scrub,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
                const effectiveProgress =
                    clampedInitialProgress + progress * (1 - clampedInitialProgress);

                applyProgress(effectiveProgress);
            },
        });

        return () => {
            st.kill();
            for (const w of wordEls) { w.style.opacity = ""; w.style.backgroundColor = ""; }
            for (const s of spanEls) s.style.opacity = "";
        };
    }, [boxColor, boxOpacity, initialProgress, overlap, scrub, triggerEnd, triggerStart]);

    const radiusClass = boxRadius === "full" ? "rounded-full" : "rounded-md";

    return (
        <div ref={containerRef} className={`space-y-2 ${className}`}>
            {paragraphs.map((para, pIdx) => (
                <p
                    key={pIdx}
                    className={`font-outfit text-primary-950/80 leading-tighter text-justify ${paragraphClassName}`}
                >
                    {para.split(/\s+/).filter(Boolean).map((word, wIdx) => (
                        <span
                            key={wIdx}
                            className={`br-word inline-block relative mr-[0.2em] ${radiusClass} px-[0.3em] py-[0.1em] ${wordClassName}`}>
                            <span style={{ position: "relative" }}>{word}</span>
                        </span>
                    ))}
                </p>
            ))}
        </div>
    );
}

// Convenience re-export so callers don't need to remember RGB strings
export const BOX_COLORS = {
    mint: MINT_RGB,
    primary: P100_RGB,
} as const;
