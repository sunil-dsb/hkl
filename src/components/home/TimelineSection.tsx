

export default function TimelineSection() {
    return (
        <section className="relative w-full py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* DESKTOP LAYOUT */}
                <div className="hidden lg:flex flex-row justify-between items-start relative min-h-[1400px]">

                    {/* Empty Left Column (Spacer) for Title Balance */}
                    <div className="w-1/2"></div>

                    {/* Right Column: Title */}
                    <div className="w-1/2 flex justify-end">
                        <div className="max-w-md text-left md:sticky md:top-32 self-start h-fit mb-12 relative z-20">
                            <h2 className="text-3xl md:text-5xl font-hkl leading-tight mb-6 text-primary-950">
                                How HKL transforms the world
                            </h2>
                            <p className="font-outfit text-primary-950/80 text-lg leading-relaxed">
                                Current timeline illustrates the journey from inner self to outer world.
                            </p>
                        </div>
                    </div>

                    {/* Centered Timeline SVG Container */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[460px] h-full pointer-events-none z-10">
                        <svg
                            className="w-full h-auto overflow-visible"
                            viewBox="0 0 375 1376"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <defs>
                                <linearGradient id="paint0_linear_desktop" x1="187.237" y1="1.18164" x2="187.237" y2="1375.68" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#1e3a2f" stopOpacity="0" /> {/* Dark Green Start Transparent */}
                                    <stop offset="0.5" stopColor="#1e3a2f" /> {/* Dark Green Middle */}
                                    <stop offset="1" stopColor="#1e3a2f" stopOpacity="0" /> {/* Dark Green End Transparent */}
                                </linearGradient>
                                <mask id="timeline-mask-desktop" maskUnits="userSpaceOnUse">
                                    <rect
                                        x="0" y="0" width="375" height="1376"
                                        fill="white"
                                    />
                                </mask>
                            </defs>
                            {/* Base Path (Faint) */}
                            <path
                                d="M258.803 1375.68C258.803 1375.68 184.931 1017.16 243.803 800.182C275.981 681.588 384.817 635.475 372.803 513.182C355.046 332.418 -21.6799 412.791 1.80342 232.682C18.73 102.86 243.803 0.681641 243.803 0.681641"
                                stroke="#1e3a2f"
                                strokeWidth="1.5"
                                opacity="0.1"
                            />
                            {/* Overlay Path (Masked) */}
                            <path
                                d="M258.803 1375.68C258.803 1375.68 184.931 1017.16 243.803 800.182C275.981 681.588 384.817 635.475 372.803 513.182C355.046 332.418 -21.6799 412.791 1.80342 232.682C18.73 102.86 243.803 0.681641 243.803 0.681641"
                                stroke="url(#paint0_linear_desktop)"
                                strokeWidth="1.5"
                                mask="url(#timeline-mask-desktop)"
                            />
                        </svg>

                        {/* Timeline Points - Absolute to Container */}
                        <TimelineItem
                            title="Humility"
                            content="Humility is the quiet strength of living as a lifelong learner, free from ego, open to growth, and aware that we are part of something greater than ourselves. It allows us to listen deeply & grow through our mistakes."
                            top="22%"
                            left="-30%"
                            align="right"
                        />
                        <TimelineItem
                            title="Kindness"
                            content="Kindness arises from the deep understanding that all life is interconnected, calling us to treat every being with care & compassion."
                            top="45%"
                            left="95%"
                            align="left"
                        />
                        <TimelineItem
                            title="Love"
                            content="Love is the universal force at the heart of all life that dissolves separation, unites all beings, and reminds us of our shared sacredness."
                            top="75%"
                            left="-10%"
                            align="right"
                        />
                    </div>
                </div>

                {/* MOBILE TIMELINE (Visible < lg) */}
                <div className="lg:hidden relative pb-20">
                    <div className="mb-12">
                        <h2 className="text-3xl font-hkl text-primary-950 mb-4">
                            How HKL transforms the world
                        </h2>
                    </div>

                    <div className="space-y-16 pl-6 border-l border-primary-950/20 ml-4 relative">
                        {/* Mobile Items */}
                        <MobileTimelineItem
                            title="Humility"
                            content="Humility is the quiet strength of living as a lifelong learner, free from ego, open to growth, and aware that we are part of something greater than ourselves. It allows us to listen deeply & grow through our mistakes."
                        />
                        <MobileTimelineItem
                            title="Kindness"
                            content="Kindness arises from the deep understanding that all life is interconnected, calling us to treat every being with care & compassion."
                        />
                        <MobileTimelineItem
                            title="Love"
                            content="Love is the universal force at the heart of all life that dissolves separation, unites all beings, and reminds us of our shared sacredness."
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

function TimelineItem({ title, content, top, left, align }: any) {
    return (
        <div
            style={{ top, left }}
            className={`absolute w-[300px] ${align === "left" ? "text-left" : "text-right"}`}
        >
            {/* Simple Dot on the line */}
            <div className={`absolute top-0 w-3 h-3 bg-primary-950 rounded-full ${align === "left" ? "-left-16" : "-right-8 md:-right-16 translate-x-1/2"}`} aria-hidden="true" />

            <h3 className="text-2xl font-hkl mb-2 text-primary-950">{title}</h3>
            <p className="font-outfit text-primary-950/80 text-sm leading-relaxed">
                {content}
            </p>
        </div>
    );
}

function MobileTimelineItem({ title, content }: any) {
    return (
        <div className="relative">
            <div className="absolute -left-[31px] top-2 w-3 h-3 bg-mint rounded-full ring-4 ring-primary-100" aria-hidden="true" />
            <h3 className="text-2xl font-hkl mb-2 text-primary-950">{title}</h3>
            <p className="font-outfit text-primary-950/80 leading-relaxed">
                {content}
            </p>
        </div>
    );
}
