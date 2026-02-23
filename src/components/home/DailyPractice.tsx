export default function DailyPractice() {
    return (
        <section className="w-full py-24" style={{
            background: 'linear-gradient(180deg, #ffddadff, #ffedc6d1 52%,  #FCFDFD)'
        }}>
            <div className="z-10 max-w-4xl mx-auto px-6 text-center space-y-12">

                {/* Intro */}
                <span className="inline-block text-sm font-bold font-hkl-centra uppercase tracking-[0.2em] text-primary-600">
                    Introducing the Daily Practice
                </span>

                {/* Main Content Container with Edge Blur/Fade */}
                <div className="space-y-8 md:space-y-10 relative">

                    {/* Headline */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-hkl text-primary-950 leading-[1.2] max-w-3xl mx-auto">
                        I Commit to Practicing HKL Daily
                    </h2>

                    <span className="font-medium text-terracotta">Humility. Kindness. Love.</span>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl font-outfit text-primary-800 leading-relaxed max-w-2xl mx-auto font-light">
                        The transformation will not come from talk alone it will come from practicing the virtues. <br className="hidden md:block" />
                    </p>

                    {/* The Practice Steps */}
                    <div className="space-y-6 pt-4">
                        <p className="text-xl md:text-2xl font-hkl-centra text-primary-900">
                            Every morning, when you wake up, & before your feet touch the ground, remind yourself
                        </p>

                        <div className="space-y-2 text-2xl md:text-3xl font-hkl text-primary-950/90">
                            <p>We are humility.</p>
                            <p>We are kindness.</p>
                            <p>We are love.</p>
                        </div>
                    </div>
                    <div className="pt-8 relative">
                        <p className="text-lg font-outfit text-primary-800/60 max-w-xl mx-auto leading-relaxed blur-[0.5px]">
                            This is our commitment, not for a day, not for a week, but every day in deep gratitude for being blessed with this sacred human life.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
