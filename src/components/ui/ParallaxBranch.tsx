"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBranchProps {
    src: string;
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

    useLayoutEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const section = el.closest("section") || el.parentElement;
        const xDistance = direction === "left" ? -distance : distance;

        gsap.set(el, { force3D: true });

        const tween = gsap.to(el, {
            x: xDistance,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                invalidateOnRefresh: true,
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
                className={`h-auto w-full ${imageClassName}`}
                aria-hidden="true"
            />
        </div>
    );
}
