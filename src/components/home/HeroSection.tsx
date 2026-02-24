import { GoArrowRight } from "react-icons/go";
import { RxArrowTopRight } from "react-icons/rx";
export default function HeroSection() {
    return (
        <section className="relative w-full h-[110vh] min-h-160 bg-black overflow-hidden">
            {/* Video */}
            <div className="absolute inset-0">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/hero-poster.jpg"
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    <source src="https://www.pexels.com/download/video/6836692/" type="video/mp4" />
                </video>

                {/* Dark overlays on the video */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-transparent to-primary-50 z-[5]" />
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl space-y-6 md:space-y-8 mt-6">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-hkl font-semibold tracking-tight leading-[1.1]">
                        Start your day with <br className="hidden md:block" />
                        <span className="italic font-light text-mint font-playfair">Humility</span>,{" "}
                        <span className="italic font-light text-mint font-playfair">Kindness</span> <span className="italic">&</span>{" "}
                        <span className="italic font-light text-mint font-playfair">Love</span>.
                    </h1>

                    <p className="text-lg sm:text-xl font-outfit text-white/90 max-w-2xl mx-auto font-light">
                        A simple 2-minute morning practice for a clearer, more intentional day.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button className="btn-mint flex gap-3">
                            Start My Morning
                        </button>
                        <button className="btn flex gap-3 px-6 py-4 bg-white/10 text-white border border-white/30 hover:bg-white/20 focus-visible:ring-white text-lg backdrop-blur-sm">
                            Learn More
                            <RxArrowTopRight className="text-md" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
