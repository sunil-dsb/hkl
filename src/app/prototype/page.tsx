"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);
import {
  IoAddOutline,
  IoBatteryFull,
  IoBookmarkOutline,
  IoCalendarOutline,
  IoCallOutline,
  IoCameraOutline,
  IoCellularSharp,
  IoChatbubbleOutline,
  IoCheckmark,
  IoChevronBack,
  IoChevronDownOutline,
  IoChevronForward,
  IoCloseOutline,
  IoCreateOutline,
  IoEllipsisHorizontal,
  IoGlobeOutline,
  IoHeart,
  IoHeartOutline,
  IoImageOutline,
  IoLanguageOutline,
  IoLeafOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoMailOutline,
  IoMicOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoRepeatOutline,
  IoSearchOutline,
  IoShareSocialOutline,
  IoTimeOutline,
  IoVideocamOutline,
  IoWifi,
} from "react-icons/io5";

const AVATAR_URL =
  "https://framerusercontent.com/images/VZE7xHznRZSutJsYss9WpfKUgOU.png?scale-down-to=512&width=1172&height=980";

/* ────────────────────────────────────────────────────────────
   Navigation context — powers PlayPhone interactive prototype
   ──────────────────────────────────────────────────────────── */

type ScreenKey =
  | "splash"
  | "quote"
  | "auth"
  | "otp"
  | "blank-home"
  | "lotus-popup"
  | "tour-practice"
  | "tour-feed"
  | "tour-channels"
  | "tour-you"
  | "save-profile"
  | "home-feed"
  | "post-detail"
  | "daily-commitment"
  | "chat"
  | "dm-thread"
  | "new-message"
  | "alerts"
  | "events"
  | "event-detail"
  | "spaces"
  | "member-profile"
  | "say-hello"
  | "community-guidelines"
  | "about-hkl"
  | "heartalks"
  | "resources";

type NavContextValue = {
  navigate: (screen: ScreenKey) => void;
  back: () => void;
  current: ScreenKey;
};

const NavContext = createContext<NavContextValue | null>(null);

function useNav(): NavContextValue | null {
  return useContext(NavContext);
}

/* ────────────────────────────────────────────────────────────
   Phone shell + chrome
   ──────────────────────────────────────────────────────────── */

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-160 w-80 shrink-0 rounded-[50px] bg-[#0A0A0A] p-1 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]">
      {/* Dynamic island */}
      <div className="absolute left-1/2 top-3 z-50 h-6 w-20 -translate-x-1/2 rounded-full bg-[#0A0A0A]" />

      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[45px] bg-white">
        {children}
      </div>
    </div>
  );
}

function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "text-black" : "text-white";
  return (
    <div
      className={`flex h-12 shrink-0 items-end justify-between px-5 pb-1 ${color}`}
    >
      <span className="font-hkl-centra text-sm font-semibold">9:41</span>
      <div className="flex items-center gap-1.5 text-sm">
        <IoCellularSharp />
        <IoWifi />
        <IoBatteryFull />
      </div>
    </div>
  );
}

function HomeIndicator({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className="flex h-8 shrink-0 items-center justify-center">
      <div
        className={`h-1 w-32 rounded-full ${tone === "dark" ? "bg-black/85" : "bg-white/85"}`}
      />
    </div>
  );
}

/* Bottom-nav icons  sized via 1em so text-2xl on the wrapper controls size,
   and stroke/fill use currentColor so the active/idle color follows text color. */
function IconFeed(props: { className?: string }) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <line x1="7" y1="13" x2="17" y2="13" />
      <line x1="7" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function IconPractice(props: { className?: string }) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      fill="currentColor"
      className={props.className}
    >
      <path d="M510.633,312.157c-1.655-2.867-4.6-4.753-7.896-5.057c-2.145-0.197-47.182-4.084-99.312,11.3c26.328-66.804,20.892-130.565,20.604-133.685c-0.304-3.296-2.189-6.241-5.057-7.896c-2.867-1.655-6.359-1.816-9.367-0.43c-2.376,1.094-53.024,24.801-96.25,73.73c-12.294-68.888-47.239-119.028-49.03-121.56c-1.911-2.703-5.016-4.31-8.328-4.31c-3.312,0-6.416,1.607-8.328,4.31c-1.791,2.531-36.734,52.671-49.03,121.56c-43.226-48.93-93.874-72.636-96.25-73.73c-3.006-1.385-6.5-1.225-9.367,0.43s-4.753,4.6-5.057,7.896c-0.289,3.121-5.725,66.883,20.604,133.687c-52.132-15.383-97.17-11.499-99.31-11.302c-3.296,0.304-6.241,2.19-7.896,5.057s-1.816,6.359-0.43,9.367c1.384,3.007,34.718,74.09,104.598,114.435c51.68,29.838,107.921,33.957,135.047,33.957c7.857,0,13.268-0.346,15.42-0.512c2.152,0.167,7.56,0.512,15.42,0.512c27.128,0,83.37-4.122,135.047-33.957c69.88-40.345,103.213-111.428,104.598-114.435C512.45,318.518,512.288,315.024,510.633,312.157z M115.733,418.294c-46.299-26.731-75.771-69.419-88.691-91.331c19.957,0.158,56.079,2.755,93.151,16.865c1.516,2.888,3.091,5.771,4.748,8.639c26.426,45.771,64.75,77.386,92.361,95.908C189.735,445.993,151.155,438.746,115.733,418.294z M142.607,342.268c-30.576-52.959-34.747-112.22-34.81-139.876c20.007,11.603,57.699,36.729,87.32,75.55c-0.459,6.178-0.713,12.457-0.713,18.83c0,55.065,18.368,103.46,33.547,134.055C202.242,413.426,166.706,384.01,142.607,342.268z M256,439.788c-14.113-24.479-41.197-79.709-41.197-143.016S241.889,178.233,256,153.757c14.113,24.479,41.197,79.709,41.197,143.016S270.11,415.312,256,439.788z M317.595,296.771c0-6.372-0.254-12.652-0.713-18.829c29.632-38.833,67.34-63.965,87.341-75.561c-0.037,27.613-4.169,86.782-34.829,139.886c-24.03,41.622-59.583,71.06-85.315,88.497C299.252,400.166,317.595,351.801,317.595,296.771z M396.267,418.294c-35.422,20.45-74.002,27.698-101.568,30.081c27.61-18.522,65.934-50.137,92.359-95.907c1.656-2.869,3.233-5.752,4.75-8.642c36.96-14.064,73.145-16.67,93.138-16.844C472.018,348.904,442.55,391.572,396.267,418.294z" />
      <path d="M173.386,129.797c-16.59,0-30.088,13.498-30.088,30.088s13.498,30.088,30.088,30.088s30.088-13.498,30.088-30.088S189.976,129.797,173.386,129.797z M173.386,169.574c-5.342,0-9.689-4.347-9.689-9.689s4.347-9.689,9.689-9.689s9.689,4.347,9.689,9.689S178.729,169.574,173.386,169.574z" />
      <path d="M338.613,129.797c-16.59,0-30.088,13.498-30.088,30.088s13.498,30.088,30.088,30.088c16.59,0,30.088-13.498,30.088-30.088S355.203,129.797,338.613,129.797z M338.613,169.574c-5.342,0-9.689-4.347-9.689-9.689s4.347-9.689,9.689-9.689c5.342,0,9.689,4.347,9.689,9.689S343.956,169.574,338.613,169.574z" />
      <path d="M256,42.083c-16.59,0-30.088,13.498-30.088,30.088S239.41,102.259,256,102.259s30.088-13.498,30.088-30.088S272.59,42.083,256,42.083z M256,81.86c-5.342,0-9.689-4.347-9.689-9.689s4.347-9.689,9.689-9.689s9.689,4.347,9.689,9.689S261.342,81.86,256,81.86z" />
      <path d="M266.206,368.497c-5.316-1.86-11.134,0.938-12.998,6.254c-1.253,3.578-2.09,5.565-2.094,5.572c-2.208,5.183,0.204,11.174,5.386,13.381c1.303,0.555,2.659,0.818,3.993,0.818c3.964,0,7.735-2.326,9.388-6.204c0.108-0.255,1.105-2.614,2.578-6.823C274.323,376.179,271.522,370.359,266.206,368.497z" />
      <path d="M286.127,291.364c-0.181-5.63-4.905-10.05-10.521-9.866c-5.63,0.181-10.047,4.892-9.866,10.522c0.56,17.412-0.977,35.317-4.569,53.215c-1.109,5.523,2.47,10.898,7.993,12.007c0.677,0.136,1.351,0.201,2.017,0.201c4.759,0,9.016-3.349,9.989-8.195C285.07,329.814,286.737,310.34,286.127,291.364z" />
    </svg>
  );
}

function IconChat(props: { className?: string }) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M18.81,16.23,20,21l-4.95-2.48A9.84,9.84,0,0,1,12,19c-5,0-9-3.58-9-8s4-8,9-8,9,3.58,9,8A7.49,7.49,0,0,1,18.81,16.23Z" />
    </svg>
  );
}

function IconBell(props: { className?: string }) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      className={props.className}
    >
      <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" />
      <path
        d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z"
        strokeLinejoin="round"
      />
      <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" />
    </svg>
  );
}

type Tab = "feed" | "practice" | "chat" | "alerts";

const TAB_TO_SCREEN: Record<Tab, ScreenKey> = {
  feed: "home-feed",
  practice: "daily-commitment",
  chat: "chat",
  alerts: "alerts",
};

