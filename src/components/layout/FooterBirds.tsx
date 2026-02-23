"use client";

import dynamic from 'next/dynamic';

const DotLottieReact = dynamic(
    () =>
        import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
    { ssr: false }
);

export default function FooterBirds() {
    return (
        <div className="absolute top-0 h-full w-[150%] md:w-full pointer-events-none z-0 overflow-hidden opacity-60 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0" aria-hidden="true">
            <DotLottieReact
                src="/birds-json.lottie"
                loop={true}
                autoplay={true}
                className="w-full h-full object-cover"
                style={{ width: "100%", height: "90%" }}
            />
        </div>
    );
}
