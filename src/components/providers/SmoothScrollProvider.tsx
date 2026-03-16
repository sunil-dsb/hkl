"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    let cleanupCurrent = () => {};

    const bindQuery = (query: MediaQueryList, listener: () => void) => {
      if ("addEventListener" in query) {
        query.addEventListener("change", listener);
        return () => query.removeEventListener("change", listener);
      }

      query.addListener(listener);
      return () => query.removeListener(listener);
    };

    const setup = () => {
      cleanupCurrent();

      if (reduceMotionQuery.matches || !finePointerQuery.matches) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
        cleanupCurrent = () => {};
        return;
      }

      const lenis = new Lenis({
        lerp: 0.11,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.9,
      });

      const onScroll = () => ScrollTrigger.update();
      const onTick = (time: number) => lenis.raf(time * 1000);
      const onRefresh = () => lenis.resize();

      lenis.on("scroll", onScroll);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.addEventListener("refresh", onRefresh);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanupCurrent = () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        gsap.ticker.remove(onTick);
        lenis.off("scroll", onScroll);
        lenis.destroy();
      };
    };

    const handleChange = () => setup();
    const unbindReduce = bindQuery(reduceMotionQuery, handleChange);
    const unbindPointer = bindQuery(finePointerQuery, handleChange);

    setup();

    return () => {
      unbindReduce();
      unbindPointer();
      cleanupCurrent();
    };
  }, []);

  return <>{children}</>;
}
