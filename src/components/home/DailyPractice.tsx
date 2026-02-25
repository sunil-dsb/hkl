import TextReveal from "@/components/ui/TextReveal";
import ParallaxBranch from "@/components/ui/ParallaxBranch";

const segments = [
  {
    text: "We live in a world that promised success would bring peace. Yet even with comfort, achievement, and recognition, many of us still feel restless within.",
  },
  {
    text: "Stress has become normal. Stillness feels distant. We search outside ourselves for what can only be found within.",
  },
  {
    text: "Coming home to Humility, Kindness & Love",
    className: "bg-primary-100 px-3 py-0 rounded-full",
  },
  {
    text: "is not about adding more to our lives it is about returning to what makes life meaningful.",
  },
  {
    text: "We are Humility. We are Kindness. We are Love.",
    className: "bg-mint px-2 py-0.5 rounded-lg underline underline-offset-2 decoration-2 decoration-olive",
  },
  {
    text: "This is our daily commitment to live these virtues in action and create a truly beautiful and successful life from within.",
  },
];

export default function DailyPractice() {
  return (
    <section className="w-full py-12 md:py-28 px-6 relative overflow-x-clip">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-24">
        <TextReveal
          segments={segments}
          pClassName="text-xl sm:text-2xl md:text-[1.60rem] font-outfit text-primary-900 leading-normal"
        />
      </div>
      {/* Decorative Tree Branches */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxBranch
          src="/10.svg"
          direction="left"
          distance={144}
          positionClassName="hidden md:block w-42 md:w-72 lg:w-[15%] h-auto absolute -top-2 -right-12"
        />
        <ParallaxBranch
          src="/10.svg"
          direction="left"
          distance={144}
          positionClassName="opacity-30 md:opacity-100 w-32 md:w-52 lg:w-[12%] h-auto absolute top-20 -right-24"
        />
        <ParallaxBranch
          src="/12.svg"
          direction="left"
          distance={50}
          positionClassName="w-42 md:w-72 lg:w-[23%] h-auto absolute -bottom-6 md:-bottom-10 left-0"
          imageClassName="rotate-16"
        />
      </div>
    </section>
  );
}