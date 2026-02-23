"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { GoArrowRight, GoListUnordered, GoX } from "react-icons/go";

const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Stories", href: "/stories" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Support Us", href: "/support" },
    { name: "Contact Us", href: "/contact", primary: true },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect for pill
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-6 px-4 pointer-events-none">
            <nav className={`
                pointer-events-auto
                relative flex items-center justify-between
                w-full max-w-4xl
                px-2 py-2 md:px-3 md:py-2
                rounded-full
                transition-all duration-300 ease-out
                ${isScrolled ? "bg-primary-100/80 backdrop-blur-lg shadow-lg border border-white/40" : "bg-primary-100/50 backdrop-blur-md border border-white/20"}
            `}>
                {/* Logo / Home */}
                <Link
                    href="/"
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-sm hover:scale-105 transition-transform"
                    aria-label="Home"
                >
                    <img src="/logo.png" alt="HKL" className="w-6 h-6 object-contain" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`
                                px-5 py-3 rounded-full text-sm font-medium transition-all duration-200
                                ${link.primary
                                    ? "bg-primary-950 text-white hover:bg-primary-900 shadow-md"
                                    : "text-primary-950 hover:bg-white/60 hover:shadow-sm"
                                }
                                ${pathname === link.href ? "bg-white shadow-sm" : ""}
                            `}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    href="/practice"
                    className="hidden md:flex items-center gap-2 px-5 py-3 bg-olive text-white rounded-full text-sm font-medium hover:bg-olive/90 transition-all shadow-md group"
                >
                    Begin Practice
                    <GoArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/80 active:scale-95 transition-all text-primary-950"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <GoX className="text-xl" aria-hidden="true" /> : <GoListUnordered className="text-xl" aria-hidden="true" />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-primary-50/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 origin-top">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-3 rounded-xl bg-white/50 text-primary-950 font-medium text-center shadow-sm hover:bg-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/practice"
                            className="px-4 py-3 rounded-xl bg-olive text-white font-medium text-center shadow-md mt-2 flex items-center justify-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Begin Practice <GoArrowRight aria-hidden="true" />
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
