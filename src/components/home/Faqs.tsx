"use client";

import { useState } from "react";
import { GoArrowDown, GoX } from "react-icons/go";

type FaqItem = {
    question: string;
    answer: string;
};

const faqsData: FaqItem[] = [
    {
        question: "What is the mission of HKL?",
        answer:
            "HKL (Human Kind Life) is dedicated to fostering a deeper connection between humanity and nature. We believe in living beautifully through sustainable practices, mindful consumption, and community engagement.",
    },
    {
        question: "How can I join the movement?",
        answer:
            "You can join by subscribing to our newsletter, participating in our local events, or simply by adopting more sustainable habits in your daily life. Every small action counts towards a more beautiful world.",
    },
    {
        question: "Is HKL a non-profit organization?",
        answer:
            "We operate as a social enterprise, reinvesting a significant portion of our proceeds into community projects and environmental conservation efforts.",
    },
    {
        question: "What does 'Live Beautifully' mean?",
        answer:
            "Living beautifully means making choices that honor the planet and its people. It's about finding joy in simplicity, kindness, and harmony with the natural world.",
    },
    {
        question: "Can I volunteer with HKL?",
        answer:
            "Yes! We have various volunteer opportunities ranging from event organization to content creation. Please reach out to us via our contact page for more details.",
    },
    {
        question: "Where are your events held?",
        answer:
            "We hold events globally, with a focus on locations that allow for deep immersion in nature. Check our 'Stories' or 'Events' page for upcoming gatherings near you.",
    },
];

export default function Faqs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative flex flex-col items-center gap-10 font-hkl py-20 overflow-hidden -mb-1 z-10 w-full">
            <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, #ffddadff 100%)',
                }}
            />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-hkl text-center z-20 relative tracking-tight px-4">
                Frequently Asked <br className="hidden md:block" /> <span className="font-playfair italic text-olive">questions</span>
            </h2>

            <div className="w-full max-w-4xl px-4 z-20 relative flex flex-col gap-2">
                {faqsData.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <button
                            key={index}
                            onClick={() => toggleFaq(index)}
                            className={`group flex flex-col w-full rounded-[2rem] transition-all duration-300 text-left overflow-hidden ${isOpen ? "bg-mint" : "bg-primary-100"
                                }`}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${index}`}
                        >
                            <div className="flex items-center justify-between p-6">
                                <h3 className=" font-semibold text-primary-950 pr-8">
                                    {faq.question}
                                </h3>
                                <div className="relative w-6 h-6 flex-shrink-0 text-primary-950">
                                    <GoArrowDown
                                        className={`absolute inset-0 w-full h-full transition-all duration-300 transform ${isOpen ? "opacity-0 rotate-180 scale-50" : "opacity-100 rotate-0 scale-100"
                                            }`}
                                    />
                                    <GoX
                                        className={`absolute inset-0 w-full h-full transition-all duration-300 transform ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-50"
                                            }`}
                                    />
                                </div>
                            </div>
                            <div
                                id={`faq-answer-${index}`}
                                className={`transition-all duration-300 ease-in-out overflow-hidden w-full ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 text-dark-forest font-medium leading-tight">
                                    {faq.answer}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}