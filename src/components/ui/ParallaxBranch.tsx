"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBranchProps {
    src: string;
    /** Position & size classes for the wrapper (absolute, top, left, width, etc.) */
    positionClassName: string;
    imageClassName?: string;
    direction: "left" | "right";
    distance?: number;
}

export default function ParallaxBranch({
    src,
    positionClassName,
    imageClassName = "",
    direction,
    distance = 120,
}: ParallaxBranchProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const section = el.closest("section") || el.parentElement;
        const xDistance = direction === "left" ? -distance : distance;

        const tween = gsap.to(el, {
            x: xDistance,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [direction, distance]);

    return (
        <div ref={wrapperRef} className={positionClassName}>
            <Image
                src={src}
                alt=""
                width={300}
                height={300}
                className={`w-full h-auto ${imageClassName}`}
                aria-hidden="true"
            />
        </div>
    );
}
