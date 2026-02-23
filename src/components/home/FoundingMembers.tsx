import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";

type Member = {
  name: string;
  location: string;
  image: string;
};

const members: Member[] = [
  {
    name: "Mr. Amarpreet Singh",
    location: "USA",
    image:
      "/m2.webp",
  },
  {
    name: "Ms. Oya Erdogan",
    location: "Germany",
    image:
      "/m1.webp",
  },
  {
    name: "Mr. Bradley Field",
    location: "Australia",
    image:
      "/m3.webp",
  },
  {
    name: "Ms. Sara Harakat",
    location: "France",
    image:
      "/m5.webp",
  },

  {
    name: "Mr. Baptiste Antoine",
    location: "Luxembourg",
    image:
      "/m6.webp",
  },
  {
    name: "Dr. Anna Stewart Lbarra",
    location: "Panama",
    image:
      "/m7.webp",
  },

  {
    name: "Mr. Richard Good",
    location: "United Kingdom",
    image:
      "/m4.webp",
  },
];

export default function FoundingMembers() {
  return (
    <section className="flex flex-col items-center gap-10 font-hkl py-12 overflow-hidden z-10 w-full px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <span className="badge">Founding Members</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tighter font-bold">
          HKL Foundation Board Members
        </h2>
        <p className="text-lg text-primary-950/80 font-outfit md:mx-20">
          HKL is a registered non-profit organization (registered in US). The
          foundation is serviced by the following board members:
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 w-full max-w-7xl mx-auto">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 group items-start w-[calc(50%-6px)] sm:w-[calc(33.33%-8px)] md:w-60"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-primary-200">
              <Image
                src={member.image}
                alt={`${member.name} - HKL Founding Member`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 240px"
                className="object-cover"
              />
            </div>

            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col items-start w-full">
                <h3 className="text-base sm:text-lg font-hkl-centra font-semibold text-primary-950 transition-colors leading-tight">
                  {member.name}
                </h3>
                <p className="text-primary-800/60 font-outfit text-xs tracking-wide uppercase">
                  {member.location}
                </p>
              </div>
              <div className="p-2 bg-mint flex items-center justify-end rounded-full mr-2 cursor-pointer" aria-hidden="true">
                <RxArrowTopRight className="text-dark-forest text-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
