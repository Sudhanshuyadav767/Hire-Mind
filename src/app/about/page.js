
import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import Image from "next/image";
import { statsData, teamData } from "@/Data/data";
import {
  Goal,
  Eye,
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden bg-[#F6F4FF]">
          {/* Background Decorations */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#4438df]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid items-center gap-14 lg:grid-cols-2">

              {/* Left Content */}
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4438df]/20 bg-white px-4 py-2 text-sm font-semibold text-[#4438df] shadow-sm">
                  <Sparkles size={16} />
                  About HireMind AI
                </div>

                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Empowering Careers.
                  <br />
                  Building{" "}
                  <span className="text-[#4438df]">
                    Futures.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                  At HireMind AI, we believe every talent deserves the right
                  opportunity. Our AI-powered platform connects job seekers
                  with employers, provides smart career guidance, and helps
                  people grow at every step of their professional journey.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="group flex items-center gap-2 rounded-xl bg-[#4438df] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#4438df]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#372fc5] hover:shadow-xl">
                    Join Our Mission
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>

                  <button className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:border-[#4438df]/30 hover:bg-[#f8f7ff] hover:text-[#4438df]">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#4438df]/20 to-blue-400/10 blur-2xl" />

                <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white p-2 shadow-2xl">
                  <Image
                    src="/Images/about.jpeg"
                    alt="HireMind AI team"
                    width={600}
                    height={400}
                    className="h-[320px] w-full rounded-2xl object-cover sm:h-[400px]"
                  />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:block">
                  <p className="text-xs font-medium text-gray-500">
                    Our Focus
                  </p>
                  <p className="mt-1 font-bold text-gray-900">
                    People × Technology
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4438df]/20 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F0FF] text-[#4438df] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#4438df] group-hover:text-white">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
                    {item.number}
                  </h2>

                  <h3 className="mt-1 font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= MISSION & VISION ================= */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#4438df]">
                What Drives Us
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission & Vision
              </h2>

              <p className="mt-4 text-gray-500">
                We are building technology that makes career growth more
                accessible, intelligent, and human.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              {/* Mission */}
              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F3F0FF] text-[#4438df] transition-all duration-300 group-hover:bg-[#4438df] group-hover:text-white">
                    <Goal size={30} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#4438df]">
                      Our Mission
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      Turning Potential Into Opportunity
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
                      To empower individuals to achieve their career goals
                      by connecting them with the right opportunities,
                      leveraging AI technology, and providing expert career
                      guidance at every stage of their journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                    <Eye size={30} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                      Our Vision
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      A Smarter Future for Careers
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
                      To become a trusted career platform that transforms
                      the way people discover opportunities, develop their
                      skills, and build meaningful careers.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#4438df]">
              The People Behind HireMind AI
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>

            <p className="mt-4 text-gray-500">
              Passionate professionals working together to build better
              career experiences through technology.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4438df]/20 hover:shadow-xl"
              >
                {/* Profile Image */}
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full ring-4 ring-[#F3F0FF]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#4438df]">
                  {member.role}
                </p>

                {/* Social Icons */}
               <div className="mt-5 flex justify-center gap-2">

  {/* LinkedIn */}
  <button
    className="flex h-9 w-9 items-center justify-center rounded-full
    bg-[#F3F0FF] text-sm font-bold text-[#4438df]
    transition-all duration-200
    hover:scale-105 hover:bg-[#4438df] hover:text-white"
  >
    in
  </button>

  {/* X / Twitter */}
  <button
    className="flex h-9 w-9 items-center justify-center rounded-full
    bg-gray-100 text-sm font-bold text-gray-700
    transition-all duration-200
    hover:scale-105 hover:bg-black hover:text-white"
  >
    X
  </button>

  {/* Email */}
  <button
    className="flex h-9 w-9 items-center justify-center rounded-full
    bg-blue-50 text-sm font-bold text-blue-600
    transition-all duration-200
    hover:scale-105 hover:bg-blue-600 hover:text-white"
  >
    @
  </button>

</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#4438df] px-6 py-14 text-center shadow-xl sm:px-12">

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Start Your Journey
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Ready to Build Your Future?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-white/80">
                Join HireMind AI and take the next step toward discovering
                better opportunities and growing your career.
              </p>

              <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#4438df] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

