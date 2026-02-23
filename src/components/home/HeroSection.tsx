import { GoArrowRight } from "react-icons/go";
import { RxArrowTopRight } from "react-icons/rx";
export default function HeroSection() {
    return (
        <section className="relative w-full h-[95vh] min-h-[600px] bg-black overflow-hidden">
            {/* THE ONE AND ONLY VIDEO */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl space-y-6 md:space-y-8 mt-6">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
                        Start your day with <br className="hidden md:block" />
                        <span className="italic font-medium text-mint">Humility</span>,{" "}
                        <span className="italic font-medium text-mint">Kindness</span> &{" "}
                        <span className="italic font-medium text-mint">Love</span>.
                    </h1>

                    <p className="text-lg sm:text-xl font-outfit text-white/90 max-w-2xl mx-auto font-light">
                        A simple 2-minute morning practice for a clearer, more intentional day.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button className="flex items-center gap-3 px-6 py-4 cursor-pointer leading-none inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mint whitespace-nowrap bg-mint text-primary-950 rounded-full hover:bg-mint/90 active:scale-95 text-lg shadow-lg hover:shadow-xl">
                            Start My Morning
                            <GoArrowRight className="text-xl" aria-hidden="true" />
                        </button>
                        <button className="flex items-center gap-3 px-6 py-4 cursor-pointer leading-none inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mint whitespace-nowrap bg-mint text-primary-950 rounded-full hover:bg-mint/90 active:scale-95 text-lg shadow-lg hover:shadow-xl">
                            Learn More
                            <RxArrowTopRight className="text-md" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
