import { Users } from "lucide-react";

const team = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  name: "Aman Singh",
  role: "CEO & Co-Founder"
}));

export default function AboutTeam() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 space-y-6 text-center pb-12">
      <div className="space-y-1.5 select-none">
        <h2 className="text-lg sm:text-2xl font-poppins font-semibold text-[#1E2229]">Meet Our team</h2>
        <p className="text-[10px] sm:text-sm font-poppins font-medium text-[#5E637D] max-w-2xl mx-auto">
          Passionate professionals working together to revolutionize the future of hiring and career growth.
        </p>
      </div>

      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4">
        {team.map((member) => (
          <div 
            key={member.id}
            className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-5 flex flex-col items-center justify-between gap-4 text-center shadow-3xs hover:shadow-xs hover:-translate-y-1 transition duration-150 shrink-0 min-w-[160px] md:min-w-0 snap-start"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-150 overflow-hidden shadow-2xs select-none">
              <Users size={28} className="text-slate-500 stroke-[1.2]" />
            </div>

            <div className="space-y-0.5">
              <h4 className="text-xs font-poppins font-bold text-[#1E2229]">
                {member.name}
              </h4>
              <p className="text-[10px] font-poppins font-semibold text-[#5E637D]">
                {member.role}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 select-none">
              <button className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-[#2D24D0] hover:text-white transition cursor-pointer">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </button>
              <button className="w-6 h-6 rounded-full bg-slate-50 text-[#101014] border border-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button className="w-6 h-6 rounded-full bg-sky-50 text-sky-500 border border-sky-100 flex items-center justify-center hover:bg-sky-500 hover:text-white transition cursor-pointer">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
