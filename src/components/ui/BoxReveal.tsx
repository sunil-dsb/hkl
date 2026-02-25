"use client";

import { useEffect, useRef } from "react";
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
    boxColor?: string;
    boxRadius?: "full" | "md";
}

export default function BoxReveal({
    paragraphs,
    className = "",
    boxColor = P100_RGB,
    boxRadius = "full",
}: BoxRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
        const overlapIn = 15;

        const scaleIn = 1 / Math.min(
            1 + overlapIn / totalWords,
            1 + (totalWords - 1) / totalWords + overlapIn / totalWords
        );

        const st = ScrollTrigger.create({
            trigger: container,
            start: "top 95%",
            end: "bottom 25%",
            scrub: 1.5,
            onUpdate: ({ progress }) => {
                for (let i = 0; i < totalWords; i++) {
                    const start = (i / totalWords) * scaleIn;
                    const end = start + (overlapIn / totalWords) * scaleIn;
                    const wp = progress <= start ? 0 : progress >= end ? 1 : (progress - start) / (end - start);

                    wordEls[i].style.opacity = String(wp);

                    const boxFade = wp >= 0.9 ? (wp - 0.9) / 0.1 : 0;
                    wordEls[i].style.backgroundColor = `rgba(${boxColor}, ${Math.max(0, 1 - boxFade) * BOX_OPACITY})`;

                    const tp = wp >= 0.9 ? (wp - 0.9) / 0.1 : 0;
                    if (spanEls[i]) spanEls[i].style.opacity = String(Math.sqrt(tp));
                }
            },
        });

        return () => {
            st.kill();
            for (const w of wordEls) { w.style.opacity = ""; w.style.backgroundColor = ""; }
            for (const s of spanEls) s.style.opacity = "";
        };
    }, [boxColor]);

    const radiusClass = boxRadius === "full" ? "rounded-full" : "rounded-md";

    return (
        <div ref={containerRef} className={`space-y-2 ${className}`}>
            {paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="font-outfit text-primary-950/80 leading-tighter text-justify">
                    {para.split(/\s+/).filter(Boolean).map((word, wIdx) => (
                        <span
                            key={wIdx}
                            className={`br-word inline-block relative mr-[0.2em] ${radiusClass} px-[0.3em] py-[0.1em]`}>
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
