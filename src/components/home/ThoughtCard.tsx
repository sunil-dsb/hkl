import Image from "next/image";

export default function ThoughtCard() {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-12 py-12 text-white">
      <div className="bg-dark-forest rounded-4xl pt-12 md:pt-20 pb-0 px-6 md:px-10 text-center flex flex-col gap-6 md:gap-8 items-center justify-between overflow-hidden">
        <h2 className="text-2xl md:text-4xl font-hkl-centra leading-[1.1] md:leading-[1.1] tracking-tight max-w-lg z-10 relative">
          &quot; The world feels{" "}
          <span className="italic font-light text-mint/90 mr-1">different</span>{" "}
          when the{" "}
          <span className="italic font-light text-mint/90 mr-1">mind</span> is
          different. &quot;
        </h2>

        <div className="relative w-full max-w-sm aspect-video md:aspect-[2.2/1] z-10">
          <Image
            src="/mind.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Meditation illustration"
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
