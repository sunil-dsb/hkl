"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function Announcement() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <section className="bg-olive text-white min-h-[40px] flex items-center justify-between px-4 sm:px-6 py-2">
            <p className="flex-1 text-center text-xs sm:text-sm leading-tight sm:leading-none font-medium">
                Join us for the 6th International HKL Conference 2026 in UK on 11th & 12th April 2026. <Link href="/conference" className="underline hover:text-mint transition-colors cursor-pointer whitespace-nowrap ml-1">Learn More</Link>
            </p>
            <button
                onClick={() => setIsVisible(false)}
                className="cursor-pointer p-1 hover:bg-white/10 rounded-full transition-colors ml-2 flex-shrink-0"
                aria-label="Close announcement"
            >
                <IoCloseSharp size={18} className="sm:w-5 sm:h-5" />
            </button>
        </section>
    );
}