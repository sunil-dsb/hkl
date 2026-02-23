"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

type Story = {
    id: string;
    title: string;
    thumbnail: string;
    videoId: string;
};

const stories: Story[] = [
    {
        id: "1",
        title: "Toni Childs",
        thumbnail: "https://img.youtube.com/vi/s_lMeURvLL4/maxresdefault.jpg",
        videoId: "s_lMeURvLL4",
    },
    {
        id: "2",
        title: "Sam Demma",
        thumbnail: "https://img.youtube.com/vi/SlgG9L6Dlws/maxresdefault.jpg",
        videoId: "SlgG9L6Dlws",
    },
    {
        id: "3",
        title: "Baba Baldev Singh Ji",
        thumbnail: "https://img.youtube.com/vi/J8gNYqhmq6o/maxresdefault.jpg",
        videoId: "J8gNYqhmq6o",
    },
    {
        id: "4",
        title: "HKL Community",
        thumbnail: "https://img.youtube.com/vi/lmFt_9FAvbI/maxresdefault.jpg",
        videoId: "lmFt_9FAvbI",
    },
];

export default function StoriesOfImpact() {
    return (
        <section className="flex flex-col items-center gap-10 font-hkl py-16 overflow-hidden z-10 w-full px-4 md:px-6 relative">
            <div>
                <img src="/10.svg" alt="" className="absolute top-16 -left-10 md:left-44 w-64 h-auto opacity-40 blur-[1px] -z-10" aria-hidden="true" />
                <img src="/10.svg" alt="" className="absolute top-0 -right-10 md:right-64 w-64 h-auto opacity-40 blur-[1px] scale-x-[-1] -z-10" aria-hidden="true" />
            </div>
            <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
                <span className="badge">Stories of Impact</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center z-20 relative tracking-tight px-4 text-primary-950">
                    Stories of Impact
                </h2>
                <p className="text-lg text-primary-950/80 max-w-xl mx-auto font-outfit">
                    Stories from around the world inspiring courage, hope and confidence.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
                {stories.map((story) => (
                    <VideoCard key={story.id} story={story} />
                ))}
            </div>
        </section>
    );
}

function VideoCard({ story }: { story: Story }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <button
            type="button"
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-gray-100 group cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${story.title}`}
        >
            {!isPlaying ? (
                <>
                    <Image
                        src={story.thumbnail}
                        alt={story.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover:scale-110">
                            <FaPlay className="text-white text-2xl ml-1" />
                        </div>
                    </div>
                </>
            ) : (
                <iframe
                    src={`https://www.youtube.com/embed/${story.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={story.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full bg-primary-200"
                />
            )}
        </button>
    );
}