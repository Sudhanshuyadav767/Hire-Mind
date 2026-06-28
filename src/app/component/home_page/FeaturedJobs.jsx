import Image from "next/image";
import {
  Bookmark,
  MapPin,
  Clock3,
  ArrowRight,
  IndianRupee,
} from "lucide-react";

const jobs = [
  {
    title: "Frontend Development",
    company: "Google LLC",
    type: "Full Time",
    mode: "Remote",
    level: "Mid-Level",
    salary: "₹15L - ₹20L",
    posted: "5h ago",
    logo: "/logo/google.png",
  },
  {
    title: "Backend Engineer",
    company: "Microsoft",
    type: "Full Time",
    mode: "Hybrid",
    level: "Senior-Level",
    salary: "₹25L - ₹35L",
    posted: "8h ago",
    logo: "/logo/microsoft.png",
  },
  {
    title: "UI/UX Designer",
    company: "Amazon",
    type: "Contract",
    mode: "On-Site",
    level: "Entry-Level",
    salary: "₹8L - ₹12L",
    posted: "1d ago",
    logo: "/logo/social.png",
  },
  {
    title: "Product Manager",
    company: "Netflix",
    type: "Full Time",
    mode: "Remote",
    level: "Director",
    salary: "₹40L - ₹55L",
    posted: "2d ago",
    logo: "/logo/netflix.png",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-poppins font-medium text-[#1D1B20]">Featured Jobs</h2>
        <button className="flex items-center gap-2 text-[#433FE3] font-semibold hover:gap-3 transition-all">
          View All Jobs
          <ArrowRight size={18} />
        </button>
      </div>
      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border border-[#E6E6E6] rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Top */}
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                {/* Company Logo */}
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={44}
                  height={44}
                  className="rounded-full object-contain border border-gray-100"
                />
                <div>
                  <h3 className="text-lg font-poppins font-medium text-[#1D1B20] leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-poppins font-medium">{job.company}</p>
                </div>
              </div>
              <Bookmark
                size={20}
                className="text-gray-400 hover:text-[#433FE3] cursor-pointer"
              />
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-4 flex-wrap font-poppins font-medium">
              <span className="px-3 py-1 rounded-full bg-[#EAFBF3] text-[#1A9D63] text-xs">
                {job.type}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F3ECFF] text-[#5E42F3] text-xs">
                {job.mode}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#EEF4FF] text-[#3B6CFF] text-xs">
                {job.level}
              </span>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-5 text-[12px] text-[#7A7A7A] pt-4 border-t border-gray-100 font-poppins font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{job.mode === "Remote" ? "Remote" : "On-Site/Hybrid"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock3 size={16} />
                <span>{job.posted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}