function BottomNav({ active, spotlight }: { active?: Tab; spotlight?: Tab }) {
  const nav = useNav();
  const items: {
    id: Tab;
    label: string;
    Icon: ComponentType<{ className?: string }>;
  }[] = [
    { id: "feed", label: "Feed", Icon: IconFeed },
    { id: "practice", label: "Practice", Icon: IconPractice },
    { id: "chat", label: "Chat", Icon: IconChat },
    { id: "alerts", label: "Alerts", Icon: IconBell },
  ];
  return (
    <div className="flex shrink-0 border-t border-primary-100 bg-white px-3 pb-1 pt-2">
      {items.map(({ id, label, Icon }) => {
        const isSpotlight = spotlight === id;
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => nav?.navigate(TAB_TO_SCREEN[id])}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1 transition ${
              isSpotlight
                ? "bg-primary-100 ring-4 ring-primary-100"
                : spotlight
                  ? "opacity-30"
                  : ""
            }`}
          >
            <Icon
              className={`text-2xl ${
                isSpotlight
                  ? "text-primary-700"
                  : isActive
                    ? "text-primary-950"
                    : "text-primary-400"
              }`}
            />
            <span
              className={`font-hkl-centra text-[10px] uppercase tracking-wider ${
                isSpotlight
                  ? "font-semibold text-primary-700"
                  : isActive
                    ? "text-primary-950"
                    : "text-primary-400"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* Language dropdown  open/close + outside click to dismiss */
type Language = {
  code: string;
  name: string;
  flag?: string;
  flagSrc?: string;
};

const LANGUAGES: Language[] = [
  { code: "EN", name: "English", flagSrc: "/flags/us.svg" },
  { code: "PA", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "HI", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "IT", name: "Italiano", flag: "🇮🇹" },
];

function FlagGlyph({ lang, size }: { lang: Language; size: "sm" | "md" }) {
  if (lang.flagSrc) {
    const dim = size === "sm" ? 16 : 18;
    return (
      <span
        className="inline-flex shrink-0 overflow-hidden rounded-sm ring-1 ring-black/5"
        style={{ width: dim, height: dim * (3 / 4) }}
      >
        <Image
          src={lang.flagSrc}
          alt={`${lang.name} flag`}
          width={dim}
          height={Math.round(dim * (3 / 4))}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }
  return (
    <span className={size === "sm" ? "text-xs" : "text-base"}>{lang.flag}</span>
  );
}

function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("EN");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selected =
    LANGUAGES.find((l) => l.code === selectedCode) ?? LANGUAGES[0];

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-primary-300 bg-white px-3 py-1.5 font-hkl-centra text-[10px] font-semibold uppercase tracking-widest text-primary-950 transition active:scale-95"
      >
        <FlagGlyph lang={selected} size="sm" />
        {selected.code}
        <IoChevronDownOutline
          className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-[0_15px_40px_-10px_rgba(38,37,30,0.25)]">
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === selectedCode;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelectedCode(lang.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition ${
                  isActive ? "bg-primary-100" : "hover:bg-primary-50"
                }`}
              >
                <FlagGlyph lang={lang} size="md" />
                <span className="flex-1 font-outfit text-[13px] font-medium text-primary-950">
                  {lang.name}
                </span>
                {isActive && (
                  <IoCheckmark className="text-base text-primary-700" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* Reusable rounded-full primary button  matches design system */
function PrimaryButton({
  children,
  full = false,
  onClick,
}: {
  children: ReactNode;
  full?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${full ? "w-full" : "w-fit"} rounded-full bg-dark-forest px-6 py-3 font-hkl-centra text-sm font-medium text-white transition hover:bg-olive active:scale-95`}
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   01  Splash
   ──────────────────────────────────────────────────────────── */

function ScreenSplash() {
  const nav = useNav();
  useEffect(() => {
    if (!nav) return;
    const id = setTimeout(() => nav.navigate("quote"), 1800);
    return () => clearTimeout(id);
  }, [nav]);
  return (
    <button
      type="button"
      onClick={() => nav?.navigate("quote")}
      className="flex h-full w-full flex-col bg-[#F9FAF3] text-left"
    >
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image
          src="/logo-new.png"
          alt="HKL"
          width={160}
          height={160}
          priority
          className="h-40 w-40 object-contain"
        />
        <p className="mt-6 font-playfair text-base font-light italic tracking-wide text-primary-700">
          Humility · Kindness · Love
        </p>
      </div>
      <HomeIndicator />
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   Reusable auto-advancing image carousel
   ──────────────────────────────────────────────────────────── */

function AutoCarousel({
  slides,
  intervalMs = 3500,
  className = "",
}: {
  slides: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Slide ${i + 1}`}
          fill
          sizes="320px"
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}
      <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-2 py-1 backdrop-blur-sm">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-4 bg-white" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const QUOTE_SLIDES = [
  "https://framerusercontent.com/images/k4lDYkGsFFNK73IbxOnr6fcFd1Y.jpg?width=1865&height=1600",
  "https://framerusercontent.com/images/JTtvtXV9Af7lcVmHgD6CyhuGc.png?width=1188&height=1076",
  "https://framerusercontent.com/images/vAwCMgSuSpTawsKubSVdzhNkqXc.jpg?scale-down-to=512&width=2400&height=1600",
  "https://framerusercontent.com/images/j92GaV0OVD97LGArXMF9MtUIR5c.jpg?scale-down-to=512&width=6000&height=4000",
  "https://framerusercontent.com/images/7AYv0TOC7oxMgTmWngOX74qXA.jpg?scale-down-to=512&width=2302&height=1535",
];

/* ────────────────────────────────────────────────────────────
   02  Animated quote
   ──────────────────────────────────────────────────────────── */

function ScreenQuote() {
  const nav = useNav();
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />

      {/* Top bar: language selector */}
      <div className="relative z-30 flex items-center justify-end px-5 pt-1 pb-3">
        <LanguageDropdown />
      </div>

      {/* Image carousel */}
      <div className="px-5">
        <AutoCarousel
          slides={QUOTE_SLIDES}
          className="aspect-4/3 w-full rounded-3xl bg-primary-200 shadow-[0_15px_40px_-15px_rgba(38,37,30,0.35)]"
        />
      </div>

      {/* Quote */}
      <div className="px-5 pt-8">
        <p className="text-center font-hkl text-[1.2rem] font-bold leading-[1.5] tracking-tight text-primary-950">
          <span className="block">
            The world feels{" "}
            <span className="font-playfair text-[1.35rem] font-semibold italic text-primary-700">
              different
            </span>
          </span>
          <span className="block">
            when the{" "}
            <span className="font-playfair text-[1.35rem] font-semibold italic text-primary-700">
              mind
            </span>{" "}
            is different.
          </span>
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto px-5 pb-6">
        <PrimaryButton full onClick={() => nav?.navigate("auth")}>
          Get Started
        </PrimaryButton>
        <button
          type="button"
          onClick={() => nav?.navigate("auth")}
          className="mt-3 w-full text-center font-outfit text-[11px] text-primary-500"
        >
          Already a member?{" "}
          <span className="font-medium text-primary-700">Sign in</span>
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   03  Auth (name + phone)
   ──────────────────────────────────────────────────────────── */

function ScreenAuth() {
  const nav = useNav();
  const usLang: Language = {
    code: "US",
    name: "United States",
    flagSrc: "/flags/us.svg",
  };
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h1 className="font-hkl text-[2rem] font-bold leading-[1.05] tracking-tight text-primary-950">
          Begin your Journey.
        </h1>

        <div className="mt-8 space-y-3">
          <div className="rounded-xl border border-primary-200 bg-white px-4 py-3.5 font-outfit text-[15px] text-primary-400">
            Your name
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-primary-400 bg-white py-2 pl-2 pr-4 ring-2 ring-primary-100">
            <div className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-2.5 py-2 font-hkl-centra text-[11px] font-semibold uppercase tracking-wider text-primary-950">
              <FlagGlyph lang={usLang} size="sm" />
              +1
              <IoChevronDownOutline className="text-[10px] text-primary-500" />
            </div>
            <span className="flex-1 font-outfit text-[15px] tracking-wide text-primary-400">
              Phone number
            </span>
          </div>
        </div>

        <div className="mt-auto space-y-3.5">
          <PrimaryButton full onClick={() => nav?.navigate("otp")}>
            Send code
          </PrimaryButton>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-primary-200" />
            <span className="font-hkl-centra text-[10px] uppercase tracking-widest text-primary-400">
              or
            </span>
            <div className="h-px flex-1 bg-primary-200" />
          </div>
          <button
            type="button"
            onClick={() => nav?.navigate("save-profile")}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-primary-100 bg-white px-6 py-2.5 font-hkl-centra text-[13px] font-medium text-primary-700 transition hover:border-primary-200 active:scale-95"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={16}
              height={16}
              className="h-4 w-4"
            />
            Continue with Google
          </button>
          <p className="pt-1 text-center font-outfit text-[11px] leading-relaxed text-primary-400">
            By continuing, you agree to our{" "}
            <span className="text-primary-700 underline underline-offset-2">
              Terms
            </span>{" "}
            &{" "}
            <span className="text-primary-700 underline underline-offset-2">
              Privacy
            </span>
            .
          </p>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   04  OTP
   ──────────────────────────────────────────────────────────── */

function ScreenOtp() {
  const nav = useNav();
  const digits = ["7", "3", "9", "", "", ""];
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h1 className="font-hkl text-[2rem] font-bold leading-[1.05] tracking-tight text-primary-950">
          Enter your code.
        </h1>
        <p className="mt-2 font-outfit text-sm text-primary-600">
          Sent to <span className="text-primary-950">+1 ••• 4567</span>
        </p>

        <div className="mt-8 flex justify-between gap-2">
          {digits.map((d, i) => {
            const isFocused = !d && i === digits.findIndex((x) => !x);
            return (
              <div
                key={i}
                className={`flex h-14 w-12 items-center justify-center rounded-xl border font-hkl text-2xl font-bold transition ${
                  d
                    ? "border-primary-300 bg-primary-100 text-primary-900"
                    : isFocused
                      ? "border-2 border-primary-900 bg-white text-primary-950"
                      : "border-primary-200 bg-white text-primary-400"
                }`}
              >
                {d ||
                  (isFocused ? (
                    <span className="h-6 w-px animate-pulse bg-primary-700" />
                  ) : (
                    ""
                  ))}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center font-outfit text-sm text-primary-500">
          Didn&apos;t get it?{" "}
          <span className="text-primary-700 underline underline-offset-2">
            Resend
          </span>
        </p>

        <div className="mt-auto flex">
          <PrimaryButton full onClick={() => nav?.navigate("blank-home")}>
            Verify
          </PrimaryButton>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Home scaffold  HomeHeader + HomePills (live) + FadedHomeBody
   ──────────────────────────────────────────────────────────── */

function HomeHeader() {
  const nav = useNav();
  return (
    <div className="shrink-0 px-5 pt-3">
      <div className="flex items-center justify-between">
        <span className="font-hkl text-2xl font-bold text-primary-950">
          HKL
        </span>
        <div className="flex items-center gap-3">
          <IoSearchOutline className="text-xl text-primary-700" />
          <button
            type="button"
            aria-label="Your profile"
            onClick={() => nav?.navigate("member-profile")}
            className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-300"
          >
            <Image
              src={AVATAR_URL}
              alt="Sarah"
              fill
              sizes="36px"
              className="object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

type Pill = "feed" | "spaces" | "events" | "members" | "leaderboard";

const PILL_TO_SCREEN: Record<Pill, ScreenKey> = {
  feed: "home-feed",
  spaces: "spaces",
  events: "events",
  members: "home-feed",
  leaderboard: "home-feed",
};

function HomePills({ active = "feed" }: { active?: Pill }) {
  const nav = useNav();
  const pills: { id: Pill; label: string }[] = [
    { id: "feed", label: "Feed" },
    { id: "spaces", label: "Spaces" },
    { id: "events", label: "Events" },
    { id: "members", label: "Members" },
    { id: "leaderboard", label: "Leaderboard" },
  ];
  return (
    <div className="shrink-0 px-5 pt-3 pb-1">
      <div className="flex gap-2">
        {pills.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => nav?.navigate(PILL_TO_SCREEN[id])}
              className={`shrink-0 rounded-full px-3.5 py-1.5 font-outfit text-xs font-medium transition ${
                isActive
                  ? "bg-dark-forest text-white"
                  : "border border-primary-200 bg-white text-primary-600"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FadedHomeBody() {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-3">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-primary-100 bg-white p-4"
        >
          {/* Header: avatar + name/time + bookmark + ellipsis */}
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 shrink-0 rounded-full bg-primary-100" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-28 rounded-full bg-primary-100" />
              <div className="h-2 w-12 rounded-full bg-primary-100" />
            </div>
            <div className="h-4 w-4 rounded bg-primary-100" />
            <div className="h-4 w-4 rounded bg-primary-100" />
          </div>

          {/* Title */}
          <div className="mt-3 h-3.5 w-3/4 rounded-full bg-primary-100" />

          {/* Image (first card only) */}
          {i === 1 && (
            <div className="mt-3 aspect-4/3 w-full rounded-xl bg-primary-100" />
          )}

          {/* Body lines */}
          <div className="mt-3 space-y-2">
            <div className="h-2.5 w-full rounded-full bg-primary-100" />
            <div className="h-2.5 w-full rounded-full bg-primary-100" />
            <div className="h-2.5 w-2/3 rounded-full bg-primary-100" />
          </div>

          {/* Action bar: heart/comment + avatar stack + likes count */}
          <div className="mt-3 flex items-center border-t border-primary-100 pt-3">
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 rounded-full bg-primary-100" />
              <div className="h-5 w-5 rounded-full bg-primary-100" />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                <div className="h-5 w-5 rounded-full bg-primary-100 ring-2 ring-white" />
                <div className="h-5 w-5 rounded-full bg-primary-100 ring-2 ring-white" />
                <div className="h-5 w-5 rounded-full bg-primary-100 ring-2 ring-white" />
              </div>
              <div className="h-2.5 w-16 rounded-full bg-primary-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FadedAppScaffold() {
  return (
    <>
      <HomeHeader />
      <HomePills active="feed" />
      <FadedHomeBody />
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   05  Blank home (just after OTP, before popup)
   ──────────────────────────────────────────────────────────── */

function ScreenBlankHome() {
  const nav = useNav();
  useEffect(() => {
    if (!nav) return;
    const id = setTimeout(() => nav.navigate("lotus-popup"), 900);
    return () => clearTimeout(id);
  }, [nav]);
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <FadedAppScaffold />
      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   06  Lotus popup
   ──────────────────────────────────────────────────────────── */

function LotusFlower() {
  return (
    <div className="flower">
      <div className="petal petal1" />
      <div className="petal petal2" />
      <div className="petal petal3" />
      <div className="petal petal4" />
      <div className="petal petal5" />
      <div className="petal petal6" />
      <div className="petal petal7" />
      <div className="petal petal8" />
      <div className="flower-center" />
    </div>
  );
}

function ScreenLotusPopup() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      {/* faded scaffold behind */}
      <StatusBar />
      <FadedAppScaffold />
      <BottomNav active="feed" />
      <HomeIndicator />

      {/* Modal layer  soft stone backdrop with morning rays from top-right */}
      <div className="absolute inset-0 z-40 overflow-hidden bg-[#FAFBF3]/95 backdrop-blur-md">
        {/* Morning light rays + sun glow streaming in from the top-right corner */}
        <svg
          className="lotus-rays pointer-events-none absolute -top-4 -right-4 h-72 w-72"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lotusRay" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFE0A8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFE0A8" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="lotusSun" cx="100%" cy="0%" r="55%">
              <stop offset="0%" stopColor="#FFEDCC" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFEDCC" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Warm sun-glow halo at the top-right */}
          <rect x="0" y="0" width="200" height="200" fill="url(#lotusSun)" />

          {/* Shorter light rays fanning down-left from the corner */}
          <g transform="translate(200, 0)">
            <path d="M 0,0 L -28,130 L -40,130 Z" fill="url(#lotusRay)" />
            <path
              d="M 0,0 L -60,130 L -78,130 Z"
              fill="url(#lotusRay)"
              opacity="0.7"
            />
            <path
              d="M 0,0 L -95,130 L -118,130 Z"
              fill="url(#lotusRay)"
              opacity="0.5"
            />
            <path
              d="M 0,0 L -130,130 L -150,130 Z"
              fill="url(#lotusRay)"
              opacity="0.4"
            />
          </g>
        </svg>

        {/* Mirrored light rays + sun glow on the top-left */}
        <svg
          className="lotus-rays-left pointer-events-none absolute -top-4 -left-4 h-72 w-72"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="lotusRayLeft"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFE0A8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFE0A8" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="lotusSunLeft" cx="0%" cy="0%" r="55%">
              <stop offset="0%" stopColor="#FFEDCC" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFEDCC" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Warm sun-glow halo at the top-left */}
          <rect
            x="0"
            y="0"
            width="200"
            height="200"
            fill="url(#lotusSunLeft)"
          />

          {/* Light rays fanning down-right from the corner */}
          <g transform="translate(0, 0)">
            <path d="M 0,0 L 28,130 L 40,130 Z" fill="url(#lotusRayLeft)" />
            <path
              d="M 0,0 L 60,130 L 78,130 Z"
              fill="url(#lotusRayLeft)"
              opacity="0.7"
            />
            <path
              d="M 0,0 L 95,130 L 118,130 Z"
              fill="url(#lotusRayLeft)"
              opacity="0.5"
            />
            <path
              d="M 0,0 L 130,130 L 150,130 Z"
              fill="url(#lotusRayLeft)"
              opacity="0.4"
            />
          </g>
        </svg>

        {/* Subtle stone counter-glow at the bottom  grounds the composition */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-100 opacity-25 blur-3xl" />

        {/* Structured layout: flower at top, text in middle, CTA pinned to bottom */}
        <div className="relative flex h-full w-full flex-col px-8 pt-10">
          <div className="flex shrink-0 justify-center">
            <LotusFlower />
          </div>

          <div className="mt-8 flex shrink-0 flex-col items-center">
            <p className="font-hkl-centra text-[10px] font-semibold text-primary-700">
              Welcome, Sarah
            </p>
            <h2 className="mt-3 text-center font-hkl text-[1.7rem] font-bold leading-[1.1] tracking-tight text-primary-950">
              You&apos;re not{" "}
              <span className="font-playfair font-light italic text-primary-700">
                alone
              </span>{" "}
              here.
            </h2>
            <p className="mt-3 max-w-72 text-center font-outfit text-[13px] leading-relaxed text-primary-700">
              Two minutes a morning a quiet practice in humility, kindness, and
              love. Held together, across every timezone.
            </p>
          </div>

          <div className="mt-auto flex flex-col items-center gap-3 pb-8">
            <PrimaryButton onClick={() => nav?.navigate("tour-practice")}>
              Begin practice
            </PrimaryButton>
            <button
              type="button"
              onClick={() => nav?.navigate("save-profile")}
              className="font-outfit text-sm text-primary-500 active:scale-95"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Tour stops 07 - 10
   ──────────────────────────────────────────────────────────── */

function TourSheet({
  step,
  title,
  body,
  field,
  ctaLabel = "Continue",
  onContinue,
  onSkip,
}: {
  step: number;
  title: string;
  body: ReactNode;
  field?: ReactNode;
  ctaLabel?: string;
  onContinue?: () => void;
  onSkip?: () => void;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-40 rounded-t-4xl bg-white p-6 pt-3 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.25)]">
      <div className="mx-auto h-1.5 w-12 rounded-full bg-primary-200" />
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1 w-4 rounded-full ${
                  i <= step ? "bg-primary-400" : "bg-primary-100"
                }`}
              />
            ))}
          </div>
          {step < 4 && (
            <button
              type="button"
              onClick={onSkip}
              className="font-outfit text-[11px] font-medium text-primary-500 transition active:scale-95"
            >
              Skip
            </button>
          )}
        </div>
        <h3 className="mt-2.5 font-hkl text-xl font-bold leading-tight text-primary-950">
          {title}
        </h3>
        <div className="mt-2 font-outfit text-[13px] leading-relaxed text-primary-600">
          {body}
        </div>
        {field && <div className="mt-5">{field}</div>}
        <div className="mt-5 flex">
          <PrimaryButton full onClick={onContinue}>
            {ctaLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function FieldDropdown({
  Icon,
  label,
  value,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-primary-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon className="text-xl text-primary-600" />
        <div>
          <p className="font-hkl-centra text-[10px] font-semibold uppercase tracking-widest text-primary-500">
            {label}
          </p>
          <p className="font-outfit text-sm font-medium text-primary-950">
            {value}
          </p>
        </div>
      </div>
      <IoChevronDownOutline className="text-primary-400" />
    </div>
  );
}

function ScreenTourPractice() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <FadedAppScaffold />
      <BottomNav spotlight="practice" />
      <HomeIndicator />

      {/* Dim full screen except the nav */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/35" />

      <TourSheet
        step={1}
        title="The heart of HKL"
        body={
          <>
            Your daily 2-minute commitment lives in{" "}
            <span className="font-medium text-primary-950">Practice</span>. Let
            us set your timezone so we nudge you at the right moment.
          </>
        }
        field={
          <FieldDropdown
            Icon={IoTimeOutline}
            label="Timezone"
            value="America / New York"
          />
        }
        onContinue={() => nav?.navigate("tour-feed")}
        onSkip={() => nav?.navigate("save-profile")}
      />
    </div>
  );
}

function ScreenTourFeed() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <FadedAppScaffold />
      <BottomNav spotlight="feed" />
      <HomeIndicator />

      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/35" />

      <TourSheet
        step={2}
        title="Share what you feel"
        body={
          <>
            The community shares in many languages. We&apos;ll auto-translate
            posts to yours.
          </>
        }
        field={
          <div className="flex flex-wrap gap-2">
            {[
              { label: "English", active: true },
              { label: "ਪੰਜਾਬੀ" },
              { label: "हिन्दी" },
              { label: "Español" },
              { label: "Français" },
              { label: "+3 more" },
            ].map((l) => (
              <span
                key={l.label}
                className={`rounded-full border px-3 py-1.5 font-outfit text-[12px] ${
                  l.active
                    ? "border-primary-950 bg-primary-950 text-primary-50"
                    : "border-primary-200 text-primary-700"
                }`}
              >
                {l.label}
              </span>
            ))}
          </div>
        }
        onContinue={() => nav?.navigate("tour-channels")}
        onSkip={() => nav?.navigate("save-profile")}
      />
    </div>
  );
}

function ScreenTourChannels() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <FadedAppScaffold />
      <BottomNav spotlight="chat" />
      <HomeIndicator />

      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/35" />

      <TourSheet
        step={3}
        title="Walk together"
        body={
          <>
            <p>
              Each morning, the community shares one breath the core daily
              affirmation, in every language.
            </p>
            <div className="mt-3 rounded-xl border border-primary-200 bg-primary-100 px-4 py-3 text-center font-hkl text-[14px] text-primary-950">
              &ldquo;I am{" "}
              <span className="font-playfair font-light text-primary-700">
                Humility
              </span>
              , I am{" "}
              <span className="font-playfair font-light text-primary-700">
                Kindness
              </span>
              , I am{" "}
              <span className="font-playfair font-light text-primary-700">
                Love
              </span>
              .&rdquo;
            </div>
          </>
        }
        onContinue={() => nav?.navigate("tour-you")}
        onSkip={() => nav?.navigate("save-profile")}
      />
    </div>
  );
}

function ScreenTourYou() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <FadedAppScaffold />
      <BottomNav spotlight="alerts" />
      <HomeIndicator />

      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/35" />

      <TourSheet
        step={4}
        title="Your space"
        body={
          <>
            Track your streak and progress here. Tell us where you&apos;re
            joining from we love seeing HKL spread.
          </>
        }
        field={
          <FieldDropdown
            Icon={IoGlobeOutline}
            label="Country"
            value={
              <span className="inline-flex items-center gap-2">
                <span className="text-base">🇺🇸</span> United States
              </span>
            }
          />
        }
        ctaLabel="Finish setup"
        onContinue={() => nav?.navigate("save-profile")}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   11  Save Profile (pre-filled)
   ──────────────────────────────────────────────────────────── */

function EditableField({
  Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (next: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary-200 bg-white px-4 py-2.5 transition focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
      <Icon className="shrink-0 text-lg text-primary-600" />
      <div className="flex min-w-0 flex-1 flex-col">
        <label className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-500">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-0.5 w-full bg-transparent font-outfit text-[13px] font-medium text-primary-950 outline-none placeholder:font-normal placeholder:text-primary-400"
        />
      </div>
    </div>
  );
}

function PickerField({
  Icon,
  label,
  value,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-left transition active:bg-primary-50"
    >
      <Icon className="shrink-0 text-lg text-primary-600" />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-500">
          {label}
        </p>
        <p className="mt-0.5 truncate font-outfit text-[13px] font-medium text-primary-950">
          {value}
        </p>
      </div>
      <IoChevronForward className="shrink-0 text-base text-primary-400" />
    </button>
  );
}

function SectionLabel({
  children,
  spacing = "default",
}: {
  children: ReactNode;
  spacing?: "default" | "tight";
}) {
  const margins = spacing === "tight" ? "mt-4 mb-1" : "mt-6 mb-2";
  return (
    <p
      className={`${margins} px-1 font-hkl-centra text-[10px] font-semibold text-primary-500`}
    >
      {children}
    </p>
  );
}

function ScreenSaveProfile() {
  const nav = useNav();
  const [name, setName] = useState("Sarah Kim");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [age, setAge] = useState("28");
  const [location, setLocation] = useState("Brooklyn, NY");
  const [bio, setBio] = useState("");

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-5">
        {/* Hero */}
        <h1 className="font-hkl text-[1.75rem] font-bold leading-[1.1] tracking-tight text-primary-950">
          Make it yours.
        </h1>
        <p className="mt-1.5 font-outfit text-[13px] text-primary-500">
          A few quick details so the community knows you.
        </p>

        {/* Avatar */}
        <div className="mt-6 flex justify-center">
          <div className="relative">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary-100 ring-1 ring-primary-200">
              <Image
                src={AVATAR_URL}
                alt="Sarah Kim"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <button
              type="button"
              aria-label="Change photo"
              className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-dark-forest text-white ring-2 ring-white transition active:scale-90"
            >
              <IoCameraOutline className="text-sm" />
            </button>
          </div>
        </div>

        {/* About you */}
        <SectionLabel>About you</SectionLabel>
        <div className="space-y-2">
          <EditableField
            Icon={IoPersonOutline}
            label="Name"
            value={name}
            onChange={setName}
            placeholder="Your full name"
          />
          <EditableField
            Icon={IoCallOutline}
            label="Phone"
            value={phone}
            onChange={setPhone}
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
          <EditableField
            Icon={IoCalendarOutline}
            label="Age"
            value={age}
            onChange={setAge}
            type="number"
            placeholder="28"
          />
          <EditableField
            Icon={IoLocationOutline}
            label="Location"
            value={location}
            onChange={setLocation}
            placeholder="City, Region"
          />
        </div>

        {/* Preferences */}
        <SectionLabel>Preferences</SectionLabel>
        <div className="space-y-2">
          <PickerField
            Icon={IoGlobeOutline}
            label="Country"
            value={
              <span className="inline-flex items-center gap-2">
                <span>🇺🇸</span> United States
              </span>
            }
          />
          <PickerField
            Icon={IoLanguageOutline}
            label="Language"
            value="English"
          />
          <PickerField
            Icon={IoTimeOutline}
            label="Timezone"
            value="America / New York"
          />
        </div>

        {/* Bio */}
        <SectionLabel>Bio (optional)</SectionLabel>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="What brings you to HKL?"
          className="w-full resize-none rounded-xl border border-primary-200 bg-white px-4 py-3 font-outfit text-[13px] leading-relaxed text-primary-950 outline-none transition placeholder:text-primary-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />

        <div className="mt-6">
          <PrimaryButton full onClick={() => nav?.navigate("home-feed")}>
            Save &amp; begin
          </PrimaryButton>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   12  Home Feed (post-onboarding)
   ──────────────────────────────────────────────────────────── */

function FeedPost({
  authorName,
  time,
  title,
  body,
  imageUrl,
  likes,
  comments,
}: {
  authorName: string;
  time: string;
  title?: string;
  body: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}) {
  const nav = useNav();
  return (
    <div
      role={nav ? "button" : undefined}
      tabIndex={nav ? 0 : undefined}
      onClick={() => nav?.navigate("post-detail")}
      className={`rounded-2xl border border-primary-100 bg-white p-4 ${nav ? "cursor-pointer transition active:scale-[0.99]" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nav?.navigate("member-profile");
          }}
          className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-300"
        >
          <Image
            src={AVATAR_URL}
            alt={authorName}
            fill
            sizes="36px"
            className="object-cover"
          />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-outfit text-sm font-semibold text-primary-950">
            {authorName}
          </p>
          <span className="font-outfit text-xs text-primary-400">{time}</span>
        </div>
        <button
          type="button"
          className="shrink-0 text-primary-400 transition active:scale-90"
          aria-label="Bookmark"
        >
          <IoBookmarkOutline className="text-base" />
        </button>
        <button
          type="button"
          className="shrink-0 text-primary-400 transition active:scale-90"
          aria-label="More"
        >
          <IoEllipsisHorizontal className="text-base" />
        </button>
      </div>

      {/* Title */}
      {title && (
        <h3 className="mt-3 font-hkl text-base font-bold leading-tight text-primary-950">
          {title}
        </h3>
      )}

      {/* Image */}
      {imageUrl && (
        <div className="relative mt-3 aspect-4/3 w-full overflow-hidden rounded-xl bg-primary-100">
          <Image
            src={imageUrl}
            alt={title ?? "Post image"}
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      )}

      {/* Body */}
      <p className="mt-3 line-clamp-3 font-outfit text-[13px] leading-relaxed text-primary-800">
        {body}
      </p>
      <button
        type="button"
        className="mt-1 font-outfit text-xs text-primary-500 hover:text-primary-700"
      >
        See more
      </button>

      {/* Actions */}
      <div className="mt-3 flex items-center border-t border-primary-100 pt-3">
        <div className="flex items-center gap-4 text-primary-500">
          <button
            type="button"
            aria-label="Like"
            className="transition active:scale-90"
          >
            <IoHeartOutline className="text-lg" />
          </button>
          <button
            type="button"
            aria-label="Comment"
            className="transition active:scale-90"
          >
            <IoChatbubbleOutline className="text-lg" />
          </button>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 font-outfit text-[8px] font-bold text-white ring-2 ring-white">
              JS
            </div>
            <div className="h-5 w-5 rounded-full bg-stone-400 ring-2 ring-white" />
            <div className="h-5 w-5 rounded-full bg-primary-100 ring-2 ring-white" />
          </div>
          <span className="font-outfit text-xs text-primary-500">
            {likes} likes &middot; {comments}{" "}
            {comments === 1 ? "comment" : "comments"}
          </span>
        </div>
      </div>
    </div>
  );
}

function ComposerSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close composer"
        onClick={onClose}
        className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 z-50 rounded-t-4xl bg-white p-5 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.25)]">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-primary-200" />

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="font-outfit text-sm text-primary-500"
          >
            Cancel
          </button>
          <h3 className="font-hkl text-base font-bold text-primary-950">
            New post
          </h3>
          <button
            type="button"
            className="rounded-full bg-dark-forest px-4 py-1.5 font-hkl-centra text-xs font-medium text-white active:scale-95"
          >
            Post
          </button>
        </div>

        {/* Author + space selector */}
        <div className="mt-4 flex items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-300">
            <Image
              src={AVATAR_URL}
              alt="Sarah"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-primary-200 px-3 py-1.5"
          >
            <IoLeafOutline className="text-sm text-primary-700" />
            <span className="font-outfit text-xs font-medium text-primary-950">
              Heartalks
            </span>
            <IoChevronDownOutline className="text-[10px] text-primary-500" />
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Title (optional)"
          className="mt-4 w-full font-hkl text-lg font-bold leading-tight text-primary-950 outline-none placeholder:font-outfit placeholder:font-normal placeholder:text-primary-400"
        />

        {/* Body */}
        <textarea
          placeholder="Share a reflection…"
          rows={4}
          className="mt-2 w-full resize-none font-outfit text-sm leading-relaxed text-primary-900 outline-none placeholder:text-primary-400"
        />

        {/* Toolbar */}
        <div className="mt-2 flex items-center gap-2 border-t border-primary-100 pt-3">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-primary-200 bg-white px-3 py-1.5 font-outfit text-xs text-primary-600"
          >
            <IoImageOutline className="text-base" />
            Photo
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-primary-200 bg-white px-3 py-1.5 font-outfit text-xs text-primary-600"
          >
            <IoMicOutline className="text-base" />
            Audio
          </button>
          <button
            type="button"
            className="rounded-full bg-primary-100 px-3 py-1.5 font-hkl-centra text-[10px] font-semibold uppercase tracking-wider text-primary-700"
          >
            Quote
          </button>
        </div>
      </div>
    </>
  );
}

function ScreenHomeFeed() {
  const [composerOpen, setComposerOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />

      {/* Welcome toast  dismissible, low-weight */}
      {welcomeOpen && (
        <div className="mx-4 mt-1 flex items-center gap-2 rounded-xl bg-primary-50 px-3 py-1.5 text-primary-700">
          <div className="shrink-0">
            <DotLottieReact
              src="/Namaste%20-%20No%20Shake%20Hands.lottie"
              loop
              autoplay
              renderConfig={{ devicePixelRatio: 3, autoResize: true }}
              style={{ width: 22, height: 22 }}
            />
          </div>
          <p className="flex-1 font-outfit text-[11px] tracking-wide">
            Welcome to HKL, Sarah.
          </p>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setWelcomeOpen(false)}
            className="shrink-0 rounded-full p-1 text-primary-500 transition active:bg-primary-100"
          >
            <IoCloseOutline className="text-sm" />
          </button>
        </div>
      )}

      <HomeHeader />
      <HomePills active="feed" />

      {/* Feed */}
      <div className="flex-1 space-y-3 px-4 pt-3">
        <FeedPost
          authorName="Gurmohit Singh Thind"
          time="2d"
          title="The Hands of Humility"
          imageUrl="https://app.circle.so/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCSDJyUlFvPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--0dbf3be7886971c00899e50a79888faf345cc753/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJNEJEQTZDbk5oZG1WeWV3WTZDbk4wY21sd1ZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a9f899a0c764220ba5650fc8daea690765ef2c6f/IMG-20260519-WA0016.jpg"
          body={`"When you are in control of your mind, then you are humble; then you are humble. And when you are not in control of your mind, then the ego takes the place of humility. And that's how you do your duties that is so important; and the duties must be do...`}
          likes={10}
          comments={1}
        />
        <FeedPost
          authorName="Priya Sharma"
          time="5h"
          title="Morning thoughts"
          body="Today I noticed kindness in the smallest moments  a stranger's smile at the bus stop. I want to carry this softness home."
          likes={24}
          comments={5}
        />
      </div>

      {/* Floating action button  opens the composer sheet */}
      <button
        type="button"
        onClick={() => setComposerOpen(true)}
        aria-label="New post"
        className="absolute right-4 bottom-20 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-dark-forest text-white shadow-[0_4px_12px_-4px_rgba(26,60,52,0.3)] transition active:scale-95"
      >
        <IoAddOutline className="text-2xl" />
      </button>

      <BottomNav active="feed" />
      <HomeIndicator />

      {composerOpen && <ComposerSheet onClose={() => setComposerOpen(false)} />}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   13  Spaces  index of all spaces + footer links
   ──────────────────────────────────────────────────────────── */

type SpaceItem = {
  id: string;
  name: string;
  description: string;
  Icon?: ComponentType<{ className?: string }>;
  emoji?: string;
  lottieSrc?: string;
};

const SPACES: SpaceItem[] = [
  {
    id: "say-hello",
    name: "Say Hello",
    description: "Introduce yourself",
    lottieSrc: "/waving%20hand.lottie",
  },
  {
    id: "guidelines",
    name: "Community Guidelines",
    description: "How we keep the garden beautiful",
    emoji: "📜",
  },
  {
    id: "heartalks",
    name: "Heartalks",
    description: "Discussions",
    lottieSrc: "/Heart.lottie",
  },
  {
    id: "resources",
    name: "Resources",
    description: "Articles, videos, tools",
    lottieSrc:
      "/Earth%20globe%20rotating%20with%20Seamless%20loop%20animation.lottie",
  },
  {
    id: "about-hkl",
    name: "About HKL",
    description: "Our story & values",
    Icon: IoLeafOutline,
  },
];

const SPACE_TO_SCREEN: Record<string, ScreenKey> = {
  "say-hello": "say-hello",
  guidelines: "community-guidelines",
  heartalks: "heartalks",
  resources: "resources",
  "about-hkl": "about-hkl",
};

function SpaceRow({ item, meta }: { item: SpaceItem; meta?: string }) {
  const nav = useNav();
  return (
    <button
      type="button"
      onClick={() => {
        const target = SPACE_TO_SCREEN[item.id];
        if (target) nav?.navigate(target);
      }}
      className="flex w-full items-center gap-3 rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-100">
        {item.lottieSrc ? (
          <DotLottieReact
            src={item.lottieSrc}
            loop
            autoplay
            renderConfig={{ devicePixelRatio: 3, autoResize: true }}
            style={{ width: 36, height: 36 }}
          />
        ) : item.emoji ? (
          <span className="text-xl">{item.emoji}</span>
        ) : item.Icon ? (
          <item.Icon className="text-xl text-primary-700" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-outfit text-sm font-semibold text-primary-950">
          {item.name}
        </p>
        <p className="truncate font-outfit text-xs text-primary-500">
          {item.description}
        </p>
        {meta && (
          <p className="mt-0.5 font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-400">
            {meta}
          </p>
        )}
      </div>
      <IoChevronForward className="text-base text-primary-300" />
    </button>
  );
}

function FooterLinkRow({
  Icon,
  label,
  trailing,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  trailing?: ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
    >
      <Icon className="text-lg text-primary-600" />
      <span className="flex-1 font-outfit text-sm text-primary-950">
        {label}
      </span>
      {trailing ?? <IoChevronForward className="text-base text-primary-300" />}
    </button>
  );
}

function ScreenSpaces() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <HomeHeader />
      <HomePills active="spaces" />

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3">
        <p className="px-1 pb-2 font-hkl-centra text-[10px] font-semibold text-primary-500">
          Spaces
        </p>
        <div className="space-y-2">
          {SPACES.map((s) => (
            <SpaceRow key={s.id} item={s} />
          ))}
        </div>

        <p className="px-1 pb-2 pt-5 font-hkl-centra text-[10px] font-semibold text-primary-500">
          More
        </p>
        <div className="space-y-2">
          <FooterLinkRow Icon={IoShareSocialOutline} label="Share the app" />
          <FooterLinkRow Icon={IoMailOutline} label="Contact us" />
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
          >
            <IoHeartOutline className="text-lg text-primary-600" />
            <span className="flex-1 font-outfit text-sm text-primary-950">
              Follow HKL
            </span>
            <span className="flex items-center gap-3 text-primary-600">
              <IoLogoInstagram className="text-base" />
              <IoLogoFacebook className="text-base" />
              <IoLogoYoutube className="text-base" />
            </span>
          </button>
        </div>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Space detail scaffolding  reusable header + content layout
   ──────────────────────────────────────────────────────────── */

function SpaceTopBar({ title }: { title: string }) {
  const nav = useNav();
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-primary-100 px-3 py-3">
      <button
        type="button"
        aria-label="Back"
        onClick={() => nav?.back()}
        className="flex h-8 w-8 items-center justify-center rounded-full text-primary-700 active:bg-primary-50"
      >
        <IoChevronBack className="text-xl" />
      </button>
      <span className="font-hkl text-sm font-bold text-primary-950">
        {title}
      </span>
      <button
        type="button"
        aria-label="More"
        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-primary-700 active:bg-primary-50"
      >
        <IoEllipsisHorizontal className="text-xl" />
      </button>
    </div>
  );
}

function SpaceHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6">
      <div className="h-1 w-6 rounded-full bg-primary-700" />
      <h2 className="mt-2 font-hkl text-[15px] font-bold leading-tight text-primary-950">
        {children}
      </h2>
    </div>
  );
}

function NumberedHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 border-t border-primary-100 pt-4">
      <h2 className="font-hkl text-[15px] font-bold leading-tight text-primary-950">
        {children}
      </h2>
    </div>
  );
}

function SpaceBody({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 font-outfit text-[13px] leading-relaxed text-primary-700">
      {children}
    </p>
  );
}

function HKLAccent({ children }: { children: ReactNode }) {
  return (
    <span className="font-playfair italic text-primary-700">{children}</span>
  );
}

function HashTagPill({ children }: { children: ReactNode }) {
  return (
    <span className="font-medium text-primary-700 underline underline-offset-2">
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   14  Say Hello space
   ──────────────────────────────────────────────────────────── */

function ScreenSayHello() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Say Hello" />

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Cover image  contained so the full artwork is visible */}
        <div className="relative aspect-3/1 w-full bg-primary-100">
          <Image
            src="https://assets-v2.circle.so/970cy6sgttmqwqjpbo7x32u5xxtz"
            alt="Say Hello"
            fill
            sizes="320px"
            className="object-contain object-top"
          />
        </div>

        <div className="px-5 pb-5">
          <h1 className="mt-4 font-hkl text-[1.35rem] font-bold leading-tight tracking-tight text-primary-950">
            Welcome Home to the HKL Movement
          </h1>

          <p className="mt-3 font-outfit text-[13px] leading-relaxed text-primary-700">
            We are so grateful you are here. You have joined a movement
            dedicated to the most important work of our lives: Coming Home to{" "}
            <HKLAccent>Humility, Kindness &amp; Love</HKLAccent>.
          </p>

          <SpaceHeading>What is HKL Movement</SpaceHeading>
          <SpaceBody>
            The HKL Global Movement is dedicated to inspiring everyone to
            awaken, go within, and reconnect with the virtues of{" "}
            <HKLAccent>Humility, Kindness &amp; Love</HKLAccent> that already
            exist within us. As we do so, we become more beautiful within. From
            that arises peace, happiness, lasting contentment, and ripples of
            positive change in our homes, communities, and the wider world.
          </SpaceBody>

          <SpaceHeading>Before we begin…</SpaceHeading>
          <SpaceBody>
            This space is a &ldquo;Beautiful Garden&rdquo; that we all tend
            together. To protect its peace, we invite you to take a moment to
            read our <HashTagPill>#📜 Community Guidelines</HashTagPill>. These
            are not just rules; they are the three qualities we practice here:{" "}
            <em>Is it Humble? Is it Kind? Is it Loving?</em>
          </SpaceBody>

          <div className="mt-3 rounded-xl border border-primary-200 bg-primary-100 px-3 py-2.5 font-outfit text-[12px] leading-relaxed text-primary-700">
            🔔 You can also customize your notification preferences anytime by
            tapping your avatar in the top-right corner and selecting{" "}
            <span className="font-medium text-primary-950">Notifications</span>.
          </div>

          <SpaceHeading>Share Your Fragrance</SpaceHeading>
          <SpaceBody>
            This community isn&apos;t a place to scroll it&apos;s a place to
            connect. Tap{" "}
            <span className="font-medium text-primary-950">New Post</span> and
            share a brief introduction:
          </SpaceBody>
          <div className="mt-4 divide-y divide-primary-100 rounded-xl border border-primary-100 bg-white">
            {[
              {
                title: "Who are you?",
                body: "Your name and where in the world you're joining from.",
              },
              {
                title: "Why are you here?",
                body: "What drew you to HKL? What is your heart seeking?",
              },
              {
                title: 'Your "One Small Thing"?',
                body: "One tiny habit you're changing to live more humbly, kindly, or lovingly.",
              },
            ].map((item) => (
              <div key={item.title} className="px-4 py-3">
                <p className="font-outfit text-sm font-semibold text-primary-950">
                  {item.title}
                </p>
                <p className="mt-1 font-outfit text-xs leading-relaxed text-primary-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <SpaceHeading>Next Steps</SpaceHeading>
          <SpaceBody>
            Once you&apos;ve introduced yourself and welcomed a few others:
          </SpaceBody>
          <div className="mt-3 rounded-xl border border-primary-100 bg-primary-50 p-3">
            <p className="flex items-center gap-2 font-outfit text-[13px] font-semibold text-primary-950">
              <IoLeafOutline className="text-base text-primary-700" />
              Heartalks (Discussions)
            </p>
            <p className="mt-1 font-outfit text-[12px] leading-relaxed text-primary-600">
              Our main discussion space. Whether you have a question, a
              reflection, or an article to share this is where we gather to grow
              together.
            </p>
          </div>
        </div>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   15  Community Guidelines space
   ──────────────────────────────────────────────────────────── */

function ScreenCommunityGuidelines() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Community Guidelines" />

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Cover image  contained so the full artwork is visible */}
        <div className="relative aspect-3/1 w-full bg-primary-100">
          <Image
            src="https://assets-v2.circle.so/xcuxpqh0hol0hjr8bft2fnd2mxcg"
            alt="Community Guidelines"
            fill
            sizes="320px"
            className="object-contain object-top"
          />
        </div>

        <div className="px-5 pb-5">
          <p className="mt-4 font-outfit text-[13px] leading-relaxed text-primary-700">
            Welcome to a space built on{" "}
            <HKLAccent>Humility, Kindness &amp; Love</HKLAccent>. This
            isn&apos;t just what we say it&apos;s how we live. To keep our
            Garden beautiful, we follow these simple intentions.
          </p>

          <NumberedHeading>The Three-Way Test</NumberedHeading>
          <SpaceBody>Before you post or comment, pause and ask:</SpaceBody>
          <div className="mt-3 space-y-2">
            {[
              { emoji: "🌿", q: "Is this Humble?" },
              { emoji: "💛", q: "Is this Kind?" },
              { emoji: "💜", q: "Is this Loving?" },
            ].map((item) => (
              <div
                key={item.q}
                className="flex items-center gap-3 rounded-xl border border-primary-200 bg-primary-100 px-4 py-3"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="font-outfit text-sm font-medium text-primary-950">
                  {item.q}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-outfit text-[13px] leading-relaxed text-primary-700">
            If the answer is yes, we&apos;d love for you to share.
          </p>

          <NumberedHeading>What We Grow Together</NumberedHeading>
          <ul className="mt-2 space-y-1.5 pl-5 font-outfit text-[13px] leading-relaxed text-primary-700">
            <li className="list-disc">
              <span className="font-medium text-primary-950">
                Honest reflection.
              </span>{" "}
              Share your true journey.
            </li>
            <li className="list-disc">
              <span className="font-medium text-primary-950">
                Gentle encouragement.
              </span>{" "}
              Lift others up.
            </li>
            <li className="list-disc">
              <span className="font-medium text-primary-950">
                Lived experience.
              </span>{" "}
              Speak from your own heart and history.
            </li>
          </ul>

          <NumberedHeading>What We Leave Outside</NumberedHeading>
          <SpaceBody>To protect our peace, we don&apos;t allow:</SpaceBody>
          <ul className="mt-2 space-y-1.5 pl-5 font-outfit text-[13px] leading-relaxed text-primary-700">
            <li className="list-disc">Political or religious debates.</li>
            <li className="list-disc">Harsh criticism, shaming, or gossip.</li>
            <li className="list-disc">Self-promotion, spam, or negativity.</li>
          </ul>

          <NumberedHeading>Our Shared Care</NumberedHeading>
          <SpaceBody>
            We are all guardians of this culture. If a post doesn&apos;t reflect
            the HKL spirit, please report it. Moderators may remove content or
            members that disrupt our shared values.
          </SpaceBody>
          <p className="mt-3 font-outfit text-[13px] italic leading-relaxed text-primary-700">
            This space belongs to all of us. Let&apos;s guard it with care.
          </p>

          <div className="mt-4 rounded-xl border border-primary-200 bg-primary-100 px-3 py-2.5 font-outfit text-[12px] leading-relaxed text-primary-700">
            💌 Questions? Reach out via our contact form or email{" "}
            <span className="font-medium text-primary-700 underline underline-offset-2">
              info@hkl.org
            </span>
            .
          </div>
        </div>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   15b  About HKL  story, virtues, contact
   ──────────────────────────────────────────────────────────── */

function VirtueCard({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-primary-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition active:bg-primary-50"
      >
        <span className="font-hkl text-base font-bold text-primary-950">
          {title}
        </span>
        <IoChevronDownOutline
          className={`shrink-0 text-base text-primary-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-primary-100 px-4 pt-3 pb-4">
          <div className="space-y-2.5 font-outfit text-[13px] leading-relaxed text-primary-700">
            {children}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 font-hkl-centra text-[10px] font-semibold uppercase tracking-widest text-primary-500 transition active:scale-95"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function AboutContactRow({
  Icon,
  label,
  value,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-primary-200 bg-white px-4 py-3 text-left transition active:bg-primary-50"
    >
      <Icon className="shrink-0 text-lg text-primary-600" />
      <div className="min-w-0 flex-1">
        <p className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-500">
          {label}
        </p>
        <p className="mt-0.5 truncate font-outfit text-[13px] font-medium text-primary-950">
          {value}
        </p>
      </div>
      <IoChevronForward className="shrink-0 text-base text-primary-400" />
    </button>
  );
}

function ScreenAboutHKL() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="About" />

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Hero image */}
        <div className="relative aspect-3/2 w-full bg-primary-100">
          <Image
            src="https://framerusercontent.com/images/xwzq0RWImpOM3YFFFmVAhwhtB8.png?width=1172&height=980"
            alt="HKL community"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>

        <div className="px-5 pb-6">
          {/* Intro */}
          <p className="mt-6 font-hkl-centra text-[10px] font-semibold text-primary-500">
            What can one do then?
          </p>
          <h1 className="mt-2 font-playfair text-[1.85rem] font-light italic leading-[1.05] tracking-tight text-primary-950">
            Come home to yourself.
          </h1>
          <p className="mt-3 font-outfit text-[13px] leading-relaxed text-primary-700">
            By reconnecting with the virtues of HKL that live within us, we
            become more beautiful, and from that arises happiness, and lasting
            contentment.
          </p>
          <p className="mt-2 font-outfit text-[13px] italic leading-relaxed text-primary-600">
            The self transformation does not begin &ldquo;out there,&rdquo; it
            begins within.
          </p>

          {/* Image 2  landscape */}
          <div className="relative mt-6 aspect-4/3 w-full overflow-hidden rounded-2xl bg-primary-100">
            <Image
              src="https://framerusercontent.com/images/8TBIV05P4sdyFyEnCqnLiAE74o.jpeg?width=1600&height=1066"
              alt="HKL practice in community"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>

          {/* Three virtues */}
          <p className="mt-6 mb-3 font-hkl-centra text-[10px] font-semibold text-primary-500">
            The Three Virtues
          </p>
          <div className="space-y-2">
            <VirtueCard title="Humility" defaultOpen>
              <p>
                Humility is the opposite of Ego. Ego is the false idea that we
                are separate from, or better than, others. It is the &ldquo;I,
                Me, and Mine&rdquo; voice in our head that constantly seeks to
                possess and gain attention, credit, and control. Humility arises
                out of the consciousness that is grateful.
              </p>
              <p>
                It is living free from ego, as a lifelong learner who is open to
                growth and aware that we are part of something greater than
                ourselves. It allows us to listen deeply and grow through our
                experiences.
              </p>
            </VirtueCard>
            <VirtueCard title="Kindness">
              <p>
                Kindness is the opposite of self-centeredness. Kindness is
                rooted in humility and arises from the deep understanding of
                truth that all life is interconnected, calling us to treat every
                being with care &amp; compassion.
              </p>
              <p>
                It means being thoughtful, gentle, and considerate in how we
                think, how we speak and how we act.
              </p>
            </VirtueCard>
            <VirtueCard title="Love">
              <p>
                Love is the universal force, arising from humility at the heart
                of all life. To love is to surrender unconditionally. As the
                heart awakens to love, separation dissolves fear and hatred fall
                away and we recognize our oneness.
              </p>
              <p>
                Thus, we become capable of creating a world where compassion
                flows as a natural expression of our being.
              </p>
            </VirtueCard>
          </div>

          {/* Image 3  portrait */}
          <div className="relative mt-6 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-primary-100">
            <Image
              src="https://framerusercontent.com/images/SqQ3sb2r3ovRvZmGZI0K9UJskxo.jpeg?width=683&height=1024"
              alt="A moment of reflection"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>

          {/* Contact */}
          <p className="mt-6 mb-3 font-hkl-centra text-[10px] font-semibold text-primary-500">
            Get in touch
          </p>
          <div className="space-y-2">
            <AboutContactRow
              Icon={IoGlobeOutline}
              label="Website"
              value="hkl.org"
            />
            <AboutContactRow
              Icon={IoMailOutline}
              label="Email"
              value="info@hkl.org"
            />
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA  always reachable */}
      <div className="shrink-0 border-t border-primary-100 bg-white px-5 py-3">
        <PrimaryButton full>Visit hkl.org</PrimaryButton>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   16  Practice  My Daily Commitment for the Week
   ──────────────────────────────────────────────────────────── */

const DAILY_COMMITMENT_SLIDES = [
  "https://assets-v2.circle.so/r4g3s9zmu35mhqayqn9m9m6isbrk",
  "https://framerusercontent.com/images/k4lDYkGsFFNK73IbxOnr6fcFd1Y.jpg?width=1865&height=1600",
  "https://framerusercontent.com/images/8TBIV05P4sdyFyEnCqnLiAE74o.jpeg?width=1600&height=1066",
  "https://framerusercontent.com/images/xwzq0RWImpOM3YFFFmVAhwhtB8.png?width=1172&height=980",
];

function ScreenDailyCommitment() {
  const nav = useNav();
  const [selected, setSelected] = useState<string | null>("several");

  const options = [
    {
      id: "throughout",
      label: "I practiced this throughout the day today",
    },
    {
      id: "several",
      label: "I practiced this several times during the day today",
    },
    {
      id: "little",
      label: "I tried today, but could only practice for a little while",
    },
    {
      id: "forgiveness",
      label: "I couldn't practice this today and I ask forgiveness from myself",
    },
  ];

  const previousPractices = [
    "https://photos.smugmug.com/Public/My-Daily-Commitments-For-The-Week/i-QhBXpZm/0/L7VhRj5zKwNvbTTf42fFP4M27GxTRRsL5csLm5Nmx/L/5-L.png",
    "https://photos.smugmug.com/Public/My-Daily-Commitments-For-The-Week/i-gffkJtT/0/Lh2Tp62XXkn4KPb7s2sZVJtVRbFFfftTzkxm44WZt/L/6-L.png",
    "https://photos.smugmug.com/Public/My-Daily-Commitments-For-The-Week/i-SNsDjFj/0/KdjgMCXjjnQBL2S9m6TCGKNfn6rrR2D438J7HgNdJ/L/7-L.png",
  ];

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />

      <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
        {/* Cover image carousel */}
        <AutoCarousel
          slides={DAILY_COMMITMENT_SLIDES}
          className="aspect-3/1 w-full bg-primary-100"
        />
        {/* Accent strip */}
        <div className="h-1.5 w-full bg-primary-100" />

        {/* Hero */}
        <div className="px-5 pt-5">
          <h1 className="font-hkl text-[1.25rem] font-bold leading-tight tracking-tight text-primary-950">
            My Daily Commitment For The Week
          </h1>
        </div>

        {/* Practice body */}
        <div className="mt-4 space-y-3 px-5 font-outfit text-[13px] leading-relaxed text-primary-700">
          <p>
            Our daily practice for the coming week to become more humble,
            kinder, loving &amp; forgiving is to sit peacefully with closed eyes
            and check the state of our consciousness.
          </p>
          <p>
            Close your eyes and feel: Am I peaceful? Am I loving? Am I kinder?
            Am I forgiving? Or am I angry, worried, reactive, or insecure?
          </p>
          <p>
            Remain grateful to God for everything, and pray to Him for
            everybody&apos;s wellbeing.
          </p>
        </div>

        {/* Today's log */}
        <div className="mt-6 px-5">
          <div className="space-y-1.5">
            {options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                    isSelected
                      ? "border-primary-400 bg-primary-100"
                      : "border-primary-200 bg-white active:bg-primary-50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isSelected
                        ? "border-primary-700 bg-primary-700"
                        : "border-primary-300 bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <IoCheckmark className="text-[11px] text-white" />
                    )}
                  </span>
                  <span
                    className={`flex-1 font-outfit text-[13px] leading-snug ${
                      isSelected
                        ? "font-medium text-primary-950"
                        : "text-primary-700"
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <PrimaryButton full onClick={() => nav?.navigate("home-feed")}>
              Submit
            </PrimaryButton>
          </div>
        </div>

        {/* Previous Weekly Practices */}
        <div className="mt-8 px-5">
          <h2 className="font-hkl text-[1.15rem] font-bold leading-tight text-primary-950">
            Previous Weekly Practices
          </h2>
          <p className="mt-2 font-outfit text-[13px] leading-relaxed text-primary-700">
            Missed a previous weekly practice? Would like to give another week a
            try? Here are some of the previous weekly challenges.
          </p>
        </div>

        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-contain px-5 pb-2 [&::-webkit-scrollbar]:hidden">
          {previousPractices.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[3/4] w-56 shrink-0 snap-center overflow-hidden rounded-2xl border border-primary-100 bg-primary-50"
            >
              <Image
                src={src}
                alt={`Previous weekly practice ${i + 1}`}
                fill
                sizes="224px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 px-5">
          <PrimaryButton full>Practice &amp; Share</PrimaryButton>
        </div>
      </div>

      <BottomNav active="practice" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   17  Chat  channels + direct messages
   ──────────────────────────────────────────────────────────── */

type ChatItem = {
  id: string;
  kind: "channel" | "private" | "group" | "dm";
  name: string;
  preview: string;
  time: string;
  unread?: number;
  avatarBg?: string;
  avatarFg?: string;
  initial?: string;
};

const PRIVATE_CHANNELS: ChatItem[] = [
  {
    id: "leadership-circle",
    kind: "private",
    name: "leadership-circle",
    preview: "Anjali shared a note for next week.",
    time: "4h",
    unread: 1,
  },
  {
    id: "facilitators",
    kind: "private",
    name: "facilitators",
    preview: "Reminder: weekly sync tomorrow at 8am.",
    time: "1d",
  },
];

const GROUPS: ChatItem[] = [
  {
    id: "morning-circle",
    kind: "group",
    name: "Morning Practice Circle",
    preview: "Anjali: 5/5 today 🌅",
    time: "12m",
    unread: 2,
  },
];

const DMS: ChatItem[] = [
  {
    id: "priya",
    kind: "dm",
    name: "Priya Sharma",
    preview: "Thank you for the reflection 🌷",
    time: "5m",
    unread: 1,
    avatarBg: "bg-primary-200",
    avatarFg: "text-primary-900",
    initial: "P",
  },
  {
    id: "marco",
    kind: "dm",
    name: "Marco Rossi",
    preview: "See you tomorrow morning 🌅",
    time: "1d",
    avatarBg: "bg-terracotta/15",
    avatarFg: "text-terracotta",
    initial: "M",
  },
  {
    id: "gurmohit",
    kind: "dm",
    name: "Gurmohit Singh",
    preview: "Welcome to the community.",
    time: "2d",
    avatarBg: "bg-primary-100",
    avatarFg: "text-primary-700",
    initial: "G",
  },
];

function ChatAvatar({ item }: { item: ChatItem }) {
  if (item.kind === "private") {
    return (
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100">
        <span className="font-hkl-centra text-lg font-semibold text-primary-700">
          #
        </span>
        <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-dark-forest text-white ring-2 ring-white">
          <IoLockClosedOutline className="text-[8px]" />
        </span>
      </div>
    );
  }
  if (item.kind === "channel") {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100">
        <span className="font-hkl-centra text-lg font-semibold text-primary-700">
          #
        </span>
      </div>
    );
  }
  if (item.kind === "group") {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100">
        <IoPeopleOutline className="text-lg text-primary-700" />
      </div>
    );
  }
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.avatarBg ?? "bg-primary-100"}`}
    >
      <span
        className={`font-hkl-centra text-sm font-semibold ${item.avatarFg ?? "text-primary-700"}`}
      >
        {item.initial}
      </span>
    </div>
  );
}

function ChatRow({ item }: { item: ChatItem }) {
  const nav = useNav();
  const hasUnread = (item.unread ?? 0) > 0;
  return (
    <button
      type="button"
      onClick={() => nav?.navigate("dm-thread")}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition active:bg-primary-50"
    >
      <ChatAvatar item={item} />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`truncate font-outfit text-sm ${
              hasUnread
                ? "font-semibold text-primary-950"
                : "font-medium text-primary-950"
            }`}
          >
            {item.kind === "channel" || item.kind === "private"
              ? `#${item.name}`
              : item.name}
          </p>
          <span
            className={`shrink-0 font-outfit text-[10px] ${
              hasUnread ? "font-semibold text-primary-700" : "text-primary-400"
            }`}
          >
            {item.time}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={`truncate font-outfit text-xs ${
              hasUnread ? "text-primary-700" : "text-primary-500"
            }`}
          >
            {item.preview}
          </p>
          {hasUnread && (
            <span className="ml-1 flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-primary-700 px-1.5 font-outfit text-[10px] font-semibold text-white">
              {item.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ScreenChat() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <HomeHeader />

      {/* Title row */}
      <div className="shrink-0 px-5 pt-3 pb-2">
        <h1 className="font-hkl text-xl font-bold text-primary-950">
          Conversations
        </h1>
      </div>

      {/* Search */}
      <div className="px-5 pb-2">
        <div className="flex items-center gap-2 rounded-xl border border-primary-200 bg-white px-3 py-2">
          <IoSearchOutline className="text-base text-primary-400" />
          <input
            type="text"
            placeholder="Search channels and people"
            className="flex-1 font-outfit text-[13px] text-primary-950 outline-none placeholder:text-primary-400"
          />
        </div>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 pt-2 pb-4">
        {PRIVATE_CHANNELS.map((c) => (
          <ChatRow key={c.id} item={c} />
        ))}
        {GROUPS.map((g) => (
          <ChatRow key={g.id} item={g} />
        ))}

        <p className="mt-3 px-2 pt-2 pb-1 font-hkl-centra text-[10px] font-semibold text-primary-700">
          Direct messages
        </p>
        {DMS.map((d) => (
          <ChatRow key={d.id} item={d} />
        ))}
      </div>

      {/* FAB  new chat */}
      <button
        type="button"
        onClick={() => nav?.navigate("new-message")}
        className="absolute right-4 bottom-24 z-30 flex items-center gap-2 rounded-full bg-dark-forest pl-3 pr-4 py-2.5 text-white shadow-[0_4px_12px_-4px_rgba(26,60,52,0.3)] transition active:scale-95"
      >
        <IoCreateOutline className="text-lg" />
        <span className="font-hkl-centra text-[12px] font-medium">New</span>
      </button>

      <BottomNav active="chat" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   18  Alerts  notifications inbox with tabs
   ──────────────────────────────────────────────────────────── */

type AlertKind =
  | "like"
  | "comment"
  | "mention"
  | "event"
  | "messages"
  | "streak"
  | "members";

type AlertTab = "inbox" | "mentions" | "threads" | "following" | "archived";

type AlertItem = {
  id: string;
  kind: AlertKind;
  actorName?: string;
  actorImage?: string;
  action: ReactNode;
  preview?: string;
  time: string;
  group: "today" | "week" | "earlier";
  unread?: boolean;
  archived?: boolean;
};

const ALERTS: AlertItem[] = [
  {
    id: "a1",
    kind: "like",
    actorName: "Priya Sharma",
    actorImage: AVATAR_URL,
    action: "liked your reflection",
    preview: "Morning thoughts",
    time: "12m",
    group: "today",
    unread: true,
  },
  {
    id: "a2",
    kind: "comment",
    actorName: "Marco Rossi",
    actorImage: AVATAR_URL,
    action: "commented on your post",
    preview: "Beautifully said 🙏 carrying this with me today.",
    time: "1h",
    group: "today",
    unread: true,
  },
  {
    id: "a3",
    kind: "mention",
    actorName: "Gurmohit Singh",
    actorImage: AVATAR_URL,
    action: (
      <>
        mentioned you in <span className="font-medium">#heartalks</span>
      </>
    ),
    time: "3h",
    group: "today",
    unread: true,
  },
  {
    id: "a4",
    kind: "event",
    action: (
      <>
        <span className="font-semibold text-primary-950">
          HKL Saturday Meetup
        </span>{" "}
        starts tomorrow at 10:30 PM IST
      </>
    ),
    time: "1d",
    group: "week",
  },
  {
    id: "a5",
    kind: "messages",
    action: (
      <>
        5 new messages in{" "}
        <span className="font-semibold text-primary-950">
          Morning Practice Circle
        </span>
      </>
    ),
    time: "2d",
    group: "week",
  },
  {
    id: "a6",
    kind: "streak",
    action: (
      <>
        You completed your{" "}
        <span className="font-semibold text-primary-950">7-day streak</span> 🌱
      </>
    ),
    time: "1w",
    group: "earlier",
  },
  {
    id: "a7",
    kind: "members",
    action: (
      <>
        <span className="font-semibold text-primary-950">3 new members</span>{" "}
        joined the community
      </>
    ),
    time: "2w",
    group: "earlier",
  },
  // Archived examples
  {
    id: "a8",
    kind: "like",
    actorName: "Anjali Mehta",
    actorImage: AVATAR_URL,
    action: "liked your comment",
    time: "3w",
    group: "earlier",
    archived: true,
  },
  {
    id: "a9",
    kind: "event",
    action: (
      <>
        <span className="font-semibold text-primary-950">
          Monthly Reflection
        </span>{" "}
        recording is now available
      </>
    ),
    time: "1mo",
    group: "earlier",
    archived: true,
  },
];

function getAlertBadge(kind: AlertKind): {
  Icon?: ComponentType<{ className?: string }>;
  text?: string;
  tint: string;
} {
  switch (kind) {
    case "like":
      return { Icon: IoHeart, tint: "bg-terracotta" };
    case "comment":
      return { Icon: IoChatbubbleOutline, tint: "bg-primary-700" };
    case "mention":
      return { text: "@", tint: "bg-primary-900" };
    case "event":
      return { Icon: IoCalendarOutline, tint: "bg-primary-700" };
    case "messages":
      return { Icon: IoChatbubbleOutline, tint: "bg-primary-700" };
    case "streak":
      return { Icon: IoLeafOutline, tint: "bg-primary-700" };
    case "members":
      return { Icon: IoPeopleOutline, tint: "bg-primary-700" };
  }
}

function AlertAvatar({ item }: { item: AlertItem }) {
  const badge = getAlertBadge(item.kind);
  const BadgeIcon = badge.Icon;
  return (
    <div className="relative shrink-0">
      {item.actorImage ? (
        <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-primary-200">
          <Image
            src={item.actorImage}
            alt=""
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100">
          {BadgeIcon && <BadgeIcon className="text-base text-primary-700" />}
        </div>
      )}
      {item.actorImage && (
        <span
          className={`absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white ${badge.tint}`}
        >
          {BadgeIcon ? (
            <BadgeIcon className="text-[10px] text-white" />
          ) : (
            <span className="font-hkl-centra text-[10px] font-bold text-white">
              {badge.text}
            </span>
          )}
        </span>
      )}
    </div>
  );
}

function AlertRow({ item }: { item: AlertItem }) {
  const nav = useNav();
  return (
    <button
      type="button"
      onClick={() => nav?.navigate("post-detail")}
      className={`relative flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition active:bg-primary-100 ${
        item.unread ? "bg-primary-50" : "bg-white"
      }`}
    >
      <AlertAvatar item={item} />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-outfit text-[13px] leading-snug">
          {item.actorName ? (
            <>
              <span className="font-semibold text-primary-950">
                {item.actorName}
              </span>{" "}
              <span className="text-primary-600">{item.action}</span>
            </>
          ) : (
            <span className="text-primary-700">{item.action}</span>
          )}
        </p>
        {item.preview && (
          <p className="mt-1 line-clamp-2 font-outfit text-[12px] italic text-primary-500">
            &ldquo;{item.preview}&rdquo;
          </p>
        )}
        <span className="mt-1 font-outfit text-[10px] text-primary-400">
          {item.time}
        </span>
      </div>
      {item.unread && (
        <span className="absolute top-3.5 right-3 h-2 w-2 shrink-0 rounded-full bg-terracotta" />
      )}
    </button>
  );
}

function filterByTab(items: AlertItem[], tab: AlertTab): AlertItem[] {
  if (tab === "archived") return items.filter((i) => i.archived);
  const active = items.filter((i) => !i.archived);
  if (tab === "inbox") return active;
  if (tab === "mentions") return active.filter((i) => i.kind === "mention");
  if (tab === "threads") return active.filter((i) => i.kind === "comment");
  if (tab === "following") return active.filter((i) => i.actorName);
  return active;
}

const TAB_OPTIONS: { id: AlertTab; label: string }[] = [
  { id: "inbox", label: "Inbox" },
  { id: "mentions", label: "Mentions" },
  { id: "threads", label: "Threads" },
  { id: "following", label: "Following" },
  { id: "archived", label: "Archived" },
];

function ScreenAlerts() {
  const [activeTab, setActiveTab] = useState<AlertTab>("inbox");
  const items = filterByTab(ALERTS, activeTab);
  const today = items.filter((i) => i.group === "today");
  const week = items.filter((i) => i.group === "week");
  const earlier = items.filter((i) => i.group === "earlier");
  const unreadCount = items.filter((i) => i.unread).length;

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <HomeHeader />

      {/* Title row */}
      <div className="flex shrink-0 items-center justify-between px-5 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <h1 className="font-hkl text-xl font-bold text-primary-950">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-terracotta/15 px-2 py-0.5 font-hkl-centra text-[10px] font-semibold text-terracotta">
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          type="button"
          className="font-outfit text-[11px] font-medium text-primary-500 active:scale-95"
        >
          Mark all read
        </button>
      </div>

      {/* Tabs */}
      <div className="shrink-0 overflow-x-auto overscroll-contain border-b border-primary-100 px-4 pb-2 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1.5">
          {TAB_OPTIONS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 font-outfit text-[12px] font-medium transition ${
                  isActive
                    ? "bg-primary-950 text-white"
                    : "border border-primary-200 bg-white text-primary-600 active:bg-primary-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-2 pb-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
              <IoChatbubbleOutline className="text-2xl text-primary-400" />
            </div>
            <p className="font-hkl text-sm font-bold text-primary-950">
              Nothing here yet
            </p>
            <p className="font-outfit text-[12px] leading-relaxed text-primary-500">
              When activity for this tab arrives, you&apos;ll see it here.
            </p>
          </div>
        ) : (
          <>
            {today.length > 0 && (
              <>
                <SectionLabel spacing="tight">Today</SectionLabel>
                {today.map((a) => (
                  <AlertRow key={a.id} item={a} />
                ))}
              </>
            )}
            {week.length > 0 && (
              <>
                <SectionLabel spacing="tight">This week</SectionLabel>
                {week.map((a) => (
                  <AlertRow key={a.id} item={a} />
                ))}
              </>
            )}
            {earlier.length > 0 && (
              <>
                <SectionLabel spacing="tight">Earlier</SectionLabel>
                {earlier.map((a) => (
                  <AlertRow key={a.id} item={a} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <BottomNav active="alerts" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   19  Events list  under Feed tab → Events pill
   ──────────────────────────────────────────────────────────── */

type EventListItem = {
  id: string;
  month: string;
  day: string;
  title: string;
  time: string;
  going: number;
  attending?: boolean;
};

const EVENTS_THIS_WEEK: EventListItem[] = [
  {
    id: "saturday-meetup",
    month: "May",
    day: "23",
    title: "HKL Saturday Meetup",
    time: "Sat · 10:30 PM IST · Zoom",
    going: 128,
    attending: true,
  },
  {
    id: "morning-circle",
    month: "May",
    day: "25",
    title: "Morning Practice Circle",
    time: "Mon · 6:00 AM IST · Zoom",
    going: 45,
  },
];

const EVENTS_LATER: EventListItem[] = [
  {
    id: "monthly-reflection",
    month: "May",
    day: "30",
    title: "Monthly Reflection",
    time: "Sat · 9:00 PM IST · Zoom",
    going: 89,
  },
];

function EventRow({ item }: { item: EventListItem }) {
  const nav = useNav();
  return (
    <button
      type="button"
      onClick={() => nav?.navigate("event-detail")}
      className="flex w-full items-center gap-3 rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
    >
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-100">
        <span className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-500">
          {item.month}
        </span>
        <span className="mt-0.5 font-hkl text-base font-bold leading-none text-primary-950">
          {item.day}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate font-outfit text-sm font-semibold text-primary-950">
            {item.title}
          </p>
          {item.attending && (
            <span className="shrink-0 rounded-full bg-terracotta/15 px-1.5 py-0.5 font-hkl-centra text-[8px] font-semibold uppercase tracking-wider text-terracotta">
              Going
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate font-outfit text-[11.5px] text-primary-500">
          {item.time}
        </p>
        <p className="mt-1 font-outfit text-[11px] text-primary-400">
          <span className="font-medium text-primary-700">{item.going}</span>{" "}
          going
        </p>
      </div>
      <IoChevronForward className="text-base text-primary-300" />
    </button>
  );
}

function ScreenEvents() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <HomeHeader />
      <HomePills active="events" />

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3">
        <p className="px-1 pb-2 font-hkl-centra text-[10px] font-semibold text-primary-500">
          This week
        </p>
        <div className="space-y-2">
          {EVENTS_THIS_WEEK.map((e) => (
            <EventRow key={e.id} item={e} />
          ))}
        </div>

        <p className="px-1 pt-5 pb-2 font-hkl-centra text-[10px] font-semibold text-primary-500">
          Later this month
        </p>
        <div className="space-y-2">
          {EVENTS_LATER.map((e) => (
            <EventRow key={e.id} item={e} />
          ))}
        </div>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   20  Event detail  HKL Saturday Meetup
   ──────────────────────────────────────────────────────────── */

function ScreenEventDetail() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Event" />

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Cover image */}
        <div className="relative aspect-3/2 w-full bg-primary-100">
          <Image
            src="https://assets-v2.circle.so/6m6iyb4tuytme1viuez07y2528tu"
            alt="HKL Saturday Meetup"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>

        <div className="px-5 pb-6">
          {/* Title row  date pill + meta */}
          <div className="mt-4 flex items-start gap-3">
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-primary-200 bg-white">
              <span className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-700">
                May
              </span>
              <span className="mt-0.5 font-hkl text-lg font-bold leading-none text-primary-950">
                23
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-hkl-centra text-[10px] font-semibold text-primary-700">
                Saturday Practice
              </p>
              <h1 className="mt-1 font-hkl text-[1.25rem] font-bold leading-tight text-primary-950">
                HKL Saturday Meetup
              </h1>
              <p className="mt-1 font-outfit text-xs text-primary-500">
                Sat, May 23 · 10:30–11:15 PM IST
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <PrimaryButton full>Join virtual event</PrimaryButton>
          </div>

          <p className="mt-2 text-center font-outfit text-[11px] text-primary-500">
            Repeats every Saturday
          </p>

          {/* Going + Add to calendar */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-primary-100 bg-primary-50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-200 font-hkl-centra text-[10px] font-semibold text-primary-900 ring-2 ring-white">
                  P
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta/15 font-hkl-centra text-[10px] font-semibold text-terracotta ring-2 ring-white">
                  M
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 font-hkl-centra text-[10px] font-semibold text-primary-700 ring-2 ring-white">
                  G
                </span>
              </div>
              <span className="font-outfit text-xs text-primary-700">
                <span className="font-semibold text-primary-950">128</span>{" "}
                going
              </span>
            </div>
            <button
              type="button"
              className="font-outfit text-xs text-primary-700 underline underline-offset-2"
            >
              Add to calendar
            </button>
          </div>

          {/* Event metadata */}
          <div className="mt-5 overflow-hidden rounded-xl border border-primary-100 bg-white">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100">
                <IoCalendarOutline className="text-base text-primary-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-outfit text-[11px] text-primary-500">When</p>
                <p className="mt-0.5 font-outfit text-[13px] font-medium text-primary-950">
                  Sat, May 23 · 10:30 PM IST
                </p>
              </div>
            </div>
            <div className="h-px bg-primary-100" />
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100">
                <IoRepeatOutline className="text-base text-primary-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-outfit text-[11px] text-primary-500">
                  Repeats
                </p>
                <p className="mt-0.5 font-outfit text-[13px] font-medium text-primary-950">
                  Every Saturday · 45 min
                </p>
              </div>
            </div>
            <div className="h-px bg-primary-100" />
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100">
                <IoVideocamOutline className="text-base text-primary-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-outfit text-[11px] text-primary-500">
                  Where
                </p>
                <p className="mt-0.5 font-outfit text-[13px] font-medium text-primary-950">
                  Zoom Meeting
                </p>
              </div>
              <IoChevronForward className="shrink-0 text-sm text-primary-400" />
            </div>
            <div className="h-px bg-primary-100" />
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200">
                <Image
                  src={AVATAR_URL}
                  alt="Host"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-outfit text-[11px] text-primary-500">
                  Hosted by
                </p>
                <p className="mt-0.5 font-outfit text-[13px] font-medium text-primary-950">
                  Anjali Mehta
                </p>
              </div>
            </div>
          </div>

          {/* Zoom joining details */}
          <div className="mt-3 rounded-xl border border-primary-100 bg-primary-50 p-3">
            <p className="truncate font-outfit text-[11px] text-primary-700 underline underline-offset-2">
              us06web.zoom.us/j/7952226852
            </p>
            <div className="mt-2 flex gap-4 font-outfit text-[11px] text-primary-500">
              <span>
                ID{" "}
                <span className="font-medium text-primary-950">
                  795 222 6852
                </span>
              </span>
              <span>
                Code{" "}
                <span className="font-medium text-primary-950">500700</span>
              </span>
            </div>
          </div>

          {/* About this event  combines What + How */}
          <SpaceHeading>About this event</SpaceHeading>
          <SpaceBody>
            A reflective gathering inviting us to recognize{" "}
            <HKLAccent>humility, kindness, and love</HKLAccent> within and
            around us. By experiencing transformation using simple practices
            such as the{" "}
            <span className="text-primary-700 underline underline-offset-2">
              I Commit
            </span>{" "}
            practice.
          </SpaceBody>

          {/* Invite callout */}
          <div className="mt-4 rounded-xl border border-primary-200 bg-primary-100 px-3 py-2.5 font-outfit text-[12px] leading-relaxed text-primary-700">
            👉 If you know others who might benefit from this session, feel free
            to invite them too.
          </div>

          <p className="mt-4 font-outfit text-[12px] italic leading-relaxed text-primary-600">
            Research shows that it takes 40–60 days of consistent practice to
            form a habit. Let&apos;s encourage one another to commit to
            self-care and become the most beautiful version of ourselves.
          </p>
        </div>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   20c  Heartalks  discussion threads
   ──────────────────────────────────────────────────────────── */

type Thread = {
  id: string;
  starter: string;
  title: string;
  preview: string;
  replies: number;
  time: string;
  unread?: boolean;
};

const HEARTALKS_THREADS: Thread[] = [
  {
    id: "t1",
    starter: "Anjali Mehta",
    title: "How do you stay humble when receiving praise?",
    preview:
      "I've been thinking about this all week. When someone thanks you for something, the ego quietly wants to take credit…",
    replies: 24,
    time: "3h",
    unread: true,
  },
  {
    id: "t2",
    starter: "Gurmohit Singh",
    title: "Sharing small moments of kindness from this week",
    preview:
      "A stranger let me go ahead at the grocery store yesterday. Such a small thing  and yet it shifted my whole afternoon.",
    replies: 41,
    time: "1d",
  },
  {
    id: "t3",
    starter: "Marco Rossi",
    title: "What does 'love is not a feeling' mean to you?",
    preview:
      "Someone said this in a circle last month and I've been sitting with it. Curious how others interpret it…",
    replies: 17,
    time: "2d",
  },
  {
    id: "t4",
    starter: "Priya Sharma",
    title: "Forgiveness practice  what helps you let go?",
    preview:
      "Working on forgiving an old hurt. Not for them, for me. Would love to hear what has worked for others.",
    replies: 33,
    time: "4d",
  },
];

function ThreadRow({ item }: { item: Thread }) {
  const nav = useNav();
  return (
    <button
      type="button"
      onClick={() => nav?.navigate("post-detail")}
      className="flex w-full items-start gap-3 rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
    >
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200">
        <Image
          src={AVATAR_URL}
          alt={item.starter}
          fill
          sizes="36px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-outfit text-[12px] text-primary-500">
            {item.starter}
          </p>
          <span className="shrink-0 font-outfit text-[10px] text-primary-400">
            {item.time}
          </span>
        </div>
        <p className="mt-0.5 font-outfit text-[13px] font-semibold leading-snug text-primary-950">
          {item.title}
        </p>
        <p className="mt-1 line-clamp-2 font-outfit text-[12px] leading-relaxed text-primary-600">
          {item.preview}
        </p>
        <div className="mt-2 flex items-center gap-1.5 font-outfit text-[11px] text-primary-500">
          <IoChatbubbleOutline className="text-xs" />
          <span>{item.replies} replies</span>
        </div>
      </div>
      {item.unread && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-terracotta" />
      )}
    </button>
  );
}

function ScreenHeartalks() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Heartalks" />

      <div className="flex-1 overflow-y-auto overscroll-contain pb-20">
        {/* Hero strip */}
        <div className="flex items-center gap-3 border-b border-primary-100 bg-primary-50 px-5 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-100">
            <DotLottieReact
              src="/Heart.lottie"
              loop
              autoplay
              renderConfig={{ devicePixelRatio: 3, autoResize: true }}
              style={{ width: 32, height: 32 }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-hkl text-sm font-bold text-primary-950">
              Heartalks
            </p>
            <p className="mt-0.5 font-outfit text-[11px] text-primary-500">
              Open discussions on what we&apos;re practicing
            </p>
          </div>
        </div>

        {/* Threads */}
        <p className="px-5 pt-4 pb-2 font-hkl-centra text-[10px] font-semibold text-primary-500">
          Recent discussions
        </p>
        <div className="space-y-2 px-3">
          {HEARTALKS_THREADS.map((t) => (
            <ThreadRow key={t.id} item={t} />
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        type="button"
        className="absolute right-4 bottom-24 z-30 flex items-center gap-2 rounded-full bg-dark-forest pl-3 pr-4 py-2.5 text-white shadow-[0_4px_12px_-4px_rgba(26,60,52,0.3)] transition active:scale-95"
      >
        <IoAddOutline className="text-lg" />
        <span className="font-hkl-centra text-[12px] font-medium">
          Start a thread
        </span>
      </button>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   20d  Resources  articles, videos, practices
   ──────────────────────────────────────────────────────────── */

type Resource = {
  id: string;
  kind: "Article" | "Video" | "Practice";
  title: string;
  author: string;
  meta: string;
  imageUrl?: string;
};

const RESOURCES: Resource[] = [
  {
    id: "r1",
    kind: "Article",
    title: "Humility as a daily practice, not a personality trait",
    author: "Anjali Mehta",
    meta: "8 min read",
    imageUrl:
      "https://framerusercontent.com/images/8TBIV05P4sdyFyEnCqnLiAE74o.jpeg?width=1600&height=1066",
  },
  {
    id: "r2",
    kind: "Video",
    title: "Guided breath: settling the mind before practice",
    author: "Priya Sharma",
    meta: "12 min",
    imageUrl:
      "https://framerusercontent.com/images/SqQ3sb2r3ovRvZmGZI0K9UJskxo.jpeg?width=683&height=1024",
  },
  {
    id: "r3",
    kind: "Practice",
    title: "The Three-Way Test  for what you're about to say",
    author: "HKL Collective",
    meta: "5 min · Saved by 248",
    imageUrl:
      "https://framerusercontent.com/images/xwzq0RWImpOM3YFFFmVAhwhtB8.png?width=1172&height=980",
  },
  {
    id: "r4",
    kind: "Article",
    title: "On gratitude: small noticings that change a day",
    author: "Marco Rossi",
    meta: "6 min read",
  },
];

const RESOURCE_FILTERS = ["All", "Articles", "Videos", "Practices"];

function ResourceCard({ item }: { item: Resource }) {
  return (
    <button
      type="button"
      className="flex w-full items-start gap-3 rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-primary-100">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IoBookmarkOutline className="text-lg text-primary-400" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full bg-primary-100 px-2 py-0.5 font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-700">
          {item.kind}
        </span>
        <p className="mt-1.5 line-clamp-2 font-outfit text-[13px] font-semibold leading-snug text-primary-950">
          {item.title}
        </p>
        <p className="mt-1 font-outfit text-[11px] text-primary-500">
          {item.author} · {item.meta}
        </p>
      </div>
    </button>
  );
}

function ScreenResources() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Resources" />

      {/* Filter chips */}
      <div className="shrink-0 overflow-x-auto overscroll-contain border-b border-primary-100 px-4 py-3 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1.5">
          {RESOURCE_FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 rounded-full px-3 py-1.5 font-outfit text-[12px] font-medium transition ${
                  isActive
                    ? "bg-primary-950 text-white"
                    : "border border-primary-200 bg-white text-primary-600 active:bg-primary-50"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource list */}
      <div className="flex-1 overflow-y-auto overscroll-contain space-y-2 px-3 py-4">
        {RESOURCES.map((r) => (
          <ResourceCard key={r.id} item={r} />
        ))}
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   21  Post detail  full post + comments
   ──────────────────────────────────────────────────────────── */

const POST_COMMENTS: {
  id: string;
  authorName: string;
  time: string;
  body: string;
}[] = [
  {
    id: "c1",
    authorName: "Priya Sharma",
    time: "1d",
    body: "This landed for me today. Thank you for sharing  sitting with the line about duty as devotion.",
  },
  {
    id: "c2",
    authorName: "Anjali Mehta",
    time: "18h",
    body: "Beautifully said. I'm going to carry this into my morning practice tomorrow.",
  },
  {
    id: "c3",
    authorName: "Marco Rossi",
    time: "4h",
    body: "🙏",
  },
];

function ScreenPostDetail() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Post" />

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Author header */}
        <div className="flex items-center gap-3 px-5 pt-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200">
            <Image
              src={AVATAR_URL}
              alt="Gurmohit Singh Thind"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-outfit text-sm font-semibold text-primary-950">
              Gurmohit Singh Thind
            </p>
            <span className="font-outfit text-xs text-primary-500">
              2d · Heartalks
            </span>
          </div>
          <button
            type="button"
            aria-label="More"
            className="shrink-0 text-primary-400 transition active:scale-90"
          >
            <IoEllipsisHorizontal className="text-lg" />
          </button>
        </div>

        {/* Title */}
        <h1 className="mt-4 px-5 font-hkl text-[1.35rem] font-bold leading-tight tracking-tight text-primary-950">
          The Hands of Humility
        </h1>

        {/* Cover image */}
        <div className="relative mt-4 aspect-4/3 w-full overflow-hidden bg-primary-100">
          <Image
            src="https://app.circle.so/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCSDJyUlFvPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--0dbf3be7886971c00899e50a79888faf345cc753/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJNEJEQTZDbk5oZG1WeWV3WTZDbk4wY21sd1ZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a9f899a0c764220ba5650fc8daea690765ef2c6f/IMG-20260519-WA0016.jpg"
            alt="Hands joined in prayer"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>

        {/* Body  full */}
        <div className="mt-4 space-y-3 px-5 font-outfit text-[13px] leading-relaxed text-primary-700">
          <p>
            &ldquo;When you are in control of your mind, then you are humble.
            And when you are not in control of your mind, then the ego takes the
            place of humility.
          </p>
          <p>
            That&apos;s how you do your duties that is so important; and the
            duties must be done with{" "}
            <span className="font-medium text-primary-950">love</span>, with
            <span className="font-medium text-primary-950"> care</span>, and
            with the awareness that you are not the doer, only an instrument.
          </p>
          <p>
            Each small act pouring tea, listening to a friend, walking home
            becomes a quiet practice. The hands fold not in performance, but in
            recognition.&rdquo;
          </p>
        </div>

        {/* Action bar */}
        <div className="mt-5 flex items-center gap-6 border-y border-primary-100 px-5 py-3">
          <button
            type="button"
            className="flex items-center gap-1.5 text-primary-700 transition active:scale-95"
            aria-label="Like"
          >
            <IoHeart className="text-lg text-terracotta" />
            <span className="font-outfit text-[12.5px] font-medium">10</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-primary-700 transition active:scale-95"
            aria-label="Comment"
          >
            <IoChatbubbleOutline className="text-lg" />
            <span className="font-outfit text-[12.5px] font-medium">3</span>
          </button>
          <button
            type="button"
            className="ml-auto text-primary-400 transition active:scale-90"
            aria-label="Share"
          >
            <IoShareSocialOutline className="text-lg" />
          </button>
          <button
            type="button"
            className="text-primary-400 transition active:scale-90"
            aria-label="Bookmark"
          >
            <IoBookmarkOutline className="text-lg" />
          </button>
        </div>

        {/* Comments */}
        <p className="mt-5 px-5 font-hkl-centra text-[10px] font-semibold text-primary-500">
          {POST_COMMENTS.length} comments
        </p>
        <div className="mt-3 space-y-4 px-5">
          {POST_COMMENTS.map((c) => (
            <div key={c.id} className="flex gap-3">
              <button
                type="button"
                onClick={() => nav?.navigate("member-profile")}
                className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200"
              >
                <Image
                  src={AVATAR_URL}
                  alt={c.authorName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </button>
              <div className="min-w-0 flex-1">
                <div className="rounded-2xl bg-primary-50 px-3 py-2">
                  <p className="font-outfit text-[12px] font-semibold text-primary-950">
                    {c.authorName}
                  </p>
                  <p className="mt-0.5 font-outfit text-[12.5px] leading-relaxed text-primary-700">
                    {c.body}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-3 px-2 font-outfit text-[10px] text-primary-500">
                  <span>{c.time}</span>
                  <button
                    type="button"
                    className="font-medium transition active:scale-95"
                  >
                    Like
                  </button>
                  <button
                    type="button"
                    className="font-medium transition active:scale-95"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment input */}
      <div className="shrink-0 border-t border-primary-100 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200">
            <Image
              src={AVATAR_URL}
              alt="Sarah"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 items-center rounded-full border border-primary-200 bg-white pl-3 pr-1 py-1">
            <input
              type="text"
              placeholder="Add a comment…"
              className="flex-1 bg-transparent font-outfit text-[12.5px] text-primary-950 outline-none placeholder:text-primary-400"
            />
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-200 text-primary-500 transition active:scale-95"
              aria-label="Send"
            >
              <IoChevronForward className="text-sm rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   22  DM thread  1:1 conversation with Priya
   ──────────────────────────────────────────────────────────── */

type DmMessage = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

const DM_MESSAGES: DmMessage[] = [
  {
    id: "m1",
    fromMe: false,
    text: "Hi Sarah! Welcome to HKL. So glad you joined us.",
    time: "10:14 AM",
  },
  {
    id: "m2",
    fromMe: true,
    text: "Thank you Priya 🌷 your reflection this morning really stayed with me.",
    time: "10:32 AM",
  },
  {
    id: "m3",
    fromMe: false,
    text: "That means so much. Have you tried the Saturday meetup yet? It's a beautiful way to anchor the week.",
    time: "10:34 AM",
  },
  {
    id: "m4",
    fromMe: true,
    text: "Not yet  adding it to my calendar now.",
    time: "10:36 AM",
  },
  {
    id: "m5",
    fromMe: false,
    text: "Wonderful. See you there 🙏",
    time: "10:37 AM",
  },
];

function ScreenDmThread() {
  const nav = useNav();
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-primary-100 px-3 py-2.5">
        <button
          type="button"
          aria-label="Back"
          onClick={() => nav?.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full text-primary-700 active:bg-primary-50"
        >
          <IoChevronBack className="text-xl" />
        </button>
        <div className="relative">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200">
            <Image
              src={AVATAR_URL}
              alt="Priya Sharma"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-terracotta ring-2 ring-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-outfit text-[13.5px] font-semibold text-primary-950">
            Priya Sharma
          </p>
          <p className="font-outfit text-[10.5px] text-primary-500">
            Active now
          </p>
        </div>
        <button
          type="button"
          aria-label="More"
          className="flex h-9 w-9 items-center justify-center rounded-full text-primary-700 active:bg-primary-50"
        >
          <IoEllipsisHorizontal className="text-lg" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
        {/* Date separator */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-primary-100" />
          <span className="font-outfit text-[10px] font-medium uppercase text-primary-400">
            Today · 10:14 AM
          </span>
          <div className="h-px flex-1 bg-primary-100" />
        </div>

        <div className="space-y-3">
          {DM_MESSAGES.map((m, i) => {
            const prevSame = i > 0 && DM_MESSAGES[i - 1].fromMe === m.fromMe;
            const isLastSent =
              m.fromMe && !DM_MESSAGES.slice(i + 1).some((x) => x.fromMe);
            return (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.fromMe ? "items-end" : "items-start"
                } ${prevSame ? "-mt-2" : ""}`}
              >
                <div
                  className={`max-w-[78%] px-3.5 py-2 font-outfit text-[13px] leading-snug ${
                    m.fromMe
                      ? "rounded-2xl rounded-br-md bg-dark-forest text-white"
                      : "rounded-2xl rounded-bl-md bg-primary-100 text-primary-950"
                  }`}
                >
                  {m.text}
                </div>
                {!prevSame || isLastSent ? (
                  <span
                    className={`mt-1 px-1 font-outfit text-[10px] text-primary-400 ${
                      m.fromMe ? "text-right" : "text-left"
                    }`}
                  >
                    {m.time}
                    {isLastSent && (
                      <span className="ml-1 text-primary-700">· Read</span>
                    )}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky input */}
      <div className="shrink-0 border-t border-primary-100 bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Attach"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary-500 transition active:bg-primary-100"
          >
            <IoAddOutline className="text-xl" />
          </button>
          <div className="flex flex-1 items-center rounded-full border border-primary-200 bg-white pl-3 pr-1 py-1">
            <input
              type="text"
              placeholder="Message"
              className="flex-1 bg-transparent font-outfit text-[13px] text-primary-950 outline-none placeholder:text-primary-400"
            />
            <button
              type="button"
              aria-label="Voice"
              className="flex h-7 w-7 items-center justify-center rounded-full text-primary-500 transition active:bg-primary-100"
            >
              <IoMicOutline className="text-base" />
            </button>
          </div>
          <button
            type="button"
            aria-label="Send"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dark-forest text-white transition active:scale-95"
          >
            <IoChevronForward className="text-base" />
          </button>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   23  Member profile  Priya Sharma
   ──────────────────────────────────────────────────────────── */

function ProfileStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <span className="font-hkl text-lg font-bold text-primary-950">
        {value}
      </span>
      <span className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-primary-500">
        {label}
      </span>
    </div>
  );
}

function ScreenMemberProfile() {
  const nav = useNav();
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Profile" />

      <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
        {/* Hero */}
        <div className="flex flex-col items-center px-5 pt-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-primary-100 ring-1 ring-primary-200">
            <Image
              src={AVATAR_URL}
              alt="Priya Sharma"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <h1 className="mt-3 font-hkl text-[1.35rem] font-bold leading-tight text-primary-950">
            Priya Sharma
          </h1>
          <p className="mt-1 flex items-center gap-1 font-outfit text-[12px] text-primary-500">
            <IoLocationOutline className="text-sm" />
            Bengaluru, India
          </p>
          <p className="mt-3 max-w-[16rem] text-center font-outfit text-[13px] leading-relaxed text-primary-700">
            Learning to listen to my breath, to others, to what life is quietly
            teaching.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-5 flex items-stretch divide-x divide-primary-200 border-y border-primary-100 py-3">
          <ProfileStat value="42" label="Posts" />
          <ProfileStat value="128" label="Comments" />
          <ProfileStat value="6" label="Spaces" />
        </div>

        {/* Action  single Connect button */}
        <div className="mt-5 px-5">
          <button
            type="button"
            onClick={() => nav?.navigate("dm-thread")}
            className="w-full rounded-full bg-dark-forest px-4 py-2.5 font-hkl-centra text-[12px] font-medium text-white transition active:scale-95"
          >
            Connect
          </button>
        </div>

        {/* Recent posts */}
        <p className="mt-6 mb-2 px-5 font-hkl-centra text-[10px] font-semibold text-primary-500">
          Recent posts
        </p>
        <div className="space-y-2 px-3">
          <button
            type="button"
            onClick={() => nav?.navigate("post-detail")}
            className="block w-full rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
          >
            <p className="font-outfit text-sm font-semibold text-primary-950">
              Morning thoughts
            </p>
            <p className="mt-0.5 line-clamp-2 font-outfit text-[12px] text-primary-600">
              Today I noticed kindness in the smallest moments a stranger&apos;s
              smile at the bus stop. I want to carry this softness home.
            </p>
            <p className="mt-2 font-outfit text-[10px] text-primary-400">
              5h · 24 likes · 5 comments
            </p>
          </button>
          <button
            type="button"
            onClick={() => nav?.navigate("post-detail")}
            className="block w-full rounded-xl border border-primary-100 bg-white p-3 text-left transition active:scale-[0.99]"
          >
            <p className="font-outfit text-sm font-semibold text-primary-950">
              On forgiveness
            </p>
            <p className="mt-0.5 line-clamp-2 font-outfit text-[12px] text-primary-600">
              Forgiveness is not condoning. It is releasing the weight of
              carrying what is not yours to hold.
            </p>
            <p className="mt-2 font-outfit text-[10px] text-primary-400">
              3d · 51 likes · 12 comments
            </p>
          </button>
        </div>
      </div>

      <BottomNav active="feed" />
      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   24  New message  recipient picker + message input
   ──────────────────────────────────────────────────────────── */

const NEW_MSG_SUGGESTIONS: {
  id: string;
  name: string;
  handle: string;
}[] = [
  { id: "p", name: "Priya Sharma", handle: "@priya" },
  { id: "m", name: "Marco Rossi", handle: "@marco" },
  { id: "g", name: "Gurmohit Singh", handle: "@gurmohit" },
  { id: "a", name: "Anjali Mehta", handle: "@anjali" },
];

function ScreenNewMessage() {
  const nav = useNav();
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-primary-100 px-3 py-2.5">
        <button
          type="button"
          onClick={() => nav?.back()}
          className="rounded-full px-3 py-1 font-outfit text-[13px] text-primary-700 transition active:bg-primary-50"
        >
          Cancel
        </button>
        <h1 className="font-hkl text-sm font-bold text-primary-950">
          New Message
        </h1>
        <button
          type="button"
          onClick={() => nav?.navigate("dm-thread")}
          className="rounded-full px-3 py-1 font-hkl-centra text-[12px] font-medium text-primary-700"
        >
          Send
        </button>
      </div>

      {/* To: field */}
      <div className="flex items-center gap-2 border-b border-primary-100 px-4 py-3">
        <span className="font-outfit text-[12px] text-primary-500">To:</span>
        <input
          type="text"
          placeholder="Search people…"
          className="flex-1 bg-transparent font-outfit text-[13px] text-primary-950 outline-none placeholder:text-primary-400"
        />
      </div>

      {/* Suggestions */}
      <div className="flex-1 overflow-y-auto overscroll-contain pb-4">
        <p className="px-5 pt-4 pb-2 font-hkl-centra text-[10px] font-semibold text-primary-500">
          Suggested
        </p>
        {NEW_MSG_SUGGESTIONS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => nav?.navigate("dm-thread")}
            className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition active:bg-primary-50"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200">
              <Image
                src={AVATAR_URL}
                alt={p.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-outfit text-sm font-medium text-primary-950">
                {p.name}
              </p>
              <p className="truncate font-outfit text-[11px] text-primary-500">
                {p.handle}
              </p>
            </div>
          </button>
        ))}
      </div>

      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   25  Style guide  design tokens used across the prototype
   ──────────────────────────────────────────────────────────── */

function StyleSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-primary-100 px-5 py-5">
      <h2 className="mb-3 font-hkl text-[15px] font-bold text-primary-950">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Swatch({
  className,
  name,
  hex,
  dark = false,
}: {
  className: string;
  name: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div
        className={`h-12 w-full rounded-lg ${className} ${
          dark ? "" : "ring-1 ring-primary-200"
        }`}
      />
      <p className="mt-1 truncate font-outfit text-[10px] font-medium text-primary-950">
        {name}
      </p>
      <p className="font-outfit text-[9px] text-primary-500">{hex}</p>
    </div>
  );
}

function TokenLine({ token, value }: { token: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 font-outfit text-[11px]">
      <span className="truncate text-primary-700">{token}</span>
      <span className="shrink-0 text-primary-500">{value}</span>
    </div>
  );
}

function ScreenStyleGuide() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <StatusBar />
      <SpaceTopBar title="Style guide" />

      <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
        {/* Intro */}
        <div className="px-5 pt-5">
          <h1 className="font-hkl text-[1.5rem] font-bold leading-tight text-primary-950">
            HKL Design System
          </h1>
          <p className="mt-2 font-outfit text-[12.5px] leading-relaxed text-primary-600">
            Every token, font, and component used across the prototype. Built on
            a warm-stone palette with a single dark-forest brand action.
          </p>
        </div>

        {/* Colors  Stone primary scale */}
        <StyleSection title="Primary · Stone scale">
          <div className="grid grid-cols-3 gap-2">
            <Swatch className="bg-primary-50" name="primary-50" hex="#FCFDFD" />
            <Swatch
              className="bg-primary-100"
              name="primary-100"
              hex="#F3F2EB"
            />
            <Swatch
              className="bg-primary-200"
              name="primary-200"
              hex="#E8E6D9"
            />
            <Swatch
              className="bg-primary-300"
              name="primary-300"
              hex="#DCD9C9"
            />
            <Swatch
              className="bg-primary-400"
              name="primary-400"
              hex="#C5C1AF"
            />
            <Swatch
              className="bg-primary-500"
              name="primary-500"
              hex="#A9A593"
            />
            <Swatch
              className="bg-primary-600"
              name="primary-600"
              hex="#8C8976"
              dark
            />
            <Swatch
              className="bg-primary-700"
              name="primary-700"
              hex="#6F6C5B"
              dark
            />
            <Swatch
              className="bg-primary-800"
              name="primary-800"
              hex="#545244"
              dark
            />
            <Swatch
              className="bg-primary-900"
              name="primary-900"
              hex="#3B392F"
              dark
            />
            <Swatch
              className="bg-primary-950"
              name="primary-950"
              hex="#26251E"
              dark
            />
            <Swatch className="bg-white" name="white" hex="#FFFFFF" />
          </div>
        </StyleSection>

        {/* Colors  Accents */}
        <StyleSection title="Brand accents">
          <div className="grid grid-cols-3 gap-2">
            <Swatch
              className="bg-dark-forest"
              name="dark-forest"
              hex="#1A3C34"
              dark
            />
            <Swatch
              className="bg-terracotta"
              name="terracotta"
              hex="#D97757"
              dark
            />
            <Swatch
              className="bg-olive"
              name="olive · hover"
              hex="#586C48"
              dark
            />
          </div>
          <p className="mt-3 font-outfit text-[11px] leading-relaxed text-primary-500">
            <span className="font-medium text-primary-950">dark-forest</span> is
            the single brand action color (PrimaryButton, FABs).{" "}
            <span className="font-medium text-primary-950">terracotta</span> is
            for warm accents (unread dots, &ldquo;going&rdquo; badge).{" "}
            <span className="font-medium text-primary-950">olive</span> only
            appears as the PrimaryButton hover state.
          </p>
        </StyleSection>

        {/* Typography */}
        <StyleSection title="Typography">
          <div className="space-y-4">
            <div>
              <p className="font-hkl text-[1.5rem] font-bold leading-tight text-primary-950">
                Headline · font-hkl
              </p>
              <p className="mt-1 font-outfit text-[10px] text-primary-500">
                hero titles, section headings
              </p>
            </div>
            <div>
              <p className="font-playfair text-[1.5rem] font-light italic text-primary-700">
                Editorial · font-playfair
              </p>
              <p className="mt-1 font-outfit text-[10px] text-primary-500">
                italic accent words only
              </p>
            </div>
            <div>
              <p className="font-outfit text-[13px] leading-relaxed text-primary-700">
                Body text · font-outfit. This is the workhorse for paragraphs,
                form fields, list rows, and most readable content.
              </p>
              <p className="mt-1 font-outfit text-[10px] text-primary-500">
                paragraphs, fields, list rows
              </p>
            </div>
            <div>
              <p className="font-hkl-centra text-[11px] font-semibold text-primary-700">
                Label · font-hkl-centra
              </p>
              <p className="mt-1 font-outfit text-[10px] text-primary-500">
                section labels, button text, eyebrows
              </p>
            </div>
          </div>
        </StyleSection>

        {/* Type scale */}
        <StyleSection title="Type scale">
          <div className="space-y-1.5">
            <TokenLine token="Display · 2rem · bold" value="Auth, OTP" />
            <TokenLine
              token="Display · 1.85rem · italic"
              value="About HKL hero"
            />
            <TokenLine token="Display · 1.75rem · bold" value="Save Profile" />
            <TokenLine token="Display · 1.7rem · bold" value="Lotus popup" />
            <TokenLine token="H1 · 1.5rem · bold" value="Style guide" />
            <TokenLine
              token="H1 · 1.35rem · bold"
              value="Post detail, Member"
            />
            <TokenLine token="H1 · 1.25rem · bold" value="Daily Commitment" />
            <TokenLine token="H1 · 1.2rem · bold" value="Quote screen" />
            <TokenLine token="H2 · 1.15rem · bold" value="Section title" />
            <TokenLine token="Body · 13px · regular" value="paragraphs" />
            <TokenLine token="Meta · 12px · regular" value="captions, time" />
            <TokenLine
              token="Micro · 10–11px · semibold"
              value="labels, badges"
            />
          </div>
        </StyleSection>

        {/* Spacing */}
        <StyleSection title="Spacing scale">
          <div className="space-y-2">
            {[
              { n: "1", px: "4px" },
              { n: "2", px: "8px" },
              { n: "3", px: "12px" },
              { n: "4", px: "16px" },
              { n: "5", px: "20px" },
              { n: "6", px: "24px" },
              { n: "8", px: "32px" },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-3">
                <div
                  className="h-2 rounded-sm bg-primary-300"
                  style={{ width: `${parseInt(s.px) * 1}px` }}
                />
                <span className="font-outfit text-[11px] text-primary-700">
                  {s.n}
                </span>
                <span className="font-outfit text-[10px] text-primary-400">
                  {s.px}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-outfit text-[11px] leading-relaxed text-primary-500">
            Screen padding{" "}
            <span className="font-medium text-primary-950">px-5</span>, major
            section gap{" "}
            <span className="font-medium text-primary-950">mt-6</span>, within
            group{" "}
            <span className="font-medium text-primary-950">space-y-2</span>.
          </p>
        </StyleSection>

        {/* Radius */}
        <StyleSection title="Border radius">
          <div className="flex flex-wrap items-end gap-3">
            {[
              { cls: "rounded-md", label: "md" },
              { cls: "rounded-lg", label: "lg" },
              { cls: "rounded-xl", label: "xl" },
              { cls: "rounded-2xl", label: "2xl" },
              { cls: "rounded-3xl", label: "3xl" },
              { cls: "rounded-t-4xl", label: "t-4xl" },
              { cls: "rounded-full", label: "full" },
            ].map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-1.5">
                <div className={`h-12 w-12 bg-primary-200 ${r.cls}`} />
                <span className="font-outfit text-[10px] text-primary-500">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-outfit text-[11px] leading-relaxed text-primary-500">
            <span className="font-medium text-primary-950">xl</span> for cards
            and rows, <span className="font-medium text-primary-950">2xl</span>{" "}
            for chat bubbles and feed posts,{" "}
            <span className="font-medium text-primary-950">3xl</span> for the
            Quote carousel,{" "}
            <span className="font-medium text-primary-950">t-4xl</span> for
            modal sheets,{" "}
            <span className="font-medium text-primary-950">full</span> for
            buttons, pills, avatars.
          </p>
        </StyleSection>

        {/* Buttons */}
        <StyleSection title="Buttons">
          <div className="space-y-3">
            <div>
              <PrimaryButton full>Primary action</PrimaryButton>
              <p className="mt-1 font-outfit text-[10px] text-primary-500">
                bg-dark-forest · rounded-full · py-3
              </p>
            </div>
            <div>
              <button
                type="button"
                className="w-full rounded-full border border-primary-200 bg-white px-4 py-2.5 font-hkl-centra text-[12px] font-medium text-primary-950 transition active:bg-primary-50"
              >
                Secondary action
              </button>
              <p className="mt-1 font-outfit text-[10px] text-primary-500">
                bg-white · border-primary-200
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-dark-forest pl-3 pr-4 py-2.5 text-white shadow-[0_4px_12px_-4px_rgba(26,60,52,0.3)] transition active:scale-95"
              >
                <IoAddOutline className="text-lg" />
                <span className="font-hkl-centra text-[12px] font-medium">
                  Pill FAB
                </span>
              </button>
              <button
                type="button"
                aria-label="Icon FAB"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-dark-forest text-white shadow-[0_4px_12px_-4px_rgba(26,60,52,0.3)] transition active:scale-95"
              >
                <IoAddOutline className="text-xl" />
              </button>
            </div>
            <p className="font-outfit text-[10px] text-primary-500">
              Pill FAB preferred (more discoverable). Icon-only for compact
              contexts.
            </p>
          </div>
        </StyleSection>

        {/* Inputs */}
        <StyleSection title="Input states">
          <div className="space-y-3">
            <div className="rounded-xl border border-primary-200 bg-white px-4 py-3 font-outfit text-[13px] text-primary-400">
              Default
            </div>
            <div className="rounded-xl border-2 border-primary-900 bg-white px-4 py-3 font-outfit text-[13px] text-primary-950">
              Focused
            </div>
            <div className="rounded-xl border border-primary-200 bg-white px-4 py-3 font-outfit text-[13px] font-medium text-primary-950">
              Filled value
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-primary-200 bg-white px-4 py-2.5">
              <IoPersonOutline className="text-lg text-primary-600" />
              <div className="flex-1">
                <p className="font-hkl-centra text-[9px] font-semibold text-primary-500">
                  Name
                </p>
                <p className="font-outfit text-[13px] font-medium text-primary-950">
                  Sarah Kim
                </p>
              </div>
            </div>
            <p className="font-outfit text-[10px] text-primary-500">
              Editable field with floating label · used on Save Profile.
            </p>
          </div>
        </StyleSection>

        {/* Badges */}
        <StyleSection title="Badges & pills">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-terracotta/15 px-2 py-0.5 font-hkl-centra text-[10px] font-semibold text-terracotta">
              3 new
            </span>
            <span className="inline-block rounded-full bg-primary-100 px-2 py-0.5 font-hkl-centra text-[9px] font-semibold text-primary-700">
              Article
            </span>
            <span className="rounded-full bg-primary-950 px-3 py-1 font-outfit text-[11px] font-medium text-white">
              Active tab
            </span>
            <span className="rounded-full border border-primary-200 bg-white px-3 py-1 font-outfit text-[11px] font-medium text-primary-600">
              Inactive tab
            </span>
            <span className="h-2 w-2 rounded-full bg-terracotta" />
            <span className="font-outfit text-[10px] text-primary-500">
              unread dot
            </span>
          </div>
        </StyleSection>

        {/* Avatars */}
        <StyleSection title="Avatars">
          <div className="flex flex-wrap items-end gap-3">
            {[
              { size: 24, ctx: "stacks" },
              { size: 28, ctx: "going" },
              { size: 32, ctx: "comments" },
              { size: 36, ctx: "header, feed" },
              { size: 40, ctx: "rows" },
              { size: 44, ctx: "alerts" },
              { size: 80, ctx: "save profile" },
              { size: 96, ctx: "member hero" },
            ].map(({ size, ctx }) => (
              <div key={size} className="flex flex-col items-center gap-1.5">
                <div
                  className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200"
                  style={{ width: size, height: size }}
                >
                  <Image
                    src={AVATAR_URL}
                    alt={`Avatar ${size}px`}
                    fill
                    sizes={`${size}px`}
                    className="object-cover"
                  />
                </div>
                <span className="font-outfit text-[9px] font-medium text-primary-700">
                  {size}px
                </span>
                <span className="font-outfit text-[9px] text-primary-500">
                  {ctx}
                </span>
              </div>
            ))}
          </div>
        </StyleSection>

        {/* Cards */}
        <StyleSection title="Cards">
          <div className="space-y-3">
            <div className="rounded-xl border border-primary-100 bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-primary-200">
                  <Image
                    src={AVATAR_URL}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-outfit text-sm font-semibold text-primary-950">
                    List row card
                  </p>
                  <p className="truncate font-outfit text-xs text-primary-500">
                    Used in Spaces, Chat, Alerts, Events
                  </p>
                </div>
                <IoChevronForward className="text-base text-primary-300" />
              </div>
            </div>
            <div className="rounded-2xl bg-primary-100 px-3 py-2 font-outfit text-[12.5px] text-primary-950">
              Chat bubble · received
            </div>
            <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-dark-forest px-3 py-2 font-outfit text-[12.5px] text-white">
              Chat bubble · sent
            </div>
          </div>
        </StyleSection>

        {/* Section labels */}
        <StyleSection title="Section labels">
          <div className="space-y-2">
            <SectionLabel>Default spacing</SectionLabel>
            <p className="font-outfit text-[10.5px] text-primary-500">
              mt-6 mb-2 · used in Save Profile, About HKL
            </p>
            <SectionLabel spacing="tight">Tight spacing</SectionLabel>
            <p className="font-outfit text-[10.5px] text-primary-500">
              mt-4 mb-1 · used in Alerts list sections
            </p>
          </div>
        </StyleSection>

        {/* Shadows */}
        <StyleSection title="Shadows">
          <div className="space-y-4">
            <div>
              <div className="mx-auto h-16 w-full rounded-2xl bg-white shadow-[0_4px_12px_-4px_rgba(26,60,52,0.3)]" />
              <p className="mt-2 font-outfit text-[10.5px] text-primary-500">
                <span className="font-medium text-primary-950">FAB</span> ·
                rgba(26,60,52,0.3) tint matches dark-forest
              </p>
            </div>
            <div>
              <div className="mx-auto h-16 w-full rounded-3xl bg-white shadow-[0_15px_40px_-15px_rgba(38,37,30,0.35)]" />
              <p className="mt-2 font-outfit text-[10.5px] text-primary-500">
                <span className="font-medium text-primary-950">Hero card</span>{" "}
                · Quote carousel
              </p>
            </div>
            <div>
              <div className="mx-auto h-16 w-full rounded-t-4xl bg-white shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.25)]" />
              <p className="mt-2 font-outfit text-[10.5px] text-primary-500">
                <span className="font-medium text-primary-950">
                  Modal sheet
                </span>{" "}
                · upward shadow for TourSheet, ComposerSheet
              </p>
            </div>
          </div>
        </StyleSection>

        {/* Footer note */}
        <div className="px-5 pt-6 pb-2">
          <p className="font-outfit text-[10.5px] italic leading-relaxed text-primary-400">
            Every token here is in use across the 26 screens. Reference this
            page when adding new components pick from these primitives before
            introducing new values.
          </p>
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */

function PrototypeSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-primary-100 bg-white first:border-t-0">
      <div className="px-8 pt-14 pb-6">
        <p className="font-hkl-centra text-[11px] font-semibold text-primary-500">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-hkl text-3xl font-bold tracking-tight text-primary-950">
          {title}
        </h2>
        <p className="mt-1 font-outfit text-sm text-primary-600">
          {description}
        </p>
      </div>
      <div
        className="overflow-x-auto overscroll-contain pb-10 [&::-webkit-scrollbar]:!block [&::-webkit-scrollbar]:!h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary-300 hover:[&::-webkit-scrollbar-thumb]:bg-primary-400"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#dcd9c9 transparent" }}
      >
        <div className="flex w-fit items-start gap-10 px-8 pb-3">
          {children}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Black & green — pure black surfaces, white text, olive action
   ──────────────────────────────────────────────────────────── */

function BWStatusBar() {
  return (
    <div className="flex h-12 shrink-0 items-end justify-between px-5 pb-1 text-white">
      <span className="font-hkl-centra text-sm font-semibold">9:41</span>
      <div className="flex items-center gap-1">
        <IoCellularSharp className="text-sm" />
        <IoWifi className="text-sm" />
        <IoBatteryFull className="text-base" />
      </div>
    </div>
  );
}

function BWHomeIndicator() {
  return (
    <div className="flex shrink-0 items-center justify-center pb-2 pt-2">
      <div className="h-1 w-32 rounded-full bg-white" />
    </div>
  );
}

function ScreenStyleGuideBW() {
  const tokens = [
    { name: "Background", hex: "#000000", role: "Pure black base" },
    { name: "Surface", hex: "#0F0F0F", role: "Cards · elevated" },
    { name: "Border", hex: "rgba(255,255,255,0.08)", role: "Dividers" },
    { name: "Text · primary", hex: "#FFFFFF", role: "Headlines · body" },
    { name: "Text · secondary", hex: "rgba(255,255,255,0.6)", role: "Muted" },
    { name: "Text · tertiary", hex: "rgba(255,255,255,0.4)", role: "Captions" },
    { name: "olive", hex: "#586C48", role: "Primary action · CTA" },
    { name: "mint", hex: "#EAF0DD", role: "Bright accent · unread" },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="flex shrink-0 items-center gap-2 border-b border-white/8 px-3 py-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 active:bg-white/5"
        >
          <IoChevronBack className="text-xl" />
        </button>
        <span className="font-hkl text-sm font-bold text-white">
          Black &amp; green tokens
        </span>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        <h1 className="font-hkl text-[1.5rem] font-bold leading-tight text-white">
          Bold black.
        </h1>
        <p className="mt-2 font-outfit text-[12.5px] leading-relaxed text-white/60">
          Pure black surface · white text · olive green for action. High
          contrast, OLED-true blacks, distinct from the warm dark palette.
        </p>

        <div className="mt-6 space-y-2">
          {tokens.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] px-3 py-2.5"
            >
              <div
                className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-white/10"
                style={{ backgroundColor: t.hex }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-outfit text-[12.5px] font-medium text-white">
                  {t.name}
                </p>
                <p className="font-outfit text-[10.5px] text-white/50">
                  {t.role}
                </p>
              </div>
              <span className="font-hkl-centra text-[9.5px] font-semibold text-white/70">
                {t.hex}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 mb-2 px-1 font-hkl-centra text-[10px] font-semibold text-white/50">
          Buttons
        </p>
        <button
          type="button"
          className="w-full rounded-full bg-olive px-6 py-3 font-hkl-centra text-sm font-medium text-white transition active:scale-95"
        >
          Primary action
        </button>
        <button
          type="button"
          className="mt-2 w-full rounded-full border border-white/15 bg-transparent px-6 py-3 font-hkl-centra text-sm font-medium text-white transition active:bg-white/5"
        >
          Secondary action
        </button>

        <p className="mt-6 mb-2 px-1 font-hkl-centra text-[10px] font-semibold text-white/50">
          Card
        </p>
        <div className="rounded-xl border border-white/8 bg-[#0F0F0F] p-3">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
              <Image
                src={AVATAR_URL}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-outfit text-sm font-semibold text-white">
                Card row
              </p>
              <p className="truncate font-outfit text-xs text-white/50">
                bg #0F0F0F · border white/8
              </p>
            </div>
          </div>
        </div>
      </div>

      <BWHomeIndicator />
    </div>
  );
}

function ScreenSplashBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image
          src="/logo-new.png"
          alt="HKL"
          width={160}
          height={160}
          priority
          className="h-40 w-40 object-contain brightness-0 invert"
        />
        <p className="mt-6 font-playfair text-base font-light italic tracking-wide text-olive">
          Humility · Kindness · Love
        </p>
      </div>
      <BWHomeIndicator />
    </div>
  );
}

function BWHomeHeader() {
  return (
    <div className="shrink-0 px-5 pt-3">
      <div className="flex items-center justify-between">
        <span className="font-hkl text-2xl font-bold text-white">HKL</span>
        <div className="flex items-center gap-3">
          <IoSearchOutline className="text-xl text-white/70" />
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image
              src={AVATAR_URL}
              alt="Sarah"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BWHomePills() {
  const pills = ["Feed", "Spaces", "Events", "Members", "Leaderboard"];
  return (
    <div className="shrink-0 px-5 pt-3 pb-1">
      <div className="flex gap-2">
        {pills.map((label, i) => (
          <button
            key={label}
            className={`shrink-0 rounded-full px-3.5 py-1.5 font-outfit text-xs font-medium transition ${
              i === 0
                ? "bg-olive text-white"
                : "border border-white/15 bg-transparent text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function BWBottomNav() {
  const items = [
    { id: "feed", label: "Feed", Icon: IconFeed, active: true },
    { id: "practice", label: "Practice", Icon: IconPractice },
    { id: "chat", label: "Chat", Icon: IconChat },
    { id: "alerts", label: "Alerts", Icon: IconBell },
  ];
  return (
    <div className="flex shrink-0 border-t border-white/8 bg-black px-3 pb-1 pt-2">
      {items.map(({ id, label, Icon, active }) => (
        <div
          key={id}
          className="flex flex-1 flex-col items-center gap-0.5 py-1"
        >
          <Icon
            className={`text-xl ${active ? "text-olive" : "text-white/40"}`}
          />
          <span
            className={`font-outfit text-[10px] ${
              active ? "font-semibold text-olive" : "text-white/40"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function BWFeedPost({
  authorName,
  time,
  title,
  body,
  imageUrl,
  likes,
  comments,
}: {
  authorName: string;
  time: string;
  title?: string;
  body: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0F0F0F] p-4">
      <div className="flex items-center gap-2.5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
          <Image
            src={AVATAR_URL}
            alt={authorName}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-outfit text-sm font-semibold text-white">
            {authorName}
          </p>
          <span className="font-outfit text-xs text-white/40">{time}</span>
        </div>
        <IoBookmarkOutline className="text-base text-white/40" />
        <IoEllipsisHorizontal className="text-base text-white/40" />
      </div>
      {title && (
        <h3 className="mt-3 font-hkl text-base font-bold leading-tight text-white">
          {title}
        </h3>
      )}
      {imageUrl && (
        <div className="relative mt-3 aspect-4/3 w-full overflow-hidden rounded-xl bg-white/5">
          <Image
            src={imageUrl}
            alt={title ?? ""}
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      )}
      <p className="mt-3 line-clamp-3 font-outfit text-[13px] leading-relaxed text-white/70">
        {body}
      </p>
      <div className="mt-3 flex items-center gap-4 border-t border-white/8 pt-3">
        <div className="flex items-center gap-1.5 text-white/70">
          <IoHeart className="text-base text-mint" />
          <span className="font-outfit text-xs">{likes}</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/70">
          <IoChatbubbleOutline className="text-base" />
          <span className="font-outfit text-xs">{comments}</span>
        </div>
      </div>
    </div>
  );
}

function ScreenHomeFeedBW() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />

      {welcomeOpen && (
        <div className="mx-4 mt-1 flex items-center gap-2 rounded-xl bg-[#0F0F0F] px-3 py-1.5 text-white/70">
          <div className="shrink-0">
            <DotLottieReact
              src="/Namaste%20-%20No%20Shake%20Hands.lottie"
              loop
              autoplay
              renderConfig={{ devicePixelRatio: 3, autoResize: true }}
              style={{ width: 22, height: 22 }}
            />
          </div>
          <p className="flex-1 font-outfit text-[11px] tracking-wide">
            Welcome to HKL, Sarah.
          </p>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setWelcomeOpen(false)}
            className="shrink-0 rounded-full p-1 text-white/50 transition active:bg-white/5"
          >
            <IoCloseOutline className="text-sm" />
          </button>
        </div>
      )}

      <BWHomeHeader />
      <BWHomePills />

      <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 pt-3">
        <BWFeedPost
          authorName="Gurmohit Singh Thind"
          time="2d"
          title="The Hands of Humility"
          imageUrl="https://app.circle.so/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCSDJyUlFvPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--0dbf3be7886971c00899e50a79888faf345cc753/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJNEJEQTZDbk5oZG1WeWV3WTZDbk4wY21sd1ZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a9f899a0c764220ba5650fc8daea690765ef2c6f/IMG-20260519-WA0016.jpg"
          body={`"When you are in control of your mind, then you are humble; then you are humble. And when you are not in control of your mind, then the ego takes the place of humility…"`}
          likes={10}
          comments={1}
        />
        <BWFeedPost
          authorName="Priya Sharma"
          time="5h"
          title="Morning thoughts"
          body="Today I noticed kindness in the smallest moments — a stranger's smile at the bus stop. I want to carry this softness home."
          likes={24}
          comments={5}
        />
      </div>

      {/* FAB — olive primary action */}
      <button
        type="button"
        aria-label="New post"
        className="absolute right-4 bottom-20 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-olive text-white shadow-[0_0_24px_0_rgba(88,108,72,0.6)] ring-1 ring-olive/40 transition active:scale-95"
      >
        <IoAddOutline className="text-2xl" />
      </button>

      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function BWSpaceTopBar({ title }: { title: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-white/8 px-3 py-3">
      <button
        type="button"
        aria-label="Back"
        className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 active:bg-white/5"
      >
        <IoChevronBack className="text-xl" />
      </button>
      <span className="font-hkl text-sm font-bold text-white">{title}</span>
      <button
        type="button"
        aria-label="More"
        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 active:bg-white/5"
      >
        <IoEllipsisHorizontal className="text-xl" />
      </button>
    </div>
  );
}

function BWPrimaryButton({
  children,
  full = false,
  onClick,
}: {
  children: ReactNode;
  full?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${full ? "w-full" : "w-fit"} rounded-full bg-olive px-6 py-3 font-hkl-centra text-sm font-medium text-white transition active:scale-95`}
    >
      {children}
    </button>
  );
}

function ScreenQuoteBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="relative z-30 flex items-center justify-end px-5 pt-1 pb-3">
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-transparent px-2.5 py-1.5 font-hkl-centra text-[11px] font-semibold text-white">
          <span>🇺🇸</span> EN
          <IoChevronDownOutline className="text-[10px] text-white/50" />
        </div>
      </div>
      <div className="px-5">
        <AutoCarousel
          slides={QUOTE_SLIDES}
          className="aspect-4/3 w-full rounded-3xl bg-[#0F0F0F] ring-1 ring-white/10 shadow-[0_20px_50px_-15px_rgba(234,240,221,0.15)]"
        />
      </div>
      <div className="px-5 pt-8">
        <p className="text-center font-hkl text-[1.2rem] font-bold leading-[1.5] tracking-tight text-white">
          <span className="block">
            The world feels{" "}
            <span className="font-playfair text-[1.35rem] font-semibold italic text-olive">
              different
            </span>
          </span>
          <span className="block">
            when the{" "}
            <span className="font-playfair text-[1.35rem] font-semibold italic text-olive">
              mind
            </span>{" "}
            is different.
          </span>
        </p>
      </div>
      <div className="mt-auto px-5 pb-6">
        <BWPrimaryButton full>Get Started</BWPrimaryButton>
        <button className="mt-3 w-full text-center font-outfit text-[11px] text-white/50">
          Already a member?{" "}
          <span className="font-medium text-white/80">Sign in</span>
        </button>
      </div>
      <BWHomeIndicator />
    </div>
  );
}

function ScreenSaveProfileBW() {
  const [name, setName] = useState("Sarah Kim");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [age, setAge] = useState("28");
  const [location, setLocation] = useState("Brooklyn, NY");

  const fields = [
    { Icon: IoPersonOutline, label: "Name", value: name, onChange: setName, type: "text" },
    { Icon: IoCallOutline, label: "Phone", value: phone, onChange: setPhone, type: "tel" },
    { Icon: IoCalendarOutline, label: "Age", value: age, onChange: setAge, type: "number" },
    { Icon: IoLocationOutline, label: "Location", value: location, onChange: setLocation, type: "text" },
  ];

  const pickers = [
    { Icon: IoGlobeOutline, label: "Country", value: "🇺🇸 United States" },
    { Icon: IoLanguageOutline, label: "Language", value: "English" },
    { Icon: IoTimeOutline, label: "Timezone", value: "America / New York" },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-5">
        <h1 className="font-hkl text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white">
          Make it yours.
        </h1>
        <p className="mt-1.5 font-outfit text-[13px] text-white/60">
          A few quick details so the community knows you.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="relative">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#0F0F0F] ring-1 ring-white/15">
              <Image src={AVATAR_URL} alt="Sarah Kim" fill sizes="80px" className="object-cover" />
            </div>
            <button
              type="button"
              aria-label="Change photo"
              className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-olive text-white ring-2 ring-black transition active:scale-90"
            >
              <IoCameraOutline className="text-sm" />
            </button>
          </div>
        </div>

        <p className="mt-6 mb-2 px-1 font-hkl-centra text-[10px] font-semibold text-white/50">
          About you
        </p>
        <div className="space-y-2">
          {fields.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0F0F0F] px-4 py-2.5 transition focus-within:border-white/30"
            >
              <f.Icon className="shrink-0 text-lg text-white/60" />
              <div className="flex min-w-0 flex-1 flex-col">
                <label className="font-hkl-centra text-[9px] font-semibold text-white/50">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="mt-0.5 w-full bg-transparent font-outfit text-[13px] font-medium text-white outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 mb-2 px-1 font-hkl-centra text-[10px] font-semibold text-white/50">
          Preferences
        </p>
        <div className="space-y-2">
          {pickers.map((p) => (
            <button
              key={p.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#0F0F0F] px-4 py-2.5 text-left transition active:bg-white/5"
            >
              <p.Icon className="shrink-0 text-lg text-white/60" />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="font-hkl-centra text-[9px] font-semibold text-white/50">
                  {p.label}
                </p>
                <p className="mt-0.5 truncate font-outfit text-[13px] font-medium text-white">
                  {p.value}
                </p>
              </div>
              <IoChevronForward className="shrink-0 text-base text-white/40" />
            </button>
          ))}
        </div>

        <div className="mt-6">
          <BWPrimaryButton full>Save &amp; begin</BWPrimaryButton>
        </div>
      </div>
      <BWHomeIndicator />
    </div>
  );
}

function ScreenAlertsBW() {
  const [activeTab, setActiveTab] = useState<AlertTab>("inbox");
  const items = filterByTab(ALERTS, activeTab);
  const today = items.filter((i) => i.group === "today");
  const week = items.filter((i) => i.group === "week");
  const earlier = items.filter((i) => i.group === "earlier");
  const unreadCount = items.filter((i) => i.unread).length;

  const renderAvatar = (item: AlertItem) => {
    const badge = getAlertBadge(item.kind);
    const BadgeIcon = badge.Icon;
    return (
      <div className="relative shrink-0">
        {item.actorImage ? (
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image src={item.actorImage} alt="" fill sizes="44px" className="object-cover" />
          </div>
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F0F0F] ring-1 ring-white/8">
            {BadgeIcon && <BadgeIcon className="text-base text-white/70" />}
          </div>
        )}
        {item.actorImage && (
          <span className={`absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-black ${badge.tint}`}>
            {BadgeIcon ? (
              <BadgeIcon className="text-[10px] text-white" />
            ) : (
              <span className="font-hkl-centra text-[10px] font-bold text-white">{badge.text}</span>
            )}
          </span>
        )}
      </div>
    );
  };

  const renderGroup = (label: string, group: AlertItem[]) =>
    group.length > 0 && (
      <>
        <p className="mt-4 mb-1 px-2 font-hkl-centra text-[10px] font-semibold text-white/50">
          {label}
        </p>
        {group.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`relative flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition active:bg-white/5 ${
              a.unread ? "bg-white/[0.04]" : "bg-transparent"
            }`}
          >
            {renderAvatar(a)}
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="font-outfit text-[13px] leading-snug">
                {a.actorName ? (
                  <>
                    <span className="font-semibold text-white">{a.actorName}</span>{" "}
                    <span className="text-white/60">{a.action}</span>
                  </>
                ) : (
                  <span className="text-white/70">{a.action}</span>
                )}
              </p>
              {a.preview && (
                <p className="mt-1 line-clamp-2 font-outfit text-[12px] italic text-white/50">
                  &ldquo;{a.preview}&rdquo;
                </p>
              )}
              <span className="mt-1 font-outfit text-[10px] text-white/40">{a.time}</span>
            </div>
            {a.unread && (
              <span className="absolute top-3.5 right-3 h-2 w-2 shrink-0 rounded-full bg-mint" />
            )}
          </button>
        ))}
      </>
    );

  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWHomeHeader />

      <div className="flex shrink-0 items-center justify-between px-5 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <h1 className="font-hkl text-xl font-bold text-white">Notifications</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-mint/15 px-2 py-0.5 font-hkl-centra text-[10px] font-semibold text-mint">
              {unreadCount} new
            </span>
          )}
        </div>
        <button type="button" className="font-outfit text-[11px] font-medium text-white/50 active:scale-95">
          Mark all read
        </button>
      </div>

      <div className="shrink-0 overflow-x-auto overscroll-contain border-b border-white/8 px-4 pb-2 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1.5">
          {TAB_OPTIONS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-3 py-1.5 font-outfit text-[12px] font-medium transition ${
                  isActive ? "bg-olive text-white" : "border border-white/15 bg-transparent text-white/60 active:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-2 pb-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0F0F0F]">
              <IoChatbubbleOutline className="text-2xl text-white/40" />
            </div>
            <p className="font-hkl text-sm font-bold text-white">Nothing here yet</p>
            <p className="font-outfit text-[12px] leading-relaxed text-white/50">
              When activity for this tab arrives, you&apos;ll see it here.
            </p>
          </div>
        ) : (
          <>
            {renderGroup("Today", today)}
            {renderGroup("This week", week)}
            {renderGroup("Earlier", earlier)}
          </>
        )}
      </div>

      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function ScreenDailyCommitmentBW() {
  const [selected, setSelected] = useState<string | null>("several");
  const options = [
    { id: "throughout", label: "I practiced this throughout the day today" },
    { id: "several", label: "I practiced this several times during the day today" },
    { id: "little", label: "I tried today, but could only practice for a little while" },
    { id: "forgiveness", label: "I couldn't practice this today and I ask forgiveness from myself" },
  ];
  const previousPractices = [
    "https://photos.smugmug.com/Public/My-Daily-Commitments-For-The-Week/i-QhBXpZm/0/L7VhRj5zKwNvbTTf42fFP4M27GxTRRsL5csLm5Nmx/L/5-L.png",
    "https://photos.smugmug.com/Public/My-Daily-Commitments-For-The-Week/i-gffkJtT/0/Lh2Tp62XXkn4KPb7s2sZVJtVRbFFfftTzkxm44WZt/L/6-L.png",
    "https://photos.smugmug.com/Public/My-Daily-Commitments-For-The-Week/i-SNsDjFj/0/KdjgMCXjjnQBL2S9m6TCGKNfn6rrR2D438J7HgNdJ/L/7-L.png",
  ];

  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
        <AutoCarousel
          slides={DAILY_COMMITMENT_SLIDES}
          className="aspect-3/1 w-full bg-[#0F0F0F]"
        />
        <div className="h-1.5 w-full bg-[#0F0F0F]" />

        <div className="px-5 pt-5">
          <h1 className="font-hkl text-[1.25rem] font-bold leading-tight tracking-tight text-white">
            My Daily Commitment For The Week
          </h1>
        </div>

        <div className="mt-4 space-y-3 px-5 font-outfit text-[13px] leading-relaxed text-white/70">
          <p>
            Our daily practice for the coming week to become more humble,
            kinder, loving &amp; forgiving is to sit peacefully with closed
            eyes and check the state of our consciousness.
          </p>
          <p>
            Close your eyes and feel: Am I peaceful? Am I loving? Am I kinder?
            Am I forgiving? Or am I angry, worried, reactive, or insecure?
          </p>
          <p>
            Remain grateful to God for everything, and pray to Him for
            everybody&apos;s wellbeing.
          </p>
        </div>

        <div className="mt-6 px-5">
          <div className="space-y-1.5">
            {options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                    isSelected
                      ? "border-olive bg-olive/10"
                      : "border-white/10 bg-transparent active:bg-white/5"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isSelected ? "border-olive bg-olive" : "border-white/30 bg-transparent"
                    }`}
                  >
                    {isSelected && <IoCheckmark className="text-[11px] text-white" />}
                  </span>
                  <span
                    className={`flex-1 font-outfit text-[13px] leading-snug ${
                      isSelected ? "font-medium text-white" : "text-white/70"
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <BWPrimaryButton full>Submit</BWPrimaryButton>
          </div>
        </div>

        {/* Previous Weekly Practices */}
        <div className="mt-8 px-5">
          <h2 className="font-hkl text-[1.15rem] font-bold leading-tight text-white">
            Previous Weekly Practices
          </h2>
          <p className="mt-2 font-outfit text-[13px] leading-relaxed text-white/70">
            Missed a previous weekly practice? Would like to give another week
            a try? Here are some of the previous weekly challenges.
          </p>
        </div>

        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-contain px-5 pb-2 [&::-webkit-scrollbar]:hidden">
          {previousPractices.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[3/4] w-56 shrink-0 snap-center overflow-hidden rounded-2xl border border-white/8 bg-[#0F0F0F]"
            >
              <Image
                src={src}
                alt={`Previous weekly practice ${i + 1}`}
                fill
                sizes="224px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 px-5">
          <BWPrimaryButton full>Practice &amp; Share</BWPrimaryButton>
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function ScreenChatBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWHomeHeader />

      <div className="shrink-0 px-5 pt-3 pb-2">
        <h1 className="font-hkl text-xl font-bold text-white">Conversations</h1>
      </div>

      <div className="px-5 pb-2">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0F0F0F] px-3 py-2">
          <IoSearchOutline className="text-base text-white/40" />
          <input
            type="text"
            placeholder="Search channels and people"
            className="flex-1 bg-transparent font-outfit text-[13px] text-white outline-none placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-3 pt-2 pb-4">
        {(() => {
          const sections: { items: ChatItem[]; label?: string }[] = [
            { items: PRIVATE_CHANNELS },
            { items: GROUPS },
            { items: DMS, label: "Direct messages" },
          ];
          return sections.map((section, sIdx) => (
            <div key={sIdx}>
              {section.label && (
                <p className="mt-3 px-2 pt-2 pb-1 font-hkl-centra text-[10px] font-semibold text-olive">
                  {section.label}
                </p>
              )}
              {section.items.map((item) => {
                const hasUnread = (item.unread ?? 0) > 0;
                const isChannel =
                  item.kind === "channel" || item.kind === "private";
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition active:bg-white/5"
                  >
                    {isChannel ? (
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F0F0F]">
                        <span className="font-hkl-centra text-lg font-semibold text-olive">
                          #
                        </span>
                        {item.kind === "private" && (
                          <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-olive ring-2 ring-black">
                            <IoLockClosedOutline className="text-[8px] text-white" />
                          </span>
                        )}
                      </div>
                    ) : item.kind === "group" ? (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F0F0F]">
                        <IoPeopleOutline className="text-lg text-olive" />
                      </div>
                    ) : (
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                        <Image
                          src={AVATAR_URL}
                          alt={item.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`truncate font-outfit text-sm ${hasUnread ? "font-semibold text-white" : "font-medium text-white/80"}`}
                        >
                          {isChannel ? `#${item.name}` : item.name}
                        </p>
                        <span
                          className={`shrink-0 font-outfit text-[10px] ${hasUnread ? "font-semibold text-mint" : "text-white/40"}`}
                        >
                          {item.time}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <p
                          className={`truncate font-outfit text-xs ${hasUnread ? "text-white/70" : "text-white/50"}`}
                        >
                          {item.preview}
                        </p>
                        {hasUnread && (
                          <span className="ml-1 flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-olive px-1.5 font-outfit text-[10px] font-semibold text-white">
                            {item.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ));
        })()}
      </div>

      <button
        type="button"
        className="absolute right-4 bottom-24 z-30 flex items-center gap-2 rounded-full bg-olive pl-3 pr-4 py-2.5 text-white shadow-[0_0_24px_0_rgba(88,108,72,0.6)] ring-1 ring-olive/40 transition active:scale-95"
      >
        <IoCreateOutline className="text-lg" />
        <span className="font-hkl-centra text-[12px] font-medium">New</span>
      </button>

      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function ScreenDmThreadBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />

      <div className="flex shrink-0 items-center gap-3 border-b border-white/8 px-3 py-2.5">
        <button type="button" aria-label="Back" className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 active:bg-white/5">
          <IoChevronBack className="text-xl" />
        </button>
        <div className="relative">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image src={AVATAR_URL} alt="Priya Sharma" fill sizes="36px" className="object-cover" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-mint ring-2 ring-black" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-outfit text-[13.5px] font-semibold text-white">Priya Sharma</p>
          <p className="font-outfit text-[10.5px] text-white/50">Active now</p>
        </div>
        <button type="button" aria-label="More" className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 active:bg-white/5">
          <IoEllipsisHorizontal className="text-lg" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-outfit text-[10px] font-medium uppercase text-white/40">
            Today · 10:14 AM
          </span>
          <div className="h-px flex-1 bg-white/8" />
        </div>
        <div className="space-y-3">
          {DM_MESSAGES.map((m, i) => {
            const prevSame = i > 0 && DM_MESSAGES[i - 1].fromMe === m.fromMe;
            const isLastSent = m.fromMe && !DM_MESSAGES.slice(i + 1).some((x) => x.fromMe);
            return (
              <div
                key={m.id}
                className={`flex flex-col ${m.fromMe ? "items-end" : "items-start"} ${prevSame ? "-mt-2" : ""}`}
              >
                <div
                  className={`max-w-[78%] px-3.5 py-2 font-outfit text-[13px] leading-snug ${
                    m.fromMe
                      ? "rounded-2xl rounded-br-md bg-olive text-white"
                      : "rounded-2xl rounded-bl-md bg-[#0F0F0F] text-white"
                  }`}
                >
                  {m.text}
                </div>
                {(!prevSame || isLastSent) && (
                  <span
                    className={`mt-1 px-1 font-outfit text-[10px] text-white/40 ${m.fromMe ? "text-right" : "text-left"}`}
                  >
                    {m.time}
                    {isLastSent && <span className="ml-1 text-mint">· Read</span>}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 border-t border-white/8 bg-black px-3 py-2">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Attach" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/50 transition active:bg-white/5">
            <IoAddOutline className="text-xl" />
          </button>
          <div className="flex flex-1 items-center rounded-full border border-white/15 bg-[#0F0F0F] pl-3 pr-1 py-1">
            <input
              type="text"
              placeholder="Message"
              className="flex-1 bg-transparent font-outfit text-[13px] text-white outline-none placeholder:text-white/40"
            />
            <button type="button" aria-label="Voice" className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition active:bg-white/5">
              <IoMicOutline className="text-base" />
            </button>
          </div>
          <button type="button" aria-label="Send" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive text-white transition active:scale-95">
            <IoChevronForward className="text-base" />
          </button>
        </div>
      </div>

      <BWHomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   BW screen set — remaining 18
   ──────────────────────────────────────────────────────────── */

function ScreenAuthBW() {
  const usLang: Language = { code: "US", name: "United States", flagSrc: "/flags/us.svg" };
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h1 className="font-hkl text-[2rem] font-bold leading-[1.05] tracking-tight text-white">
          Begin your Journey.
        </h1>
        <div className="mt-8 space-y-3">
          <div className="rounded-xl border border-white/10 bg-[#0F0F0F] px-4 py-3.5 font-outfit text-[15px] text-white/40">
            Your name
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-olive bg-[#0F0F0F] py-2 pl-2 pr-4 ring-2 ring-olive/30">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-2 font-hkl-centra text-[11px] font-semibold text-white">
              <FlagGlyph lang={usLang} size="sm" />
              +1
              <IoChevronDownOutline className="text-[10px] text-white/50" />
            </div>
            <span className="flex-1 font-outfit text-[15px] tracking-wide text-white/40">
              Phone number
            </span>
          </div>
        </div>
        <div className="mt-auto space-y-3.5">
          <BWPrimaryButton full>Send code</BWPrimaryButton>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-hkl-centra text-[10px] text-white/40">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <button className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-transparent px-6 py-2.5 font-hkl-centra text-[13px] font-medium text-white/70 transition active:bg-white/5">
            <Image src="/google.svg" alt="Google" width={16} height={16} className="h-4 w-4 brightness-0 invert" />
            Continue with Google
          </button>
          <p className="pt-1 text-center font-outfit text-[11px] leading-relaxed text-white/40">
            By continuing, you agree to our{" "}
            <span className="text-white/70 underline underline-offset-2">Terms</span> &{" "}
            <span className="text-white/70 underline underline-offset-2">Privacy</span>.
          </p>
        </div>
      </div>
      <BWHomeIndicator />
    </div>
  );
}

function ScreenOtpBW() {
  const digits = ["7", "3", "9", "", "", ""];
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h1 className="font-hkl text-[2rem] font-bold leading-[1.05] tracking-tight text-white">
          Enter your code.
        </h1>
        <p className="mt-2 font-outfit text-sm text-white/60">
          Sent to <span className="text-white">+1 ••• 4567</span>
        </p>
        <div className="mt-8 flex justify-between gap-2">
          {digits.map((d, i) => {
            const isFocused = !d && i === digits.findIndex((x) => !x);
            return (
              <div
                key={i}
                className={`flex h-14 w-12 items-center justify-center rounded-xl border font-hkl text-2xl font-bold transition ${
                  d
                    ? "border-white/10 bg-[#0F0F0F] text-white"
                    : isFocused
                      ? "border-2 border-olive bg-black text-white"
                      : "border-white/10 bg-black text-white/30"
                }`}
              >
                {d || (isFocused ? <span className="h-6 w-px animate-pulse bg-olive" /> : "")}
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center font-outfit text-sm text-white/50">
          Didn&apos;t get it? <span className="text-olive underline underline-offset-2">Resend</span>
        </p>
        <div className="mt-auto flex">
          <BWPrimaryButton full>Verify</BWPrimaryButton>
        </div>
      </div>
      <BWHomeIndicator />
    </div>
  );
}

function BWFadedHomeBody() {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-3">
      {[1, 2].map((i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-white/8 bg-[#0F0F0F] p-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 shrink-0 rounded-full bg-white/8" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-28 rounded-full bg-white/8" />
              <div className="h-2 w-12 rounded-full bg-white/8" />
            </div>
          </div>
          <div className="mt-3 h-3.5 w-3/4 rounded-full bg-white/8" />
          {i === 1 && <div className="mt-3 aspect-4/3 w-full rounded-xl bg-white/8" />}
          <div className="mt-3 space-y-2">
            <div className="h-2.5 w-full rounded-full bg-white/8" />
            <div className="h-2.5 w-2/3 rounded-full bg-white/8" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ScreenBlankHomeBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWHomeHeader />
      <BWHomePills />
      <BWFadedHomeBody />
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function ScreenLotusPopupBW() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-black">
      <BWStatusBar />
      <BWHomeHeader />
      <BWHomePills />
      <BWFadedHomeBody />
      <BWBottomNav />
      <BWHomeIndicator />

      {/* Modal layer — black backdrop with sunrise glow from both top corners */}
      <div className="absolute inset-0 z-40 overflow-hidden bg-black/95 backdrop-blur-md">
        {/* Sunrise glow + rays from top-right */}
        <svg
          className="lotus-rays pointer-events-none absolute -top-4 -right-4 h-72 w-72"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lotusRayBW" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFD580" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFD580" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="lotusSunBW" cx="100%" cy="0%" r="55%">
              <stop offset="0%" stopColor="#FFE8B8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFE8B8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="200" height="200" fill="url(#lotusSunBW)" />
          <g transform="translate(200, 0)">
            <path d="M 0,0 L -28,130 L -40,130 Z" fill="url(#lotusRayBW)" />
            <path d="M 0,0 L -60,130 L -78,130 Z" fill="url(#lotusRayBW)" opacity="0.7" />
            <path d="M 0,0 L -95,130 L -118,130 Z" fill="url(#lotusRayBW)" opacity="0.5" />
            <path d="M 0,0 L -130,130 L -150,130 Z" fill="url(#lotusRayBW)" opacity="0.4" />
          </g>
        </svg>

        {/* Mirrored sunrise glow + rays on top-left */}
        <svg
          className="lotus-rays-left pointer-events-none absolute -top-4 -left-4 h-72 w-72"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lotusRayLeftBW" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFD580" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFD580" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="lotusSunLeftBW" cx="0%" cy="0%" r="55%">
              <stop offset="0%" stopColor="#FFE8B8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFE8B8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="200" height="200" fill="url(#lotusSunLeftBW)" />
          <g transform="translate(0, 0)">
            <path d="M 0,0 L 28,130 L 40,130 Z" fill="url(#lotusRayLeftBW)" />
            <path d="M 0,0 L 60,130 L 78,130 Z" fill="url(#lotusRayLeftBW)" opacity="0.7" />
            <path d="M 0,0 L 95,130 L 118,130 Z" fill="url(#lotusRayLeftBW)" opacity="0.5" />
            <path d="M 0,0 L 130,130 L 150,130 Z" fill="url(#lotusRayLeftBW)" opacity="0.4" />
          </g>
        </svg>

        {/* Subtle olive counter-glow at the bottom */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-olive opacity-30 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5">
          <LotusFlower />
          <h2 className="mt-3 text-center font-hkl text-[1.7rem] font-bold leading-[1.1] tracking-tight text-white">
            Welcome, Sarah
          </h2>
          <p className="mt-3 max-w-[18rem] text-center font-outfit text-[13px] leading-relaxed text-white/70">
            You&apos;re not alone on this path. We&apos;ll walk you through a
            calm setup in four short steps.
          </p>
          <div className="mt-8 flex shrink-0 flex-col items-center">
            <BWPrimaryButton>Begin</BWPrimaryButton>
            <p className="mt-3 font-outfit text-[10.5px] text-white/40">Tap to begin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BWTourSheet({
  step,
  title,
  body,
  field,
  ctaLabel = "Continue",
}: {
  step: number;
  title: string;
  body: ReactNode;
  field?: ReactNode;
  ctaLabel?: string;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-40 rounded-t-4xl bg-black p-6 pt-3 shadow-[0_-20px_60px_-10px_rgba(88,108,72,0.25)] ring-1 ring-white/8">
      <div className="mx-auto h-1.5 w-12 rounded-full bg-white/15" />
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1 w-4 rounded-full ${i <= step ? "bg-olive" : "bg-white/10"}`}
              />
            ))}
          </div>
          {step < 4 && (
            <button type="button" className="font-outfit text-[11px] font-medium text-white/50 active:scale-95">
              Skip
            </button>
          )}
        </div>
        <h3 className="mt-2.5 font-hkl text-xl font-bold leading-tight text-white">{title}</h3>
        <div className="mt-2 font-outfit text-[13px] leading-relaxed text-white/70">{body}</div>
        {field && <div className="mt-5">{field}</div>}
        <div className="mt-5 flex">
          <BWPrimaryButton full>{ctaLabel}</BWPrimaryButton>
        </div>
      </div>
    </div>
  );
}

function BWFieldDropdown({
  Icon,
  label,
  value,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0F0F0F] px-4 py-3">
      <Icon className="text-lg text-white/60" />
      <div className="flex-1">
        <p className="font-hkl-centra text-[9px] font-semibold text-white/50">{label}</p>
        <p className="mt-0.5 font-outfit text-sm font-medium text-white">{value}</p>
      </div>
      <IoChevronDownOutline className="text-sm text-white/40" />
    </div>
  );
}

function BWFadedAppScaffold({ spotlight }: { spotlight: Tab }) {
  return (
    <>
      <BWHomeHeader />
      <BWHomePills />
      <BWFadedHomeBody />
      <BWBottomNavSpotlight spotlight={spotlight} />
    </>
  );
}

function BWBottomNavSpotlight({ spotlight }: { spotlight: Tab }) {
  const items = [
    { id: "feed" as Tab, label: "Feed", Icon: IconFeed },
    { id: "practice" as Tab, label: "Practice", Icon: IconPractice },
    { id: "chat" as Tab, label: "Chat", Icon: IconChat },
    { id: "alerts" as Tab, label: "Alerts", Icon: IconBell },
  ];
  return (
    <div className="flex shrink-0 border-t border-white/8 bg-black px-3 pb-1 pt-2">
      {items.map(({ id, label, Icon }) => {
        const isSpotlight = spotlight === id;
        return (
          <div
            key={id}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1 transition ${
              isSpotlight ? "bg-olive/20 ring-2 ring-olive/40" : "opacity-30"
            }`}
          >
            <Icon className={`text-xl ${isSpotlight ? "text-olive" : "text-white/50"}`} />
            <span className={`font-outfit text-[10px] ${isSpotlight ? "font-semibold text-olive" : "text-white/50"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ScreenTourPracticeBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWFadedAppScaffold spotlight="practice" />
      <BWHomeIndicator />
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/50" />
      <BWTourSheet
        step={1}
        title="The heart of HKL"
        body={
          <>
            Your daily 2-minute commitment lives in{" "}
            <span className="font-medium text-white">Practice</span>. Let us set
            your timezone so we nudge you at the right moment.
          </>
        }
        field={<BWFieldDropdown Icon={IoTimeOutline} label="Timezone" value="America / New York" />}
      />
    </div>
  );
}

function ScreenTourFeedBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWFadedAppScaffold spotlight="feed" />
      <BWHomeIndicator />
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/50" />
      <BWTourSheet
        step={2}
        title="Share what you feel"
        body={
          <>
            The community shares in many languages. We&apos;ll auto-translate
            posts to yours.
          </>
        }
        field={
          <div className="flex flex-wrap gap-2">
            {[
              { label: "English", active: true },
              { label: "ਪੰਜਾਬੀ" },
              { label: "हिन्दी" },
              { label: "Español" },
              { label: "Français" },
              { label: "+3 more" },
            ].map((l) => (
              <span
                key={l.label}
                className={`rounded-full border px-3 py-1.5 font-outfit text-[12px] ${
                  l.active ? "border-olive bg-olive text-white" : "border-white/15 text-white/70"
                }`}
              >
                {l.label}
              </span>
            ))}
          </div>
        }
      />
    </div>
  );
}

function ScreenTourChannelsBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWFadedAppScaffold spotlight="chat" />
      <BWHomeIndicator />
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/50" />
      <BWTourSheet
        step={3}
        title="Walk together"
        body={
          <>
            <p>Each morning, the community shares one breath the core daily affirmation, in every language.</p>
            <div className="mt-3 rounded-xl border border-white/10 bg-[#0F0F0F] px-4 py-3 text-center font-hkl text-[14px] text-white">
              &ldquo;I am{" "}
              <span className="font-playfair font-light italic text-olive">Humility</span>, I am{" "}
              <span className="font-playfair font-light italic text-olive">Kindness</span>, I am{" "}
              <span className="font-playfair font-light italic text-olive">Love</span>.&rdquo;
            </div>
          </>
        }
      />
    </div>
  );
}

function ScreenTourYouBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWFadedAppScaffold spotlight="alerts" />
      <BWHomeIndicator />
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-22 z-20 bg-black/50" />
      <BWTourSheet
        step={4}
        title="Your space"
        body={
          <>
            Track your streak and progress here. Tell us where you&apos;re
            joining from we love seeing HKL spread.
          </>
        }
        field={
          <BWFieldDropdown
            Icon={IoGlobeOutline}
            label="Country"
            value={<span className="inline-flex items-center gap-2"><span className="text-base">🇺🇸</span> United States</span>}
          />
        }
        ctaLabel="Finish setup"
      />
    </div>
  );
}

function ScreenPostDetailBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="Post" />
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="flex items-center gap-3 px-5 pt-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image src={AVATAR_URL} alt="Gurmohit Singh Thind" fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-outfit text-sm font-semibold text-white">Gurmohit Singh Thind</p>
            <span className="font-outfit text-xs text-white/50">2d · Heartalks</span>
          </div>
          <IoEllipsisHorizontal className="text-lg text-white/40" />
        </div>
        <h1 className="mt-4 px-5 font-hkl text-[1.35rem] font-bold leading-tight tracking-tight text-white">
          The Hands of Humility
        </h1>
        <div className="relative mt-4 aspect-4/3 w-full overflow-hidden bg-[#0F0F0F]">
          <Image
            src="https://app.circle.so/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCSDJyUlFvPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--0dbf3be7886971c00899e50a79888faf345cc753/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJNEJEQTZDbk5oZG1WeWV3WTZDbk4wY21sd1ZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a9f899a0c764220ba5650fc8daea690765ef2c6f/IMG-20260519-WA0016.jpg"
            alt=""
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
        <div className="mt-4 space-y-3 px-5 font-outfit text-[13px] leading-relaxed text-white/70">
          <p>&ldquo;When you are in control of your mind, then you are humble. And when you are not in control of your mind, then the ego takes the place of humility.</p>
          <p>That&apos;s how you do your duties that is so important; and the duties must be done with <span className="font-medium text-white">love</span>, with <span className="font-medium text-white">care</span>, and with the awareness that you are not the doer, only an instrument.</p>
          <p>
            Each small act — pouring tea, listening to a friend, walking home —
            becomes a quiet practice. The hands fold not in performance, but in
            recognition.&rdquo;
          </p>
        </div>
        <div className="mt-5 flex items-center gap-6 border-y border-white/8 px-5 py-3">
          <button className="flex items-center gap-1.5 text-white/70">
            <IoHeart className="text-lg text-mint" />
            <span className="font-outfit text-[12.5px] font-medium">10</span>
          </button>
          <button className="flex items-center gap-1.5 text-white/70">
            <IoChatbubbleOutline className="text-lg" />
            <span className="font-outfit text-[12.5px] font-medium">3</span>
          </button>
          <button className="ml-auto text-white/40"><IoShareSocialOutline className="text-lg" /></button>
          <button className="text-white/40"><IoBookmarkOutline className="text-lg" /></button>
        </div>
        <p className="mt-5 px-5 font-hkl-centra text-[10px] font-semibold text-white/50">
          {POST_COMMENTS.length} comments
        </p>
        <div className="mt-3 space-y-4 px-5">
          {POST_COMMENTS.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image src={AVATAR_URL} alt={c.authorName} fill sizes="32px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="rounded-2xl bg-[#0F0F0F] px-3 py-2">
                  <p className="font-outfit text-[12px] font-semibold text-white">{c.authorName}</p>
                  <p className="mt-0.5 font-outfit text-[12.5px] leading-relaxed text-white/70">{c.body}</p>
                </div>
                <div className="mt-1 flex items-center gap-3 px-2 font-outfit text-[10px] text-white/40">
                  <span>{c.time}</span>
                  <button>Like</button>
                  <button>Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-t border-white/8 bg-black px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image src={AVATAR_URL} alt="Sarah" fill sizes="32px" className="object-cover" />
          </div>
          <div className="flex flex-1 items-center rounded-full border border-white/10 bg-[#0F0F0F] pl-3 pr-1 py-1">
            <input type="text" placeholder="Add a comment…" className="flex-1 bg-transparent font-outfit text-[12.5px] text-white outline-none placeholder:text-white/40" />
            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-olive text-white">
              <IoChevronForward className="text-sm rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function ScreenNewMessageBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-3 py-2.5">
        <button className="rounded-full px-3 py-1 font-outfit text-[13px] text-white/70">Cancel</button>
        <h1 className="font-hkl text-sm font-bold text-white">New Message</h1>
        <button disabled className="rounded-full px-3 py-1 font-hkl-centra text-[12px] font-medium text-white/30">Send</button>
      </div>
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="font-outfit text-[12px] text-white/50">To:</span>
        <input type="text" placeholder="Search people…" className="flex-1 bg-transparent font-outfit text-[13px] text-white outline-none placeholder:text-white/40" />
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain pb-4">
        <p className="px-5 pt-4 pb-2 font-hkl-centra text-[10px] font-semibold text-white/50">Suggested</p>
        {NEW_MSG_SUGGESTIONS.map((p) => (
          <button key={p.id} className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition active:bg-white/5">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image src={AVATAR_URL} alt={p.name} fill sizes="40px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-outfit text-sm font-medium text-white">{p.name}</p>
              <p className="truncate font-outfit text-[11px] text-white/50">{p.handle}</p>
            </div>
          </button>
        ))}
      </div>
      <BWHomeIndicator />
    </div>
  );
}

function BWEventRow({ item }: { item: EventListItem }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left transition active:scale-[0.99]">
      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-black ring-1 ring-white/10">
        <span className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-white/50">{item.month}</span>
        <span className="mt-0.5 font-hkl text-base font-bold leading-none text-white">{item.day}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate font-outfit text-sm font-semibold text-white">{item.title}</p>
          {item.attending && (
            <span className="shrink-0 rounded-full bg-mint/15 px-1.5 py-0.5 font-hkl-centra text-[8px] font-semibold text-mint">
              Going
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate font-outfit text-[11.5px] text-white/50">{item.time}</p>
        <p className="mt-1 font-outfit text-[11px] text-white/40">
          <span className="font-medium text-white/70">{item.going}</span> going
        </p>
      </div>
      <IoChevronForward className="text-base text-white/30" />
    </button>
  );
}

function ScreenEventsBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWHomeHeader />
      <BWHomePills />
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3">
        <p className="px-1 pb-2 font-hkl-centra text-[10px] font-semibold text-white/50">This week</p>
        <div className="space-y-2">
          {EVENTS_THIS_WEEK.map((e) => <BWEventRow key={e.id} item={e} />)}
        </div>
        <p className="px-1 pt-5 pb-2 font-hkl-centra text-[10px] font-semibold text-white/50">Later this month</p>
        <div className="space-y-2">
          {EVENTS_LATER.map((e) => <BWEventRow key={e.id} item={e} />)}
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function ScreenEventDetailBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="Event" />
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="relative aspect-3/2 w-full bg-[#0F0F0F]">
          <Image src="https://assets-v2.circle.so/6m6iyb4tuytme1viuez07y2528tu" alt="" fill sizes="320px" className="object-cover" />
        </div>
        <div className="px-5 pb-6">
          <div className="mt-4 flex items-start gap-3">
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0F0F0F]">
              <span className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-white/50">May</span>
              <span className="mt-0.5 font-hkl text-lg font-bold leading-none text-white">23</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-hkl-centra text-[10px] font-semibold text-mint">Saturday Practice</p>
              <h1 className="mt-1 font-hkl text-[1.25rem] font-bold leading-tight text-white">HKL Saturday Meetup</h1>
              <p className="mt-1 font-outfit text-xs text-white/50">Sat, May 23 · 10:30–11:15 PM IST</p>
            </div>
          </div>
          <div className="mt-5">
            <BWPrimaryButton full>Join virtual event</BWPrimaryButton>
          </div>
          <p className="mt-2 text-center font-outfit text-[11px] text-white/50">Repeats every Saturday</p>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-[#0F0F0F] p-3">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-hkl-centra text-[10px] font-semibold text-white ring-2 ring-black">P</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint/15 font-hkl-centra text-[10px] font-semibold text-mint ring-2 ring-black">M</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-olive/30 font-hkl-centra text-[10px] font-semibold text-white ring-2 ring-black">G</span>
              </div>
              <span className="font-outfit text-xs text-white/70">
                <span className="font-semibold text-white">128</span> going
              </span>
            </div>
            <button className="font-outfit text-xs text-mint underline underline-offset-2">Add to calendar</button>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-[#0F0F0F]">
            {[
              { Icon: IoCalendarOutline, label: "When", value: "Sat, May 23 · 10:30 PM IST" },
              { Icon: IoRepeatOutline, label: "Repeats", value: "Every Saturday · 45 min" },
              { Icon: IoVideocamOutline, label: "Where", value: "Zoom Meeting", chevron: true },
            ].map((r, i, arr) => (
              <div key={r.label}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black ring-1 ring-white/10">
                    <r.Icon className="text-base text-white/70" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-outfit text-[11px] text-white/50">{r.label}</p>
                    <p className="mt-0.5 font-outfit text-[13px] font-medium text-white">{r.value}</p>
                  </div>
                  {r.chevron && <IoChevronForward className="shrink-0 text-sm text-white/30" />}
                </div>
                {i < arr.length - 1 && <div className="h-px bg-white/8" />}
              </div>
            ))}
            <div className="h-px bg-white/8" />
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                <Image src={AVATAR_URL} alt="Host" fill sizes="36px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-outfit text-[11px] text-white/50">Hosted by</p>
                <p className="mt-0.5 font-outfit text-[13px] font-medium text-white">Anjali Mehta</p>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3">
            <p className="truncate font-outfit text-[11px] text-mint underline underline-offset-2">us06web.zoom.us/j/7952226852</p>
            <div className="mt-2 flex gap-4 font-outfit text-[11px] text-white/50">
              <span>ID <span className="font-medium text-white">795 222 6852</span></span>
              <span>Code <span className="font-medium text-white">500700</span></span>
            </div>
          </div>
          <p className="mt-6 mb-2 font-hkl text-[15px] font-bold text-white">About this event</p>
          <p className="font-outfit text-[13px] leading-relaxed text-white/70">
            A reflective gathering inviting us to recognize{" "}
            <span className="font-playfair italic text-olive">humility, kindness, and love</span> within and around us. By experiencing transformation using simple practices such as the{" "}
            <span className="text-mint underline underline-offset-2">I Commit</span> practice.
          </p>
          <div className="mt-4 rounded-xl border border-white/8 bg-[#0F0F0F] px-3 py-2.5 font-outfit text-[12px] leading-relaxed text-white/70">
            👉 If you know others who might benefit from this session, feel free to invite them too.
          </div>

          <p className="mt-4 font-outfit text-[12px] italic leading-relaxed text-white/60">
            Research shows that it takes 40–60 days of consistent practice to
            form a habit. Let&apos;s encourage one another to commit to
            self-care and become the most beautiful version of ourselves.
          </p>
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function BWSpaceRow({ item }: { item: SpaceItem }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left transition active:scale-[0.99]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
        {item.lottieSrc ? (
          <DotLottieReact src={item.lottieSrc} loop autoplay renderConfig={{ devicePixelRatio: 3, autoResize: true }} style={{ width: 36, height: 36 }} />
        ) : item.emoji ? (
          <span className="text-xl">{item.emoji}</span>
        ) : item.Icon ? (
          <item.Icon className="text-xl text-olive" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-outfit text-sm font-semibold text-white">{item.name}</p>
        <p className="truncate font-outfit text-xs text-white/50">{item.description}</p>
      </div>
      <IoChevronForward className="text-base text-white/30" />
    </button>
  );
}

function ScreenSpacesBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWHomeHeader />
      <BWHomePills />
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3">
        <p className="px-1 pb-2 font-hkl-centra text-[10px] font-semibold text-white/50">Spaces</p>
        <div className="space-y-2">
          {SPACES.map((s) => <BWSpaceRow key={s.id} item={s} />)}
        </div>
        <p className="px-1 pt-5 pb-2 font-hkl-centra text-[10px] font-semibold text-white/50">More</p>
        <div className="space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left transition active:scale-[0.99]">
            <IoShareSocialOutline className="text-lg text-white/60" />
            <span className="flex-1 font-outfit text-sm text-white">Share the app</span>
            <IoChevronForward className="text-base text-white/30" />
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left transition active:scale-[0.99]">
            <IoMailOutline className="text-lg text-white/60" />
            <span className="flex-1 font-outfit text-sm text-white">Contact us</span>
            <IoChevronForward className="text-base text-white/30" />
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left transition active:scale-[0.99]">
            <IoHeartOutline className="text-lg text-white/60" />
            <span className="flex-1 font-outfit text-sm text-white">Follow HKL</span>
            <span className="flex items-center gap-3 text-white/60">
              <IoLogoInstagram className="text-base" />
              <IoLogoFacebook className="text-base" />
              <IoLogoYoutube className="text-base" />
            </span>
          </button>
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function ScreenMemberProfileBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="Profile" />
      <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
        <div className="flex flex-col items-center px-5 pt-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#0F0F0F] ring-1 ring-white/15">
            <Image src={AVATAR_URL} alt="Priya Sharma" fill sizes="96px" className="object-cover" />
          </div>
          <h1 className="mt-3 font-hkl text-[1.35rem] font-bold leading-tight text-white">Priya Sharma</h1>
          <p className="mt-1 flex items-center gap-1 font-outfit text-[12px] text-white/50">
            <IoLocationOutline className="text-sm" />
            Bengaluru, India
          </p>
          <p className="mt-3 max-w-[16rem] text-center font-outfit text-[13px] leading-relaxed text-white/70">
            Learning to listen — to my breath, to others, to what life is quietly teaching.
          </p>
        </div>
        <div className="mt-5 flex items-stretch divide-x divide-white/10 border-y border-white/8 py-3">
          {[
            { v: "42", l: "Posts" },
            { v: "128", l: "Comments" },
            { v: "6", l: "Spaces" },
          ].map((s) => (
            <div key={s.l} className="flex flex-1 flex-col items-center">
              <span className="font-hkl text-lg font-bold text-white">{s.v}</span>
              <span className="font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-white/50">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 px-5">
          <BWPrimaryButton full>Connect</BWPrimaryButton>
        </div>
        <p className="mt-6 mb-2 px-5 font-hkl-centra text-[10px] font-semibold text-white/50">Recent posts</p>
        <div className="space-y-2 px-3">
          {[
            { title: "Morning thoughts", body: "Today I noticed kindness in the smallest moments — a stranger's smile at the bus stop.", meta: "5h · 24 likes · 5 comments" },
            { title: "On forgiveness", body: "Forgiveness is not condoning. It is releasing the weight of carrying what is not yours to hold.", meta: "3d · 51 likes · 12 comments" },
          ].map((p) => (
            <button key={p.title} className="block w-full rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left">
              <p className="font-outfit text-sm font-semibold text-white">{p.title}</p>
              <p className="mt-0.5 line-clamp-2 font-outfit text-[12px] text-white/60">{p.body}</p>
              <p className="mt-2 font-outfit text-[10px] text-white/40">{p.meta}</p>
            </button>
          ))}
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function BWHKLAccent({ children }: { children: ReactNode }) {
  return <span className="font-playfair italic text-olive">{children}</span>;
}

function BWSpaceHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6">
      <div className="h-1 w-6 rounded-full bg-olive" />
      <h2 className="mt-2 font-hkl text-[15px] font-bold leading-tight text-white">{children}</h2>
    </div>
  );
}

function BWSpaceBody({ children }: { children: ReactNode }) {
  return <p className="mt-2 font-outfit text-[13px] leading-relaxed text-white/70">{children}</p>;
}

function ScreenSayHelloBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="Say Hello" />
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="relative aspect-3/1 w-full bg-[#0F0F0F]">
          <Image src="https://assets-v2.circle.so/970cy6sgttmqwqjpbo7x32u5xxtz" alt="" fill sizes="320px" className="object-contain object-top" />
        </div>
        <div className="px-5 pb-5">
          <h1 className="mt-4 font-hkl text-[1.35rem] font-bold leading-tight tracking-tight text-white">
            Welcome Home to the HKL Movement
          </h1>
          <p className="mt-3 font-outfit text-[13px] leading-relaxed text-white/70">
            We are so grateful you are here. You have joined a movement dedicated to the most important work of our lives: Coming Home to <BWHKLAccent>Humility, Kindness &amp; Love</BWHKLAccent>.
          </p>
          <BWSpaceHeading>What is HKL Movement</BWSpaceHeading>
          <BWSpaceBody>
            The HKL Global Movement is dedicated to inspiring everyone to awaken, go within, and reconnect with the virtues of <BWHKLAccent>Humility, Kindness &amp; Love</BWHKLAccent> that already exist within us.
          </BWSpaceBody>
          <BWSpaceHeading>Before we begin…</BWSpaceHeading>
          <BWSpaceBody>
            This space is a &ldquo;Beautiful Garden&rdquo; that we all tend
            together. To protect its peace, we invite you to take a moment to
            read our <span className="font-medium text-mint underline underline-offset-2">#📜 Community Guidelines</span>. These
            are not just rules; they are the three qualities we practice here:{" "}
            <em>Is it Humble? Is it Kind? Is it Loving?</em>
          </BWSpaceBody>
          <div className="mt-3 rounded-xl border border-white/8 bg-[#0F0F0F] px-3 py-2.5 font-outfit text-[12px] leading-relaxed text-white/70">
            🔔 You can also customize your notification preferences anytime by tapping your avatar in the top-right corner and selecting <span className="font-medium text-white">Notifications</span>.
          </div>
          <BWSpaceHeading>Share Your Fragrance</BWSpaceHeading>
          <BWSpaceBody>
            This community isn&apos;t a place to scroll — it&apos;s a place to connect. Tap <span className="font-medium text-white">New Post</span> and share a brief introduction:
          </BWSpaceBody>
          <div className="mt-4 divide-y divide-white/8 rounded-xl border border-white/8 bg-[#0F0F0F]">
            {[
              { title: "Who are you?", body: "Your name and where in the world you're joining from." },
              { title: "Why are you here?", body: "What drew you to HKL? What is your heart seeking?" },
              { title: 'Your "One Small Thing"?', body: "One tiny habit you're changing to live more humbly, kindly, or lovingly." },
            ].map((item) => (
              <div key={item.title} className="px-4 py-3">
                <p className="font-outfit text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 font-outfit text-xs leading-relaxed text-white/60">{item.body}</p>
              </div>
            ))}
          </div>

          <BWSpaceHeading>Next Steps</BWSpaceHeading>
          <BWSpaceBody>
            Once you&apos;ve introduced yourself and welcomed a few others:
          </BWSpaceBody>
          <div className="mt-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3">
            <p className="flex items-center gap-2 font-outfit text-[13px] font-semibold text-white">
              <IoLeafOutline className="text-base text-olive" />
              Heartalks (Discussions)
            </p>
            <p className="mt-1 font-outfit text-[12px] leading-relaxed text-white/60">
              Our main discussion space. Whether you have a question, a
              reflection, or an article to share this is where we gather to
              grow together.
            </p>
          </div>
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function BWNumberedHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-7 border-t border-white/8 pt-4">
      <h2 className="font-hkl text-[15px] font-bold leading-tight text-white">{children}</h2>
    </div>
  );
}

function ScreenCommunityGuidelinesBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="Community Guidelines" />
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="relative aspect-3/1 w-full bg-[#0F0F0F]">
          <Image src="https://assets-v2.circle.so/xcuxpqh0hol0hjr8bft2fnd2mxcg" alt="" fill sizes="320px" className="object-contain object-top" />
        </div>
        <div className="px-5 pb-5">
          <p className="mt-4 font-outfit text-[13px] leading-relaxed text-white/70">
            Welcome to a space built on <BWHKLAccent>Humility, Kindness &amp; Love</BWHKLAccent>. This isn&apos;t just what we say it&apos;s how we live. To keep our Garden beautiful, we follow these simple intentions.
          </p>
          <BWNumberedHeading>The Three-Way Test</BWNumberedHeading>
          <BWSpaceBody>Before you post or comment, pause and ask:</BWSpaceBody>
          <div className="mt-3 space-y-2">
            {[
              { emoji: "🌿", q: "Is this Humble?" },
              { emoji: "💛", q: "Is this Kind?" },
              { emoji: "💜", q: "Is this Loving?" },
            ].map((item) => (
              <div key={item.q} className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] px-4 py-3">
                <span className="text-xl">{item.emoji}</span>
                <span className="font-outfit text-sm font-medium text-white">{item.q}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-outfit text-[13px] leading-relaxed text-white/70">
            If the answer is yes, we&apos;d love for you to share.
          </p>

          <BWNumberedHeading>What We Grow Together</BWNumberedHeading>
          <ul className="mt-2 space-y-1.5 pl-5 font-outfit text-[13px] leading-relaxed text-white/70">
            <li className="list-disc"><span className="font-medium text-white">Honest reflection.</span> Share your true journey.</li>
            <li className="list-disc"><span className="font-medium text-white">Gentle encouragement.</span> Lift others up.</li>
            <li className="list-disc"><span className="font-medium text-white">Lived experience.</span> Speak from your own heart and history.</li>
          </ul>
          <BWNumberedHeading>What We Leave Outside</BWNumberedHeading>
          <BWSpaceBody>To protect our peace, we don&apos;t allow:</BWSpaceBody>
          <ul className="mt-2 space-y-1.5 pl-5 font-outfit text-[13px] leading-relaxed text-white/70">
            <li className="list-disc">Political or religious debates.</li>
            <li className="list-disc">Harsh criticism, shaming, or gossip.</li>
            <li className="list-disc">Self-promotion, spam, or negativity.</li>
          </ul>

          <BWNumberedHeading>Our Shared Care</BWNumberedHeading>
          <BWSpaceBody>
            We are all guardians of this culture. If a post doesn&apos;t reflect
            the HKL spirit, please report it. Moderators may remove content or
            members that disrupt our shared values.
          </BWSpaceBody>
          <p className="mt-3 font-outfit text-[13px] italic leading-relaxed text-white/70">
            This space belongs to all of us. Let&apos;s guard it with care.
          </p>

          <div className="mt-4 rounded-xl border border-white/8 bg-[#0F0F0F] px-3 py-2.5 font-outfit text-[12px] leading-relaxed text-white/70">
            💌 Questions? Reach out via our contact form or email{" "}
            <span className="font-medium text-mint underline underline-offset-2">
              info@hkl.org
            </span>
            .
          </div>
        </div>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function BWVirtueCard({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0F0F0F]">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition active:bg-white/5">
        <span className="font-hkl text-base font-bold text-white">{title}</span>
        <IoChevronDownOutline className={`shrink-0 text-base text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-white/8 px-4 pt-3 pb-4">
          <div className="space-y-2.5 font-outfit text-[13px] leading-relaxed text-white/70">{children}</div>
          <button onClick={() => setOpen(false)} className="mt-4 font-hkl-centra text-[10px] font-semibold uppercase tracking-widest text-white/50 transition active:scale-95">
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function ScreenAboutHKLBW() {
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="About" />
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="relative aspect-3/2 w-full bg-[#0F0F0F]">
          <Image src="https://framerusercontent.com/images/xwzq0RWImpOM3YFFFmVAhwhtB8.png?width=1172&height=980" alt="" fill sizes="320px" className="object-cover" />
        </div>
        <div className="px-5 pb-6">
          <p className="mt-6 font-hkl-centra text-[10px] font-semibold text-white/50">What can one do then?</p>
          <h1 className="mt-2 font-playfair text-[1.85rem] font-light italic leading-[1.05] tracking-tight text-white">
            Come home to yourself.
          </h1>
          <p className="mt-3 font-outfit text-[13px] leading-relaxed text-white/70">
            By reconnecting with the virtues of HKL that live within us, we become more beautiful, and from that arises happiness, and lasting contentment.
          </p>
          <p className="mt-2 font-outfit text-[13px] italic leading-relaxed text-white/60">
            The self transformation does not begin &ldquo;out there,&rdquo; it
            begins within.
          </p>
          <div className="relative mt-6 aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#0F0F0F]">
            <Image src="https://framerusercontent.com/images/8TBIV05P4sdyFyEnCqnLiAE74o.jpeg?width=1600&height=1066" alt="HKL practice in community" fill sizes="320px" className="object-cover" />
          </div>
          <p className="mt-6 mb-3 font-hkl-centra text-[10px] font-semibold text-white/50">The Three Virtues</p>
          <div className="space-y-2">
            <BWVirtueCard title="Humility" defaultOpen>
              <p>
                Humility is the opposite of Ego. Ego is the false idea that we
                are separate from, or better than, others. It is the &ldquo;I,
                Me, and Mine&rdquo; voice in our head that constantly seeks to
                possess and gain attention, credit, and control. Humility arises
                out of the consciousness that is grateful.
              </p>
              <p>
                It is living free from ego, as a lifelong learner who is open to
                growth and aware that we are part of something greater than
                ourselves. It allows us to listen deeply and grow through our
                experiences.
              </p>
            </BWVirtueCard>
            <BWVirtueCard title="Kindness">
              <p>
                Kindness is the opposite of self-centeredness. Kindness is
                rooted in humility and arises from the deep understanding of
                truth that all life is interconnected, calling us to treat every
                being with care &amp; compassion.
              </p>
              <p>
                It means being thoughtful, gentle, and considerate in how we
                think, how we speak and how we act.
              </p>
            </BWVirtueCard>
            <BWVirtueCard title="Love">
              <p>
                Love is the universal force, arising from humility at the heart
                of all life. To love is to surrender unconditionally. As the
                heart awakens to love, separation dissolves — fear and hatred
                fall away and we recognize our oneness.
              </p>
              <p>
                Thus, we become capable of creating a world where compassion
                flows as a natural expression of our being.
              </p>
            </BWVirtueCard>
          </div>
          <div className="relative mt-6 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#0F0F0F]">
            <Image src="https://framerusercontent.com/images/SqQ3sb2r3ovRvZmGZI0K9UJskxo.jpeg?width=683&height=1024" alt="A moment of reflection" fill sizes="320px" className="object-cover" />
          </div>
          <p className="mt-6 mb-3 font-hkl-centra text-[10px] font-semibold text-white/50">Get in touch</p>
          <div className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#0F0F0F] px-4 py-3 text-left">
              <IoGlobeOutline className="shrink-0 text-lg text-white/60" />
              <div className="min-w-0 flex-1">
                <p className="font-hkl-centra text-[9px] font-semibold text-white/50">Website</p>
                <p className="mt-0.5 truncate font-outfit text-[13px] font-medium text-white">hkl.org</p>
              </div>
              <IoChevronForward className="shrink-0 text-base text-white/40" />
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#0F0F0F] px-4 py-3 text-left">
              <IoMailOutline className="shrink-0 text-lg text-white/60" />
              <div className="min-w-0 flex-1">
                <p className="font-hkl-centra text-[9px] font-semibold text-white/50">Email</p>
                <p className="mt-0.5 truncate font-outfit text-[13px] font-medium text-white">info@hkl.org</p>
              </div>
              <IoChevronForward className="shrink-0 text-base text-white/40" />
            </button>
          </div>
        </div>
      </div>
      <div className="shrink-0 border-t border-white/8 bg-black px-5 py-3">
        <BWPrimaryButton full>Visit hkl.org</BWPrimaryButton>
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function BWThreadRow({ item }: { item: Thread }) {
  return (
    <button className="flex w-full items-start gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left transition active:scale-[0.99]">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
        <Image src={AVATAR_URL} alt={item.starter} fill sizes="36px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-outfit text-[12px] text-white/50">{item.starter}</p>
          <span className="shrink-0 font-outfit text-[10px] text-white/40">{item.time}</span>
        </div>
        <p className="mt-0.5 font-outfit text-[13px] font-semibold leading-snug text-white">{item.title}</p>
        <p className="mt-1 line-clamp-2 font-outfit text-[12px] leading-relaxed text-white/60">{item.preview}</p>
        <div className="mt-2 flex items-center gap-1.5 font-outfit text-[11px] text-white/50">
          <IoChatbubbleOutline className="text-xs" />
          <span>{item.replies} replies</span>
        </div>
      </div>
      {item.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint" />}
    </button>
  );
}

function ScreenHeartalksBW() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="Heartalks" />
      <div className="flex-1 overflow-y-auto overscroll-contain pb-20">
        <div className="flex items-center gap-3 border-b border-white/8 bg-[#0F0F0F] px-5 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
            <DotLottieReact src="/Heart.lottie" loop autoplay renderConfig={{ devicePixelRatio: 3, autoResize: true }} style={{ width: 32, height: 32 }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-hkl text-sm font-bold text-white">Heartalks</p>
            <p className="mt-0.5 font-outfit text-[11px] text-white/50">Open discussions on what we&apos;re practicing</p>
          </div>
        </div>
        <p className="px-5 pt-4 pb-2 font-hkl-centra text-[10px] font-semibold text-white/50">Recent discussions</p>
        <div className="space-y-2 px-3">
          {HEARTALKS_THREADS.map((t) => <BWThreadRow key={t.id} item={t} />)}
        </div>
      </div>
      <button className="absolute right-4 bottom-24 z-30 flex items-center gap-2 rounded-full bg-olive pl-3 pr-4 py-2.5 text-white shadow-[0_0_24px_0_rgba(88,108,72,0.6)] ring-1 ring-olive/40 transition active:scale-95">
        <IoAddOutline className="text-lg" />
        <span className="font-hkl-centra text-[12px] font-medium">Start a thread</span>
      </button>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

function BWResourceCard({ item }: { item: Resource }) {
  return (
    <button className="flex w-full items-start gap-3 rounded-xl border border-white/8 bg-[#0F0F0F] p-3 text-left transition active:scale-[0.99]">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.title} fill sizes="64px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IoBookmarkOutline className="text-lg text-white/40" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full bg-white/10 px-2 py-0.5 font-hkl-centra text-[9px] font-semibold uppercase tracking-widest text-white/70">
          {item.kind}
        </span>
        <p className="mt-1.5 line-clamp-2 font-outfit text-[13px] font-semibold leading-snug text-white">{item.title}</p>
        <p className="mt-1 font-outfit text-[11px] text-white/50">{item.author} · {item.meta}</p>
      </div>
    </button>
  );
}

function ScreenResourcesBW() {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div className="flex h-full w-full flex-col bg-black">
      <BWStatusBar />
      <BWSpaceTopBar title="Resources" />
      <div className="shrink-0 overflow-x-auto overscroll-contain border-b border-white/8 px-4 py-3 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1.5">
          {RESOURCE_FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 rounded-full px-3 py-1.5 font-outfit text-[12px] font-medium transition ${
                  isActive ? "bg-olive text-white" : "border border-white/15 bg-transparent text-white/60"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain space-y-2 px-3 py-4">
        {RESOURCES.map((r) => <BWResourceCard key={r.id} item={r} />)}
      </div>
      <BWBottomNav />
      <BWHomeIndicator />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PlayPhone — interactive prototype with click-through navigation
   ──────────────────────────────────────────────────────────── */

const LIGHT_SCREEN_REGISTRY: Record<ScreenKey, ReactNode> = {
  splash: <ScreenSplash />,
  quote: <ScreenQuote />,
  auth: <ScreenAuth />,
  otp: <ScreenOtp />,
  "blank-home": <ScreenBlankHome />,
  "lotus-popup": <ScreenLotusPopup />,
  "tour-practice": <ScreenTourPractice />,
  "tour-feed": <ScreenTourFeed />,
  "tour-channels": <ScreenTourChannels />,
  "tour-you": <ScreenTourYou />,
  "save-profile": <ScreenSaveProfile />,
  "home-feed": <ScreenHomeFeed />,
  "post-detail": <ScreenPostDetail />,
  "daily-commitment": <ScreenDailyCommitment />,
  chat: <ScreenChat />,
  "dm-thread": <ScreenDmThread />,
  "new-message": <ScreenNewMessage />,
  alerts: <ScreenAlerts />,
  events: <ScreenEvents />,
  "event-detail": <ScreenEventDetail />,
  spaces: <ScreenSpaces />,
  "member-profile": <ScreenMemberProfile />,
  "say-hello": <ScreenSayHello />,
  "community-guidelines": <ScreenCommunityGuidelines />,
  "about-hkl": <ScreenAboutHKL />,
  heartalks: <ScreenHeartalks />,
  resources: <ScreenResources />,
};

function PlayPhone({
  initial = "splash",
  label = "Play prototype",
}: {
  initial?: ScreenKey;
  label?: string;
}) {
  const [history, setHistory] = useState<ScreenKey[]>([initial]);
  const current = history[history.length - 1];
  const navigate = (screen: ScreenKey) => {
    setHistory((h) => [...h, screen]);
  };
  const back = () => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  };
  const reset = () => setHistory([initial]);
  return (
    <NavContext.Provider value={{ navigate, back, current }}>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-primary-950 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          <span className="font-hkl-centra text-[10px] font-semibold uppercase tracking-widest text-white">
            {label}
          </span>
        </div>
        <PhoneFrame>{LIGHT_SCREEN_REGISTRY[current]}</PhoneFrame>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={back}
            disabled={history.length <= 1}
            className="rounded-full border border-primary-200 bg-white px-3 py-1.5 font-hkl-centra text-[10px] font-semibold text-primary-700 transition active:scale-95 disabled:opacity-30"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-primary-200 bg-white px-3 py-1.5 font-hkl-centra text-[10px] font-semibold text-primary-700 transition active:scale-95"
          >
            Restart
          </button>
          <span className="font-outfit text-[10px] text-primary-500">
            {current}
          </span>
        </div>
      </div>
    </NavContext.Provider>
  );
}

export default function HKLAppPrototype() {
  const lightModeScreens: { num: string; node: ReactNode }[] = [
    { num: "01", node: <ScreenSplash /> },
    { num: "02", node: <ScreenQuote /> },
    { num: "03", node: <ScreenAuth /> },
    { num: "04", node: <ScreenOtp /> },
    { num: "05", node: <ScreenBlankHome /> },
    { num: "06", node: <ScreenLotusPopup /> },
    { num: "07", node: <ScreenTourPractice /> },
    { num: "08", node: <ScreenTourFeed /> },
    { num: "09", node: <ScreenTourChannels /> },
    { num: "10", node: <ScreenTourYou /> },
    { num: "11", node: <ScreenSaveProfile /> },
    { num: "12", node: <ScreenHomeFeed /> },
    { num: "12a", node: <ScreenPostDetail /> },
    { num: "13", node: <ScreenDailyCommitment /> },
    { num: "14", node: <ScreenChat /> },
    { num: "14a", node: <ScreenDmThread /> },
    { num: "14b", node: <ScreenNewMessage /> },
    { num: "15", node: <ScreenAlerts /> },
    { num: "16", node: <ScreenEvents /> },
    { num: "17", node: <ScreenEventDetail /> },
    { num: "18", node: <ScreenSpaces /> },
    { num: "18a", node: <ScreenMemberProfile /> },
    { num: "19", node: <ScreenSayHello /> },
    { num: "20", node: <ScreenCommunityGuidelines /> },
    { num: "20b", node: <ScreenAboutHKL /> },
    { num: "20c", node: <ScreenHeartalks /> },
    { num: "20d", node: <ScreenResources /> },
  ];

  return (
    <main className="min-h-screen bg-white">
      <PrototypeSection
        eyebrow="Section 01"
        title="Style guides + interactive prototype"
        description="Light & dark token systems plus a clickable play phone. Tap the play phone to walk the real user flow end-to-end."
      >
        <PlayPhone initial="splash" label="Play prototype" />
        <PhoneFrame>
          <ScreenStyleGuide />
        </PhoneFrame>
        <PhoneFrame>
          <ScreenStyleGuideBW />
        </PhoneFrame>
      </PrototypeSection>

      <PrototypeSection
        eyebrow="Section 02"
        title="Light mode"
        description={`${lightModeScreens.length} screens · onboarding through the full app surface.`}
      >
        {lightModeScreens.map((s) => (
          <PhoneFrame key={s.num}>{s.node}</PhoneFrame>
        ))}
      </PrototypeSection>

      <PrototypeSection
        eyebrow="Section 03"
        title="Dark mode · black & green"
        description="Pure black surfaces · olive primary action. Bold, OLED-true, higher contrast — full app surface."
      >
        <PhoneFrame><ScreenSplashBW /></PhoneFrame>
        <PhoneFrame><ScreenQuoteBW /></PhoneFrame>
        <PhoneFrame><ScreenAuthBW /></PhoneFrame>
        <PhoneFrame><ScreenOtpBW /></PhoneFrame>
        <PhoneFrame><ScreenBlankHomeBW /></PhoneFrame>
        <PhoneFrame><ScreenLotusPopupBW /></PhoneFrame>
        <PhoneFrame><ScreenTourPracticeBW /></PhoneFrame>
        <PhoneFrame><ScreenTourFeedBW /></PhoneFrame>
        <PhoneFrame><ScreenTourChannelsBW /></PhoneFrame>
        <PhoneFrame><ScreenTourYouBW /></PhoneFrame>
        <PhoneFrame><ScreenSaveProfileBW /></PhoneFrame>
        <PhoneFrame><ScreenHomeFeedBW /></PhoneFrame>
        <PhoneFrame><ScreenPostDetailBW /></PhoneFrame>
        <PhoneFrame><ScreenDailyCommitmentBW /></PhoneFrame>
        <PhoneFrame><ScreenChatBW /></PhoneFrame>
        <PhoneFrame><ScreenDmThreadBW /></PhoneFrame>
        <PhoneFrame><ScreenNewMessageBW /></PhoneFrame>
        <PhoneFrame><ScreenAlertsBW /></PhoneFrame>
        <PhoneFrame><ScreenEventsBW /></PhoneFrame>
        <PhoneFrame><ScreenEventDetailBW /></PhoneFrame>
        <PhoneFrame><ScreenSpacesBW /></PhoneFrame>
        <PhoneFrame><ScreenMemberProfileBW /></PhoneFrame>
        <PhoneFrame><ScreenSayHelloBW /></PhoneFrame>
        <PhoneFrame><ScreenCommunityGuidelinesBW /></PhoneFrame>
        <PhoneFrame><ScreenAboutHKLBW /></PhoneFrame>
        <PhoneFrame><ScreenHeartalksBW /></PhoneFrame>
        <PhoneFrame><ScreenResourcesBW /></PhoneFrame>
      </PrototypeSection>
    </main>
  );
}
