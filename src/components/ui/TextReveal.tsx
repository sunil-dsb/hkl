"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealSegment {
    text: string;
    className?: string;
}

interface TextRevealProps {
    segments: TextRevealSegment[];
    pClassName?: string;
    baseOpacity?: number;
    overlap?: number;
}

export default function TextReveal({
    segments,
    pClassName = "",
    baseOpacity = 0.15,
    overlap = 12,
}: TextRevealProps) {
    const containerRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const wordEls = Array.from(container.querySelectorAll<HTMLElement>(".tr-word"));
        if (wordEls.length === 0) return;

        const totalWords = wordEls.length;

        // Set initial low-opacity state
        for (const w of wordEls) w.style.opacity = String(baseOpacity);

        const scale = 1 / Math.min(
            1 + overlap / totalWords,
            1 + (totalWords - 1) / totalWords + overlap / totalWords
        );

        const st = ScrollTrigger.create({
            trigger: container,
            start: "top 95%",
            end: "bottom 20%",
            scrub: 1.5,
            onUpdate: ({ progress }) => {
                for (let i = 0; i < totalWords; i++) {
                    const start = (i / totalWords) * scale;
                    const end = start + (overlap / totalWords) * scale;
                    const wp =
                        progress <= start ? 0
                            : progress >= end ? 1
                                : (progress - start) / (end - start);

                    // Linearly interpolate from baseOpacity → 1
                    wordEls[i].style.opacity = String(baseOpacity + wp * (1 - baseOpacity));
                }
            },
        });

        return () => {
            st.kill();
            for (const w of wordEls) w.style.opacity = "";
        };
    }, [baseOpacity, overlap]);

    return (
        <p ref={containerRef} className={pClassName}>
            {segments.map((seg, sIdx) =>
                seg.text.split(/\s+/).filter(Boolean).map((word, wIdx) => (
                    <span
                        key={`${sIdx}-${wIdx}`}
                        className={`tr-word inline-block mr-[0.25em] mb-[0.1em] ${seg.className ?? ""}`}
                    >
                        {word}
                    </span>
                ))
            )}
        </p>
    );
}
