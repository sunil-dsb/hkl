import Image from "next/image";
import {
  GoArrowRight,
  GoCheckCircleFill,
} from "react-icons/go";
import { RxArrowTopRight } from "react-icons/rx";

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-12 space-y-16">
      {/* Header & Identity */}
      <section className="border-b border-primary-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-hkl-centra text-black tracking-tight">
            HKL Design System
          </h1>
          <p className="text-lg font-outfit font-light text-gray-500 max-w-2xl">
            <span className="bg-mint text-primary-900 px-2 py-1 leading-relaxed decoration-clone rounded-lg">
              Information about the Color Palettes, Typography, Logo and Design Principles.
            </span>
          </p>
        </div>

        {/* Identity / Logos */}
        <div className="grid grid-cols-4 gap-4">
          <div className="w-24 h-20 rounded-xl flex items-center justify-center border border-gray-200 p-2">
            <Image src="/logo.png" alt="HKL Main" width={80} height={80} className="w-full h-auto object-contain" />
          </div>
          <div className="w-20 h-20 rounded-xl flex items-center justify-center border border-gray-200 p-2">
            <Image src="/logo-1.png" alt="HKL Variant 1" width={80} height={80} className="w-full h-auto object-contain" />
          </div>
          <div className="w-20 h-20 rounded-xl flex items-center justify-center border border-gray-200 p-2">
            <Image src="/logo-2.png" alt="HKL Variant 2" width={80} height={80} className="w-full h-auto object-contain" />
          </div>
          <div className="w-20 h-20 rounded-xl flex items-center justify-center border border-gray-200 p-2">
            <Image src="/logo-3.png" alt="HKL Variant 3" width={80} height={80} className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-primary-100 bg-primary-100/30 p-8 rounded-2xl">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-hkl-centra text-primary-950">HKL website idea:</h3>
            <p className="font-outfit text-primary-800 leading-relaxed text-lg">
              HKL will be designed as an <strong>immersive, experience-led digital platform</strong> that combines emotional storytelling with simple tools to support a daily habit practice. The visual language should feel warm, cinematic, and inviting creating a meaningful emotional connection.
            </p>
          </div>
          <div className="flex justify-center justify-center bg-olive p-2 rounded-xl">
            <Image
              src="/mind.png"
              alt="Mind illustration"
              width={200}
              height={200}
              className="w-auto h-auto object-contain opacity-90 hover:scale-105 transition-transform duration-500 "
            />
          </div>
        </div>
      </section>

      {/* FLOW COMPARISON */}
      <section className="space-y-12">
        <div className="space-y-10">
          {/* Old Flow */}
          <div className="space-y-4 opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
            <h3 className="font-outfit text-xl font-medium text-gray-700 flex items-center gap-3">
              Old HKL Website flow:
            </h3>
            <div className="flex flex-wrap items-center gap-3 p-6 border border-gray-200 rounded-2xl bg-gray-50/50">
              {[
                "Announcement",
                "Navbar",
                "Hero Page",
                "Image Carousel",
                "Thoughts",
                "Global Map + Flags",
                "What is HKL",
                "We Lost Our Way",
                "HKL Movement",
                "The HKL Way",
                "Stories of Impact",
                "Thought Cards",
                "Event Recap",
                "Founders",
                "FAQs",
                "Footer",
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center gap-3">
                  <p className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                    {step}
                  </p>
                  {i < arr.length - 1 && (
                    <GoArrowRight className="text-gray-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* New Flow */}
          <div className="space-y-4">
            <h3 className="font-hkl-centra text-2xl text-primary-950 flex items-center gap-3">
              New HKL Landing Page flow:
            </h3>
            <div className="flex flex-wrap items-center gap-3 p-6 border border-gray-200 rounded-2xl bg-mint relative">
              <div className="absolute -top-3 right-4 bg-white px-2 py-1 rounded-full border border-mint/20 flex items-center gap-1.5 shadow-sm">
                <GoCheckCircleFill className="text-olive text-sm" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-primary-950">we will Implemente</span>
              </div>

              {[
                { name: "Loader Screen", status: 'pending' },
                { name: "Announcement", status: 'done' },
                { name: "Navbar (Sticky)", status: 'done' },
                { name: "Hero Page (Video)", status: 'done' },
                { name: "Daily Practice Section", status: 'pending' },
                { name: "Transformation Section (Clarity Visual)", status: 'done' },
                { name: "Why HKL Exists (We Lost Our Way)", status: 'pending' },
                { name: "What is HKL", status: 'done' },
                { name: "HKL Movement", status: 'pending' },
                { name: "Global Map + Flags", status: 'pending' },
                { name: "Stories of Impact", status: 'done' },
                { name: "The HKL Way", status: 'pending' },
                { name: "Thought Cards", status: 'done' },
                { name: "Event Recap", status: 'pending' },
                { name: "Founders", status: 'done' },
                { name: "FAQs", status: 'done' },
                { name: "Footer", status: 'done' },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-outfit whitespace-nowrap ${step.status === 'done' ? 'text-primary-950 font-medium' : 'text-gray-600 font-light'}`}>
                      {step.name}
                    </p>
                    {step.status === 'done' && <GoCheckCircleFill className="text-olive text-xs" />}
                  </div>

                  {i < arr.length - 1 && (
                    <GoArrowRight className="text-sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PALETTE SECTION */}
      <section className="space-y-12">
        <h2 className="text-sm font-medium uppercase text-primary-600 font-hkl-centra">
          Color Palettes
        </h2>

        {/* 1. ORIGINAL */}
        <div className="space-y-4">
          <h3 className="text-xl font-hkl-centra">
            1. Old Website (Reference)
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-10 gap-2 pt-2">
            <ColorSwatch
              color="#faf3eb"
              label="Cream"
              textColor="black"
              border
            />
            <ColorSwatch color="#000000" label="Black" textColor="white" />
            <ColorSwatch color="#1a3c34" label="Deep Green" textColor="white" />
            <ColorSwatch color="#d97757" label="Terracotta" textColor="white" />
            <ColorSwatch color="#9bc2b8" label="Green 300" textColor="white" />
            <ColorSwatch
              color="#FFFDF3"
              label="Light Cream"
              textColor="black"
              border
            />
            <ColorSwatch color="#ED868B" label="Pink" textColor="black" />
            <ColorSwatch color="#FFCE6E" label="Yellow" textColor="black" />
            <ColorSwatch color="#EAF0DD" label="Mint" textColor="black" />
            <ColorSwatch color="#174548" label="Teal" textColor="white" />
          </div>
        </div>

        {/* 2. Our Recommendation */}
        <div className="space-y-4">
          <h3 className="text-xl font-hkl-centra flex items-center gap-2">
            2. Our Recommendation{" "}
            <span className="inline-block px-3 py-1 text-xs font-medium bg-mint text-black rounded-full mb-2">
              new website
            </span>
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <ColorSwatch
              color="var(--color-mint)"
              label="Mint"
              textColor="black"
              hex="#EAF0DD"
            />
            <ColorSwatch
              color="var(--color-olive)"
              label="Olive"
              textColor="white"
              hex="#586C48"
            />
            <ColorSwatch
              color="var(--color-dark-forest)"
              label="Dark Forest"
              textColor="white"
              hex="#1A3C34"
            />
            <ColorSwatch
              color="var(--color-joy-gold)"
              label="Joy Gold"
              textColor="black"
              hex="#FBBF24"
            />
            <ColorSwatch
              color="var(--color-deep-green)"
              label="Deep Green 15"
              textColor="white"
              hex="#151515"
            />
            <ColorSwatch
              color="var(--color-rich-black)"
              label="Rich Black"
              textColor="white"
              hex="#0A0A0A"
            />
          </div>
          {/* Primary Scale */}
          <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-2">
            <ColorSwatch
              color="var(--color-primary-50)"
              label="50"
              textColor="black"
              border
              hex="#fcfdfd"
            />
            <ColorSwatch
              color="var(--color-primary-100)"
              label="100"
              textColor="black"
              border
              hex="#f3f2eb"
            />
            <ColorSwatch
              color="var(--color-primary-200)"
              label="200"
              textColor="black"
              border
              hex="#e8e6d9"
            />
            <ColorSwatch
              color="var(--color-primary-300)"
              label="300"
              textColor="black"
              border
              hex="#dcd9c9"
            />
            <ColorSwatch
              color="var(--color-primary-400)"
              label="400"
              textColor="black"
              hex="#c5c1af"
            />
            <ColorSwatch
              color="var(--color-primary-500)"
              label="500"
              textColor="white"
              hex="#a9a593"
            />
            <ColorSwatch
              color="var(--color-primary-600)"
              label="600"
              textColor="white"
              hex="#8c8976"
            />
            <ColorSwatch
              color="var(--color-primary-700)"
              label="700"
              textColor="white"
              hex="#6f6c5b"
            />
            <ColorSwatch
              color="var(--color-primary-800)"
              label="800"
              textColor="white"
              hex="#545244"
            />
            <ColorSwatch
              color="var(--color-primary-900)"
              label="900"
              textColor="white"
              hex="#3b392f"
            />
            <ColorSwatch
              color="var(--color-primary-950)"
              label="950"
              textColor="white"
              hex="#26251e"
            />
          </div>
        </div>

        {/* Gradients (Moved here) */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-hkl-centra">Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-outfit text-sm text-gray-500">Warm Sunset (About)</h4>
              <div className="h-32 w-full rounded-2xl border border-gray-100 p-4 flex flex-col justify-end" style={{ background: 'linear-gradient(180deg, #ffddadff, #ffedc6d1 52%, #FCFDFD)' }}>
                <p className="text-[10px] font-mono text-gray-400 bg-white/50 backdrop-blur-sm p-1 rounded w-fit">linear-gradient(180deg, #ffddadff, ...)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-outfit text-sm text-gray-500">Dark Overlay (Hero)</h4>
              <div className="h-32 w-full rounded-2xl bg-dark-forest relative overflow-hidden p-4 flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                <p className="relative z-10 text-[10px] font-mono text-white/50 bg-black/20 backdrop-blur-sm p-1 rounded w-fit">bg-gradient-to-t from-black/40 ...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TYPOGRAPHY SHOWCASE */}
      <section className="space-y-12 border-t border-gray-100 pt-12">
        <h2 className="text-sm font-medium uppercase text-primary-600 font-hkl-centra">
          TYPOGRAPHY SYSTEM
        </h2>

        {/* 1. Primary Fonts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Font 1: HKL (Main Brand) */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col justify-between min-h-[100px] relative overflow-hidden group hover:border-mint transition-colors duration-300">
            <div className="space-y-4 relative z-10">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white text-primary-800 rounded-full border border-gray-100 mb-2">
                Primary / Brand
              </span>
              <h3 className="text-4xl font-hkl text-black">HKL Serif</h3>
              <p className="font-outfit text-gray-500 leading-relaxed max-w-sm">
                Our primary voice. Emotional, human, and cinematic. Used for key headlines and brand moments.
              </p>
            </div>
          </div>

          {/* Font 2: HKL Centra */}
          <div className="bg-primary-900 rounded-2xl p-8 border border-primary-900 flex flex-col justify-between min-h-[100px] relative overflow-hidden text-white group hover:border-mint transition-colors duration-300">
            <div className="space-y-4 relative z-10">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-mint rounded-full mb-2 border border-white/5">
                Secondary / Display
              </span>
              <h3 className="text-4xl font-hkl-centra">HKL Centra</h3>
              <p className="font-outfit text-white/60 leading-relaxed max-w-sm">
                Geometric and grounded. Used for subheadings, UI elements, and technical displays to provide contrast.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Display Card (Black Card) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] text-[#FDFBF7] p-8 md:p-16">
          <div className="relative z-10 space-y-6">
            <span className="inline-block px-3 py-1 rounded-full border border-gray-700 text-xs tracking-wider uppercase">
              Brand Voice
            </span>
            <h3 className="text-6xl md:text-8xl font-hkl leading-[0.9]">
              Humility
              <br />
              Kindness
              <br />
              Love.
            </h3>
            <p className="max-w-md text-gray-400 font-outfit text-lg">
              Our voice is calm, cinematic, and profoundly human.
            </p>
          </div>

          <div className="absolute -bottom-20 -right-20 text-[300px] font-hkl text-white opacity-5 pointer-events-none">
            Aa
          </div>
        </div>

      </section>

      {/* HEADING HIERARCHY */}
      <section className="space-y-12">
        <h2 className="text-sm font-medium uppercase text-primary-600 font-hkl-centra">
          Heading Hierarchy
        </h2>
        <div className="bg-gray-100 p-8 md:p-16 rounded-3xl text-black space-y-8">

          {/* H1 (Hero Scale) */}
          <div className="space-y-4 border-b border-gray-300 pb-8">
            <h1 className="text-5xl md:text-7xl font-hkl tracking-tight leading-[1.1]">
              Heading H1
            </h1>
            <p className="font-mono text-xs text-gray-400">
              font-hkl text-5xl md:text-7xl
            </p>
          </div>

          {/* H2 (Section Title Scale) */}
          <div className="space-y-4 border-b border-gray-300 pb-8">
            <h2 className="text-3xl md:text-5xl font-hkl tracking-tight leading-tight">
              Heading H2
            </h2>
            <p className="font-mono text-xs text-gray-400">
              font-hkl text-3xl md:text-5xl (Timeline)
            </p>
          </div>

          {/* H3 (Card Title Scale) */}
          <div className="space-y-3 border-b border-gray-300 pb-6">
            <h3 className="text-2xl md:text-3xl font-hkl leading-snug">
              Heading H3
            </h3>
            <p className="font-mono text-xs text-gray-400">
              font-hkl text-2xl md:text-3xl (About Cards)
            </p>
          </div>

          {/* H4 */}
          <div className="space-y-2 border-b border-gray-300 pb-6">
            <h4 className="text-xl md:text-2xl font-hkl">
              Heading H4
            </h4>
            <p className="font-mono text-xs text-gray-400">
              font-hkl text-xl md:text-2xl
            </p>
          </div>

          {/* H5 */}
          <div className="space-y-2 border-b border-gray-300 pb-6">
            <h5 className="text-lg font-hkl font-medium">
              Heading H5
            </h5>
            <p className="font-mono text-xs text-gray-400">
              font-hkl text-lg font-medium
            </p>
          </div>

          {/* Body Text Example */}
          <div className="space-y-4 pt-4 max-w-3xl">
            <p className="font-outfit text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              varius enim in eros elementum tristique. Duis cursus, <span className="underline decoration-1 underline-offset-2">all links in
                the website</span>, eros dolor interdum nulla, ut commodo diam libero vitae
              erat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
          </div>

        </div>
      </section >

      {/* BUTTONS / INTERACTION */}
      < section className="space-y-12 border-t border-gray-100 pt-12" >
        {/* Buttons */}
        < div className="space-y-8" >
          <h2 className="text-sm font-medium uppercase text-primary-600 font-hkl-centra">Components / Buttons & Badges</h2>
          <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-10 rounded-2xl border border-gray-100 gap-y-4">
            <button className="px-4 py-3 md:py-3 cursor-pointer leading-none inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap bg-primary-950 text-primary-50 rounded-full hover:bg-primary-900 focus-visible:ring-primary-950 active:scale-95 text-base">
              Get in touch
            </button>
            <button className="gap-3 px-4 py-3 md:py-3 cursor-pointer leading-none inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap bg-primary-950 text-primary-50 rounded-full hover:bg-primary-900 focus-visible:ring-primary-950 active:scale-95 text-base">
              Begin Practice <GoArrowRight className="text-lg" />
            </button>
            <button className="uppercase gap-3 px-4 py-2 md:py-2 cursor-pointer leading-none inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap text-olive hover:text-white rounded-full hover:bg-olive focus-visible:ring-primary-950 active:scale-95 text-base border border-olive">
              I want to know more
              <span className="bg-olive text-white p-1 rounded-full">
                <GoArrowRight className="text-md" />
              </span>
            </button>
            <div className="h-8 w-px bg-gray-300 hidden md:block mx-4"></div>
            <span className="badge">Default</span>
            <span className="badge bg-mint text-black">Workflows</span>
            <span className="badge bg-olive text-white">Active</span>
            <div className="h-8 w-px bg-gray-300 hidden md:block mx-4"></div>

            {/* 3. Icon Only */}
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center border border-primary-950 text-white rounded-full bg-primary-900">
                <GoArrowRight className="text-xl" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-olive bg-olive text-white rounded-full">
                <GoArrowRight className="text-xl" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-olive text-olive rounded-full">
                <GoArrowRight className="text-xl" />
              </button>
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-sm animated-underline">
                This is Hover links effect
              </a>
              <a href="#" className="text-sm animated-underline">
                About Us
              </a>
            </div>
          </div>
        </div >
      </section >

      {/* SPACING SYSTEM */}
      < section className="space-y-12 border-t border-gray-100 pt-12" >
        <h2 className="text-sm font-medium uppercase text-primary-600 font-hkl-centra">
          Spacing System & Footer Assets idea
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-hkl text-primary-950">Scale & Rhythm</h3>
              <p className="font-outfit text-gray-600 leading-relaxed">
                We consistently use a <strong>4px base unit</strong> (Tailwind defaults) for padding, margins, and sizing. This creates a predictable vertical rhythm and horizontal alignment.
              </p>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
              <h5 className="font-hkl-centra text-sm text-primary-800 uppercase tracking-widest">Common Values</h5>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm font-mono text-gray-500 border-b border-blue-200/50 pb-2">
                  <span>px-4</span>
                  <span>16px</span>
                </li>
                <li className="flex items-center justify-between text-sm font-mono text-gray-500 border-b border-blue-200/50 pb-2">
                  <span>px-6</span>
                  <span>24px</span>
                </li>
                <li className="flex items-center justify-between text-sm font-mono text-gray-500 border-b border-blue-200/50 pb-2">
                  <span>px-8</span>
                  <span>32px</span>
                </li>
                <li className="flex items-center justify-between text-sm font-mono text-gray-500 border-b border-blue-200/50 pb-2">
                  <span>py-16</span>
                  <span>64px</span>
                </li>
                <li className="flex items-center justify-between text-sm font-mono text-gray-500 border-b border-blue-200/50 pb-2">
                  <span>py-20</span>
                  <span>80px</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[1, 3, 4, 5, 7, 2].map((num) => (
              <div key={num} className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group hover:border-mint transition-colors duration-300">
                <Image
                  src={`/${num}.svg`}
                  alt={`Visual ${num}`}
                  fill
                  className="object-cover p-1 scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="border-t border-gray-100 pt-12 pb-4">
        <div className="bg-blue-50 rounded-xl p-6 border border-primary-100">
          <p className="text-sm text-primary-800 font-outfit leading-relaxed">
            <span className="font-bold uppercase tracking-wider text-xs block mb-2 text-primary-950">
              Note on Development
            </span>
            This style guide serves as the primary visual reference for the HKL
            digital experience. However, during the development process, we
            reserve the right to refine and adjust these styles to ensure the
            highest quality implementation. Our ultimate goal is to achieve the
            perfect balance of aesthetics and functionality, which may require
            subtle deviations from this static guide.
          </p>
        </div>
      </section>
    </div >
  );
}

function ColorSwatch({
  color,
  label,
  textColor,
  border,
  hex,
}: {
  color: string;
  label: string;
  textColor: string;
  border?: boolean;
  hex?: string;
}) {
  return (
    <div
      className={`h-24 rounded-lg p-3 flex flex-col justify-end ${border ? "border border-gray-200 shadow-sm" : ""}`}
      style={{ backgroundColor: color }}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-wider opacity-90"
        style={{ color: textColor }}
      >
        {label}
      </span>
      <span
        className="text-[8px] opacity-70 font-mono"
        style={{ color: textColor }}
      >
        {hex || (color.startsWith("var") ? "" : color)}
      </span>
    </div>
  );
}

