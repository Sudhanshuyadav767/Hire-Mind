"use client";

import { ResponsiveRadar } from "@nivo/radar";
import { ArrowRight, Medal } from "lucide-react";
import Image from "next/image";

const skillData = [
  { skill: "NLP", score: 74 },
  { skill: "Deep Learning", score: 88 },
  { skill: "ML", score: 82 },
  { skill: "CV", score: 67 },
  { skill: "RL", score: 58 },
];

const radarTheme = {
  text: { fill: "#f8fbff", fontSize: 12 },
  grid: { line: { stroke: "#b7dcf6", strokeWidth: 1 } },
};

const statistics = [
  { value: "12", label: "Courses" },
  { value: "24", label: "Hours" },
  { value: "24", label: "Learns" },
  { value: "5", label: "Certificated" },
];

// API se data aane par `image` mein certificate URL set hoga.
const certificates = [
  { id: 1, title: "Python Fundamentals", image: "/avatars/Certificate.png" },
  { id: 2, title: "Machine Learning", image: "/avatars/Certificate.png" },
  { id: 3, title: "AI Core Skills", image: "/avatars/Certificate.png" },
];

function CertificateCard({ certificate }) {
  return (
    <div className="relative grid h-[85px] place-items-center rounded-[6px] border-2 border-[#ddd] text-[#444] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8178f5] hover:shadow-[0_5px_12px_rgba(67,59,226,0.18)]">
      {certificate.image ? (
        <Image
          src={certificate.image}
          alt={`${certificate.title} certificate`}
          fill
          sizes="(max-width: 760px) 33vw, 100px"
          className="rounded-[4px] object-cover"
        />
      ) : (
        <Medal size={51} />
      )}
    </div>
  );
}

export default function TalentProfile() {
  return (
    <section className="rounded-[5px] border-2 border-[#d1d1d1] bg-white p-[17px_15px] shadow-[0_1px_3px_#d0d0d0] transition-shadow duration-300 hover:shadow-[0_8px_18px_rgba(67,59,226,0.14)]">
      <div className="flex items-end justify-between gap-2">
        <h2 className="m-0 text-[19px] font-semibold">
          AI Talent Profile & Skill Depth
        </h2>
        <a className="flex items-center gap-2 whitespace-nowrap text-base text-[#4139e7]">
          View Dashboard
          <ArrowRight />
        </a>
      </div>

      <div
        aria-label="AI skill-depth radar chart"
        className="relative mx-auto my-[16px] h-[229px] w-[245px] overflow-hidden bg-[radial-gradient(circle,#2873ab,#0b1c45)] text-white"
      >
        <ResponsiveRadar
          data={skillData}
          keys={["score"]}
          indexBy="skill"
          maxValue={100}
          margin={{ top: 30, right: 44, bottom: 29, left: 44 }}
          curve="linearClosed"
          borderColor="#b8e3fb"
          gridShape="linear"
          gridLabelOffset={18}
          colors={["#8178f5"]}
          fillOpacity={0.42}
          borderWidth={2}
          dotSize={6}
          dotColor="#ffffff"
          dotBorderWidth={1}
          dotBorderColor="#7067e9"
          enableDotLabel={false}
          isInteractive
          theme={radarTheme}
        />

        <span className="pointer-events-none absolute left-[101px] top-[91px] grid h-11 w-11 place-items-center rounded-full border-[3px] border-[#88b77a] bg-[#b7dfa1] text-[28px] font-semibold text-[#407d53] shadow-[0_2px_6px_#071636]">
          {"\u2713"}
        </span>
        <em className="pointer-events-none absolute bottom-1 left-0 w-full text-center text-lg not-italic">
          Skill Matrix
        </em>
      </div>

      <div className="grid grid-cols-4 text-center">
        {statistics.map((statistic, index) => (
          <span
            className={`text-[15px] ${index < 3 ? "border-r border-[#ddd]" : ""}`}
            key={statistic.label}
          >
            <b className="mb-1 block text-base">{statistic.value}</b>
            {statistic.label}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <h2 className="my-1 text-[21px] font-semibold">My Certificates</h2>
        <a className="flex items-center gap-2 text-base text-[#4139e7]">
          View All
          <ArrowRight />
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {certificates.map((certificate) => (
          <CertificateCard certificate={certificate} key={certificate.id} />
        ))}
      </div>
    </section>
  );
}
