import FooterBirds from "./FooterBirds";

export default function FooterCta() {
    return (
        <section className="relative flex flex-col items-center justify-center text-center gap-6 font-hkl py-20 md:pb-48 overflow-hidden" style={{
            background: 'linear-gradient(180deg, #ffddadff, #ffedc6d1 52%,  #FCFDFD)'
        }}>
            <FooterBirds />

            <div className="flex flex-col items-center gap-2 z-20 relative px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold max-w-2xl">
                    Live beautifully, every day.
                </h2>
                <p className="text-lg text-primary-950/80 max-w-lg">
                    Simple steps towards a kinder, lovable world. Nurturing a future where nature and humanity thrive together.
                </p>
            </div>
            <button className="px-5 py-3 md:py-3 cursor-pointer leading-none inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap bg-primary-950 text-primary-50 rounded-full hover:bg-primary-900 focus-visible:ring-primary-950 active:scale-95 text-base z-20 relative">
                Start Journey
            </button>
        </section>
    );
}