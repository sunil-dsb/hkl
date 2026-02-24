"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { IoPause, IoPlay } from "react-icons/io5";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import gsap from "gsap";

type Story = {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
};

const stories: Story[] = [
  {
    id: "1",
    title: "Giani Raghbir Singh Ji",
    thumbnail: "https://img.youtube.com/vi/s_lMeURvLL4/maxresdefault.jpg",
    videoId: "s_lMeURvLL4",
  },
  {
    id: "2",
    title: "Rich Good",
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
    title: "Abdal Qayyum Mufti",
    thumbnail: "https://img.youtube.com/vi/lmFt_9FAvbI/maxresdefault.jpg",
    videoId: "lmFt_9FAvbI",
  },
  {
    id: "5",
    title: "Another Story",
    thumbnail: "https://img.youtube.com/vi/s_lMeURvLL4/maxresdefault.jpg",
    videoId: "s_lMeURvLL4",
  },
  {
    id: "6",
    title: "One More Story",
    thumbnail: "https://img.youtube.com/vi/SlgG9L6Dlws/maxresdefault.jpg",
    videoId: "SlgG9L6Dlws",
  },
];

export default function StoriesOfImpact() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 304;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handlePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="flex flex-col items-center gap-12 font-hkl py-16 w-full px-4 md:px-6">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="badge">Stories of Impact</span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-primary-950 font-bold font-hkl">
          Stories of <span className="font-playfair italic text-olive">Impact</span>
        </h2>

        <p className="text-lg text-primary-900/80 max-w-xl mx-auto font-outfit">
          Stories from around the world inspiring courage, hope and confidence.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full max-w-6xl mx-auto">

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            -translate-x-4 md:-translate-x-5
            w-10 h-10 rounded-full bg-white shadow-md border border-primary-200
            flex items-center justify-center
            transition-all duration-200
            ${canScrollLeft
              ? "opacity-100 hover:bg-primary-100 cursor-pointer"
              : "opacity-30 cursor-default"
            }
          `}
          aria-label="Scroll left"
        >
          <IoChevronBack className="text-primary-950 text-lg" aria-hidden="true" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-2 px-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-none w-[260px] sm:w-[280px]"
            >
              <VideoCard
                story={story}
                isPlaying={playingId === story.id}
                onToggle={() => handlePlay(story.id)}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            translate-x-4 md:translate-x-5
            w-10 h-10 rounded-full bg-white shadow-md border border-primary-200
            flex items-center justify-center
            transition-all duration-200
            ${canScrollRight
              ? "opacity-100 hover:bg-primary-100 cursor-pointer"
              : "opacity-30 cursor-default"
            }
          `}
          aria-label="Scroll right"
        >
          <IoChevronForward className="text-primary-950 text-lg" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function VideoCard({
  story,
  isPlaying,
  onToggle,
}: {
  story: Story;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  // GSAP quickTo refs for smooth lerped following
  const quickX = useRef<((v: number) => void) | null>(null);
  const quickY = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    if (!pillRef.current) return;
    quickX.current = gsap.quickTo(pillRef.current, "x", { duration: 0.45, ease: "power3.out" });
    quickY.current = gsap.quickTo(pillRef.current, "y", { duration: 0.45, ease: "power3.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = thumbRef.current?.getBoundingClientRect();
    if (!rect || !quickX.current || !quickY.current) return;
    quickX.current(e.clientX - rect.left);
    quickY.current(e.clientY - rect.top);
  }, []);

  return (
    // Clicking anywhere on the card toggles the video
    <div className="w-full cursor-pointer" onClick={onToggle}>
      <div className="bg-primary-100 rounded-3xl p-2">

        {/* Video / Thumbnail Section */}
        <div
          ref={thumbRef}
          className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-primary-200"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isPlaying ? (
            <Image
              src={story.thumbnail}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Stop propagation so clicking inside iframe doesn't re-trigger onToggle
            <div
              className="absolute inset-0"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${story.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={story.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}

          {/* ── Cursor-following Play pill ── */}
          {!isPlaying && (
            <div
              ref={pillRef}
              className="pointer-events-none absolute top-0 left-0 z-20"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s ease",
                willChange: "transform",
              }}
            >
              {/* Inner wrapper handles the centering offset so GSAP transform is clean */}
              <div className="-translate-x-1/2 -translate-y-1/2">
                <div className="bg-dark-forest text-white px-5 py-2.5 rounded-full shadow-xl">
                  <span className="text-sm font-outfit font-semibold tracking-widest uppercase">Play</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between px-4 py-3 mt-2">

          {/* Text */}
          <div>
            <h3 className="text-primary-950 text-base font-medium leading-tight">
              {story.title}
            </h3>
            <p className="text-sm text-primary-900/70 font-outfit">
              Watch story
            </p>
          </div>

          {/* Play / Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent double-fire since card also handles click
              onToggle();
            }}
            className="relative w-11 h-11 rounded-full bg-primary-300 flex items-center justify-center transition-colors duration-300 hover:bg-mint/90"
            aria-label="Toggle video"
          >
            <span
              className={`absolute transition-all duration-300 ${isPlaying
                ? "opacity-0 scale-75 rotate-90"
                : "opacity-100 scale-100 rotate-0"
                }`}
            >
              <IoPlay className="text-dark-forest text-sm ml-0.5" aria-hidden="true" />
            </span>

            <span
              className={`absolute transition-all duration-300 ${isPlaying
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 -rotate-90"
                }`}
            >
              <IoPause className="text-dark-forest text-sm" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}