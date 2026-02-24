import TextReveal from "@/components/ui/TextReveal";
import Image from "next/image";

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
    <section className="w-full py-28 px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-24">
        <TextReveal
          segments={segments}
          pClassName="text-xl sm:text-2xl md:text-[1.60rem] font-outfit text-primary-900 leading-normal"
        />
      </div>
      {/* Decorative Tree Branches */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/12.svg"
          alt=""
          width={300}
          height={300}
          className="w-64 sm:w-80 md:w-96 lg:w-[30%] h-auto absolute -bottom-12 left-0 rotate-16"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}