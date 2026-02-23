import { FaInstagram, FaWhatsapp, FaYoutube, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { RxArrowTopRight } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/hklglobal/" },
    { icon: FaWhatsapp, label: "WhatsApp", href: "https://www.whatsapp.com/channel/0029Vb1vBuIDjiOm08YGzm0m" },
    { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@hklglobal" },
    { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/waveofkindnessandlove" },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/company/hkl-movement/" },
];

const navLinks = [
    "About", "Canada, 2025", "Italy, 2025", "India, 2024", "Stories", "Volunteer", "Support Us"
];

export default function Footer() {
    return (
        <footer className="-mt-24 md:-mt-32 relative z-10 pointer-events-none">
            {/* Mountain Image */}
            <section className="relative w-full min-h-[70vh] md:min-h-[80vh] pointer-events-auto">
                <Image
                    src="/3.svg"
                    alt="HKL Landscape"
                    fill
                    className="object-cover object-bottom"
                    quality={90}
                    priority
                />

                {/* Gradient overlay at bottom */}
                <div
                    className="absolute inset-x-0 bottom-0 h-1/3 z-10 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom, transparent 0%, var(--color-dark-forest) 100%)`
                    }}
                />

                {/* Links */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 pb-5 sm:pb-6 pt-10">
                    <div className="container mx-auto flex flex-col gap-4 sm:gap-3">
                        {/* Logo + Social icons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                            <h2 className="text-2xl font-bold tracking-tighter text-white font-hkl">HKL</h2>
                            <div className="flex gap-3 sm:gap-2 font-hkl-centra">
                                {socialLinks.map(({ icon: Icon, label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="inline-flex items-center justify-center w-8 h-8 sm:w-6 sm:h-6 bg-mint text-dark-forest rounded-md transition-transform hover:scale-110"
                                    >
                                        <Icon size={16} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <hr className="border-white/15" />

                        {/* Nav links */}
                        <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between gap-4 sm:gap-3">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2 sm:text-left text-sm">
                                {navLinks.map((link) => (
                                    <Link key={link} href="#" className="text-white transition-colors cursor-pointer flex items-center gap-1 animated-underline group">
                                        {link}
                                        {(link === "Volunteer" || link === "Support Us") && (
                                            <RxArrowTopRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        )}
                                    </Link>
                                ))}
                            </div>
                            <Link href="#" className="text-xs sm:text-sm text-white transition-colors whitespace-nowrap cursor-pointer animated-underline">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}
