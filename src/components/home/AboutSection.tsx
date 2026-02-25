import Image from "next/image";
import BoxReveal, { BOX_COLORS } from "@/components/ui/BoxReveal";
import ParallaxBranch from "@/components/ui/ParallaxBranch";

const images = [
    {
        id: 1,
        src: "https://framerusercontent.com/images/VZE7xHznRZSutJsYss9WpfKUgOU.png?width=1172&height=980",
        position: "left-top",
        alt: "HKL Community"
    },
    {
        id: 2,
        src: "https://framerusercontent.com/images/iz0KBElCjUQtg1RMVgKIn0OzhI4.png?scale-down-to=512&width=1350&height=1350",
        position: "right-top",
        alt: "Mindful Practice"
    },
    {
        id: 3,
        src: "https://framerusercontent.com/images/k4lDYkGsFFNK73IbxOnr6fcFd1Y.jpg?scale-down-to=1024&width=1865&height=1600",
        position: "left-bottom",
        alt: "Inner Peace"
    },
    {
        id: 4,
        src: "https://framerusercontent.com/images/7F2P3IS1PqJwFvXG8Rdj0W7eXs.png?width=1188&height=1372",
        position: "right-bottom",
        alt: "Global Movement"
    }
];

const aboutParagraphs = [
    "The HKL Global Movement is dedicated to inspiring everyone to awaken, go within, and reconnect with the virtues of Humility, Kindness & Love (HKL) that live within us.",
    "At a time when humanity is clouded by ego, coldness, and disconnection, HKL offers a path back home to truth, helping us make ourselves, our homes, our communities, and the world more beautiful.",
    "When we embody HKL, we transform ourselves, achieve true success, and live as our most authentic selves. In doing so, we create ripples of change that flow into our homes, our communities, and the wider world.",
    "The HKL Global Movement begins in the heart of each person and, as a secular movement, transcends culture, faith, and background, embracing and welcoming everyone.",
];

export default function AboutSection() {
    return (
        <section className="relative w-full py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* HEADLINE */}
                <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10 mb-12">
                    <span className="badge bg-mint!">About HKL</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tighter font-bold font-hkl">
                        Making Ourselves More <span className="font-playfair italic text-olive">Beautiful</span>
                    </h2>
                    <p className="text-lg text-primary-950/80 font-outfit md:mx-20">
                        The self transformation does not begin &#8220;out there,&#8221; it begins within.
                    </p>
                </div>

                {/* DESKTOP LAYOUT */}
                <div className="hidden lg:grid grid-cols-3 gap-8 md:gap-12 items-center">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-8 h-full justify-between py-12 order-1">
                        {images.filter(img => img.position.startsWith("left")).map((img) => (
                            <ImageCard key={img.id} image={img} />
                        ))}
                    </div>

                    {/* CENTER COLUMN */}
                    <div className="relative flex flex-col justify-center items-center order-2 px-4">
                        <div className="max-w-md mx-auto space-y-8">
                            <BoxReveal paragraphs={aboutParagraphs} boxColor={BOX_COLORS.mint} />
                            <div className="flex justify-center pt-6">
                                <button className="btn-primary">
                                    Begin Practice
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-8 h-full justify-between py-12 order-3">
                        {images.filter(img => img.position.startsWith("right")).map((img) => (
                            <ImageCard key={img.id} image={img} />
                        ))}
                    </div>
                </div>

                {/* MOBILE LAYOUT */}
                <div className="lg:hidden flex flex-col gap-12">
                    <div className="max-w-xl mx-auto space-y-8 text-center px-4">
                        <BoxReveal paragraphs={aboutParagraphs} boxColor={BOX_COLORS.mint} />
                        <div className="flex justify-center">
                            <button className="btn-primary w-full sm:w-auto">
                                Begin Practice
                            </button>
                        </div>
                    </div>

                    {/* Image Slider */}
                    <div className="w-full overflow-x-auto pb-8 snap-x snap-mandatory flex gap-4 px-4 scrollbar-hide">
                        {images.map((img) => (
                            <div key={img.id} className="snap-center shrink-0 w-[70vw] sm:w-[350px]">
                                <ImageCard image={img} isMobile />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <ParallaxBranch
                src="/12.svg"
                direction="right"
                positionClassName="w-64 sm:w-72 md:w-80 lg:w-[25%] h-auto absolute top-4 md:top-6 lg:top-8 right-0"
                imageClassName="-rotate-16 scale-x-[-1]"
            />
        </section>

    );
}

const getAlignment = (position: string) => {
    switch (position) {
        case "left-top": return "lg:self-start lg:translate-y-42";
        case "left-bottom": return "lg:self-end lg:translate-x-6";
        case "right-top": return "lg:self-end lg:translate-y-42";
        case "right-bottom": return "lg:self-start lg:-translate-x-6";
        default: return "";
    }
};

function ImageCard({ image, isMobile = false }: { image: typeof images[0]; isMobile?: boolean }) {
    const desktopClasses = !isMobile ? `lg:mx-0 ${getAlignment(image.position)}` : "mx-auto";

    return (
        <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-4 border-primary-200 ${desktopClasses} ${!isMobile ? "max-w-[280px]" : ""}`}>
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
            />
        </div>
    );
}
