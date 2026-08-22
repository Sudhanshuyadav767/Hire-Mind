import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"
import Link from 'next/link';
import { blog1 } from "@/Data/data";
import {popularposts1} from "@/Data/data";
import Image from "next/image";
import {CircleUserRound ,MessageCircle,ThumbsUp} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 

import { 
  faFacebookF, 
  faInstagram, 
  faXTwitter, 
  faLinkedinIn, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';

export default function Blog1(){
    return(
        <>
        <Header />
       <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

  <div className="flex flex-col lg:flex-row gap-8 items-start">

    {/* ================= MAIN BLOG ================= */}
    <main className="w-full lg:flex-1 min-w-0">

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        Future of work: key Trends
        <br className="hidden sm:block" />
        to watch in 2026
      </h1>

      <p className="mt-4 text-gray-600 text-sm sm:text-base leading-6 sm:leading-7">
        Explore the top workplace trends shaping the future,
        the skill you need, and how to stay ahead in a rapidly
        changing world.
      </p>


      {/* Author / Meta */}
      <div className="mt-6 border-b pb-4">

        {blog1.map((item) => (
          <div
            key={item.name}
            className="
              flex
              flex-col
              sm:flex-row
              sm:flex-wrap
              lg:flex-nowrap
              items-start
              sm:items-center
              gap-4
              text-sm
              text-gray-500
            "
          >

            {/* Author */}
            <div className="flex items-center gap-2 shrink-0">

              <CircleUserRound
                size={24}
                className="text-blue-600"
              />

              <span>
                {item.name}
                <br />
                {item.post}
              </span>

            </div>


            {/* Date */}
            <span className="shrink-0">
              📆 {item.date}
            </span>


            {/* Read */}
            <span className="shrink-0">
              🕒 {item.read}
            </span>


            {/* Views */}
            <span className="shrink-0">
              👁️ {item.view}
            </span>


            {/* Social */}
            <div className="w-full sm:w-auto lg:ml-auto">

              <h4 className="text-[#1E2229] font-bold text-sm mb-2">
                Share this article
              </h4>

              <div className="flex flex-wrap items-center gap-2">

                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-[#3B5998] text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="text-[13px]"
                  />
                </Link>

                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-[14px]"
                  />
                </Link>

                <Link
                  href="https://x.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-black text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    className="text-[13px]"
                  />
                </Link>

                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-[#0077B5] text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className="text-[13px]"
                  />
                </Link>

                <Link
                  href="https://telegram.org"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-[#0088cc] text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={faTelegram}
                    className="text-[14px]"
                  />
                </Link>

              </div>
            </div>

          </div>
        ))}

      </div>


      {/* Hero Image */}
      <div className="w-full mt-6 overflow-hidden rounded-xl">

        <Image
          src="/Images/blog1.jpeg"
          alt="Blog Image"
          width={1200}
          height={500}
          className="w-full h-[200px] sm:h-[280px] lg:h-[350px] object-cover rounded-xl"
        />

      </div>


      {/* Blog Content */}
      <article className="w-full space-y-8 mt-8">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Introduction
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            The world of work is evolving faster than ever. From
            AI-powered tools to remote-first workplaces, the future
            belongs to those who adapt, learn, and grow continuously.
            Here are the key trends shaping the future of work in 2026.
          </p>
        </div>


        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            1. Rise of Artificial Intelligence
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Artificial Intelligence is transforming industries by
            automating repetitive tasks, improving productivity, and
            creating new opportunities. Professionals who learn AI
            tools will have a competitive advantage in the job market.
          </p>
        </div>


        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            2. Remote and Hybrid Work Stay Strong
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Companies continue to embrace flexible work models.
            Remote and hybrid work arrangements allow employees to
            maintain better work-life balance while enabling businesses
            to access talent from around the world.
          </p>
        </div>


        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            3. In-Demand Skills Will Continue to Evolve
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Technical skills, communication, problem-solving, and
            adaptability are becoming increasingly important.
            Continuous learning is essential to stay relevant in a
            rapidly changing job market.
          </p>
        </div>


        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            4. Employee Well-Being Takes Center Stage
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Organizations are investing more in employee wellness,
            mental health support, and workplace culture. A healthy
            workforce leads to higher productivity and job satisfaction.
          </p>
        </div>


        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Conclusion
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            The future of work is full of opportunities. By staying
            curious, learning continuously, and embracing change, you
            can build a successful and future-ready career.
          </p>
        </div>

      </article>


      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">

        <button className="w-full border rounded-lg py-3 font-medium bg-[#1D4ED8] text-white">
          Find Job
        </button>

        <button className="w-full border rounded-lg py-3 font-medium hover:bg-blue-600 hover:text-white transition">
          Build Resume
        </button>

        <button className="w-full border rounded-lg py-3 font-medium hover:bg-blue-600 hover:text-white transition">
          Skill Assessment
        </button>

        <button className="w-full border rounded-lg py-3 font-medium hover:bg-blue-600 hover:text-white transition">
          Mock Interview
        </button>

      </div>

    </main>


    {/* ================= SIDEBAR ================= */}
    <aside className="w-full lg:w-72 shrink-0 space-y-6">

      {/* Table of Contents */}
      <div className="border rounded-xl p-4 sm:p-5">

        <h3 className="font-bold mb-4">
          Table of Contents
        </h3>

        <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
          <li>○ Introduction</li>
          <li>○ Rise of Artificial Intelligence</li>
          <li>○ Remote and Hybrid Work</li>
          <li>○ In-Demand Skills</li>
          <li>○ Employee Well-Being</li>
        </ul>

      </div>


      {/* Explore */}
      <div className="bg-[#F3F0FF] p-5 rounded-xl">

        <h2 className="font-bold">
          Explore More Career Insights & Tips
        </h2>

        <p className="text-gray-600 mt-2">
          Discover expert advice to boost your career growth
        </p>

        <button className="mt-4 bg-[#1D4ED8] text-white px-5 py-2 rounded-lg">
          Explore Blogs ➜
        </button>

      </div>


      {/* Author */}
      <div className="bg-[#F3F0FF] p-5 rounded-xl">

        <h2 className="text-xl font-bold mb-5">
          About the Author
        </h2>

        <div className="flex items-center gap-3">

          <Image
            src="/Images/humanlogo.jpeg"
            alt="Author"
            width={60}
            height={60}
            className="rounded-full object-cover shrink-0"
          />

          <div className="min-w-0">
            <h3 className="font-semibold text-lg">
              Aman Singh
            </h3>

            <p className="text-sm text-gray-500">
              Flutter Developer
            </p>
          </div>

        </div>

        <p className="text-gray-600 text-sm leading-6 mt-4">
          Aman writes about career growth, technology, and the
          future of work. He loves helping job seekers build
          successful careers.
        </p>


        <div className="flex flex-wrap gap-2 mt-5">

          <Link
            href="https://facebook.com"
            target="_blank"
            className="w-7 h-7 bg-[#3B5998] rounded-full flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faFacebookF} className="text-white text-xs" />
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            className="w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-white text-xs" />
          </Link>

          <Link
            href="https://x.com"
            target="_blank"
            className="w-7 h-7 bg-black rounded-full flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faXTwitter} className="text-white text-xs" />
          </Link>

          <Link
            href="https://linkedin.com"
            target="_blank"
            className="w-7 h-7 bg-[#0077B5] rounded-full flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="text-white text-xs" />
          </Link>

          <Link
            href="https://telegram.org"
            target="_blank"
            className="w-7 h-7 bg-[#0088cc] rounded-full flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faTelegram} className="text-white text-xs" />
          </Link>

        </div>

      </div>


      {/* Related Blogs */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">

        <div className="flex justify-between items-center mb-4 gap-2">

          <h2 className="text-lg font-bold">
            Related Blogs
          </h2>

          <button className="text-blue-600 text-sm font-medium whitespace-nowrap">
            View All ➜
          </button>

        </div>


        <div className="space-y-4">

          {popularposts1.map((item) => (

            <div
              key={item.demandedskill}
              className="flex gap-3 border-b pb-3 last:border-none min-w-0"
            >

              <Image
                src={item.image}
                alt=""
                width={70}
                height={70}
                className="rounded-lg object-cover w-[70px] h-[70px] shrink-0"
              />

              <div className="min-w-0">

                <h3 className="text-sm font-semibold leading-5 hover:text-blue-600 cursor-pointer break-words">
                  {item.demandedskill}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.date}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* Newsletter */}
      <div className="bg-[#F3F0FF] rounded-xl p-5 shadow-sm">

        <h2 className="text-xl font-bold text-gray-600">
          Get Career Tips
          <br />
          Straight to Your Inbox
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Join thousands of job seekers receiving expert advice
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mt-5 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          className="w-full mt-4 py-3 rounded-lg text-white font-semibold transition bg-[#1D4ED8] hover:bg-indigo-700"
        >
          Subscribe
        </button>

      </div>

    </aside>

  </div>

</section>
        <Footer />
        </>

    )
}