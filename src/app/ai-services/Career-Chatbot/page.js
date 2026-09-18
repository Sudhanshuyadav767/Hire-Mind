"use client";
import Header from "@/app/component/common/Header"
  import Footer from "@/app/component/common/Footer"
import Image from "next/image";
import { Clock3, Users, Folder } from "lucide-react";
import CareerChat from "@/app/component/Chatbot/Left";
import CareerPage from "@/app/component/Chatbot/Right";
export default function CareerChatbot() {
  return (
<>
<Header />
    <section className="w-full bg-[#f1f1ff]  rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 md:px-12 pt-7">

        {/* Left Content */}
        <div className="max-w-3xl">
          <h1 className="sm:text-3xl text-xl  font-bold text-gray-900">
            AI Career Chatbot
          </h1>

          <h2 className="mt-2 text-lg md:text-xl font-semibold text-indigo-500">
            Your Smart Career Assistant, Anytime, Anywhere.
          </h2>

          <p className="mt-2 text-gray-600 text-sm md:text-base max-w-2xl">
            Get instant answers to your career questions, explore options,
            and make confident decisions with AI-powered guidance.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-8 md:gap-14 mt-10 pb-7">

            <Feature
              icon={<Clock3 />}
              title="Instant Answers"
              text="Get quick and reliable career advice."
            />

            <Feature
              icon={<Users />}
              title="Personalized Guidance"
              text="Tailored suggestions based on your goals."
            />

            <Feature
              icon={<Folder />}
              title="24/7 Support"
              text="Your career questions are always answered."
            />

          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:block self-end">
          <Image
            src="/Images/Girl.png"
            alt=""
            width={330}
            height={330}
            className="object-contain"
          />
        </div>

      </div>
    </section>
    <div className="flex flex-col lg:flex-row  mt-4 gap-4 px-2 sm:px-4 items-stretch mb-4">
        <div className="w-full lg:flex-1 min-w-0"><CareerChat /> </div>
        <div className="w-full lg:w-[400px] lg:shrink-0"><CareerPage /></div>
    </div>
    <Footer />
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 max-w-[210px]">
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-gray-800 text-sm md:text-base">
          {title}
        </h3>

        <p className="text-xs md:text-sm text-gray-500 mt-1">
          {text}
        </p>
      </div>
    </div>


  );
}