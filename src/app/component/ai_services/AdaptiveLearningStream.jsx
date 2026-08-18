import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles, Star } from "lucide-react";

const courses = [
  {
    title: "Python for Data Science",
    provider: "Coursera",
    image: "/Images/Python.png",
    imageClass: "bg-[linear-gradient(120deg,#2d2524,#c18e4d_46%,#090e11)]",
    label: "PYTHON\nPROGRAMMING",
  },
  {
    title: "Machine Learning",
    provider: "Coursera",
    image: "/Images/Python.png",
    imageClass: "bg-[linear-gradient(130deg,#0f5cae,#053174_65%,#0d80c9)]",
    label: "WHAT IS\nMACHINE LEARNING?",
  },
  {
    title: "Python for Data Science",
    provider: "Udemy",
    image: "/Images/Python.png",
    imageClass: "bg-[linear-gradient(130deg,#020b20,#003777_60%,#08142a)]",
    label: "COMPUTER\nAI",
  },
];

function CourseCard({ course, isPriorityImage }) {
  return (
    <article className="overflow-hidden rounded-[15px] border border-[#ddd] bg-white shadow-[0_3px_4px_#bbb] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#8b85ff] hover:shadow-[0_12px_24px_rgba(67,59,226,0.22)]">
      <div
        className={`relative flex h-[199px] flex-col justify-between p-3 text-[25px] font-semibold whitespace-pre-line text-white ${course.imageClass}`}
      >
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            priority={isPriorityImage}
            sizes="(max-width: 760px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <>
            <span>{course.label}</span>
            <small className="text-[10px] opacity-70">IMAGE PLACEHOLDER</small>
          </>
        )}
      </div>

      <div className="p-3">
        <h3 className="mb-1.5 text-base font-semibold">{course.title}</h3>
        <p className="text-[15px] leading-5 text-[#6e6e76]">{course.provider}</p>

        <div className="my-[22px] flex justify-between text-base text-[#898991]">
          <span>Beginner</span>
          <span className="flex gap-1">
            <Clock3 size={17} />
            24 hours
          </span>
        </div>

        <div className="mb-3 flex items-center gap-1 text-[15px] text-[#888]">
          <Star size={20} fill="currentColor" className="text-[#ffb400]" />
          <b className="text-[#222]">4.8</b>
          <span>(12.4K)</span>
        </div>

        <button
          type="button"
          className="h-[49px] w-full rounded-[9px] bg-[#433be2] text-white shadow-[0_2px_4px_#aaa] transition-colors duration-200 hover:bg-[#3129c8]"
        >
          Start Learning
        </button>
      </div>
    </article>
  );
}

export default function AdaptiveLearningStream() {
  return (
    <section className="rounded-[5px] border-2 border-[#d1d1d1] bg-white p-3.5 shadow-[0_1px_3px_#d0d0d0]">
      <div className="mb-[22px] flex items-center justify-between gap-3 px-1">
        <h2 className="text-[21px] font-semibold tracking-tight sm:text-[25px]">
          Your Adaptive Learning Stream
          <Sparkles className="ml-1 inline text-[#6645f1]" />
        </h2>
        <Link href="/ai-services/courses" className="hidden items-center gap-2 whitespace-nowrap text-base text-[#4139e7] sm:flex">
          View All Courses
          <ArrowRight />
        </Link>
      </div>

      <div className="mobile-card-swipe grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, index) => (
          <CourseCard
            course={course}
            isPriorityImage={index === 0}
            key={`${course.title}-${course.provider}`}
          />
        ))}
      </div>
    </section>
  );
}
