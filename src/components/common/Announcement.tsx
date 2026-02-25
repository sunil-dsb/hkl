"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const ANNOUNCEMENT_TEXT = "Join us for the 6th International HKL Conference 2026 in UK on 11th & 12th April 2026.";
const TICKET_URL = "https://www.eventbrite.com/e/6th-international-humility-kindness-love-hkl-conference-telford-uk-tickets-1983385930710?aff=oddtdtcreator";

function MarqueeItem() {
    return (
        <span className="flex items-center gap-3 whitespace-nowrap">
            <span>{ANNOUNCEMENT_TEXT}</span>
            <Link
                href={TICKET_URL}
                className="underline hover:text-mint transition-colors"
            >
                Reserve your Free Seat →
            </Link>
        </span>
    );
}

export default function Announcement() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <section className="bg-olive text-white min-h-[40px] flex items-center py-2 overflow-hidden relative">

            <div className="flex animate-marquee hover:[animation-play-state:paused]">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-10 px-5 text-xs sm:text-sm font-medium shrink-0">
                        <MarqueeItem />
                    </div>
                ))}
            </div>

            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-0 top-0 bottom-0 z-10 cursor-pointer px-3 sm:px-4 hover:bg-white/10 transition-colors bg-olive"
                aria-label="Close announcement"
            >
                <IoCloseSharp size={18} className="sm:w-5 sm:h-5" />
            </button>
        </section>
    );
}