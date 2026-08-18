import { ArrowRight, ChevronRight, CircleUserRound } from "lucide-react";

const mentors = [
  { name: "Aman Singh", rating: 5 },
  { name: "Mara F.", rating: 5 },
  { name: "Aman Singh", rating: 4 },
  { name: "Mara F.", rating: 5 },
];

function Mentor({ name, rating }) {
  return (
    <div className="flex items-center gap-2 rounded-lg p-1 transition-colors duration-200 hover:bg-[#f1f0ff]">
      <CircleUserRound size={51} fill="#050505" />

      <div>
        <div className="whitespace-nowrap text-[21px] text-[#ffb100]">
          {"\u2605".repeat(rating)}
        </div>
        <b className="whitespace-nowrap text-base">{name}</b>
      </div>
    </div>
  );
}

export default function CommunityMentors() {
  return (
    <section className="rounded-[5px] border-2 border-[#d1d1d1] bg-white p-3.5 shadow-[0_1px_3px_#d0d0d0] lg:mt-3">
      <h2 className="mb-4 text-[21px] font-semibold">
        Live Community &amp; Mentor Insights
      </h2>

      <div className="relative rounded-[10px] border border-[#ddd] p-[14px_18px] text-base shadow-[0_2px_6px_#ddd] transition-all duration-300 hover:border-[#9a94ff] hover:shadow-[0_7px_16px_rgba(67,59,226,0.16)]">
        <b>Top Learner Insights on Python</b>
        <ChevronRight size={20} className="absolute right-3 top-3 text-[#999]" />

        <p className="my-[26px] text-[15px] leading-[21px]">
          Python is widely recognized by learners as the most accessible entry
          point into programming due to its readable, English-like syntax and
          vast library ecosystem.......
        </p>

        <a className="flex items-center text-[#888]">
          Show others
          <ChevronRight size={16} />
        </a>
      </div>

      <div className="my-3 flex items-center justify-between">
        <h2 className="m-0 text-[21px] font-semibold">Book Mentor Session</h2>
        <a className="flex items-center gap-2 text-[#4139e7]">
          View All
          <ArrowRight />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-[10px] border border-[#ddd] p-[15px_9px] transition-shadow duration-300 hover:shadow-[0_7px_16px_rgba(67,59,226,0.12)]">
        {mentors.map((mentor, index) => (
          <Mentor {...mentor} key={`${mentor.name}-${index}`} />
        ))}
      </div>
    </section>
  );
}
