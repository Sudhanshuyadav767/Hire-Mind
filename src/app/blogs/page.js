
import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import { blogs, popularposts } from "@/Data/data";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Blogs() {
  return (
    <>
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#F3F0FF] py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold">
            Blogs & Career Insights
          </h1>

          <p className="mt-3 text-gray-600">
            Explore expert advice, career tips and industry trends and
            resources to
            <br />
            help you grow in your professional journey
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 flex max-w-2xl overflow-hidden rounded-lg border bg-white">
            <input
              type="text"
              placeholder="Search articles, topics or keywords"
              className="flex-1 px-4 py-3 outline-none"
            />

            <button className="bg-[#4438df] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#372fc5] hover:shadow-md active:scale-[0.98]">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* ================= LATEST ARTICLES ================= */}
          <div className="flex-1">
            <h2 className="mb-6 text-2xl font-bold">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Blog Image */}
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="h-52 w-full object-cover"
                  />

                  {/* Blog Content */}
                  <div className="flex flex-grow flex-col p-5">

                    {/* Date + Read Time */}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 line-clamp-3 flex-grow text-sm text-gray-600">
                      {blog.description}
                    </p>

                    {/* Author + Read More */}
                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <div>
                        <p className="text-sm font-medium">
                          {blog.author}
                        </p>

                        <p className="text-xs text-gray-500">
                          {blog.role}
                        </p>
                      </div>

                      <Link
                        href="/blog1"
                        className="text-sm font-medium text-[#4438df] transition-all duration-200 hover:translate-x-1 hover:text-[#3128b8]"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="w-full shrink-0 lg:w-72">

            {/* Categories */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">
                Categories
              </h3>

              <ul className="space-y-3">
                {[
                  "Career Tips",
                  "Interview Preparation",
                  "Resume Building",
                  "Remote Work",
                  "Industry Trends",
                ].map((category) => (
                  <li
                    key={category}
                    className="cursor-pointer text-gray-700 transition-colors duration-200 hover:text-[#4438df]"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Posts */}
            <div className="mt-5 rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">
                Popular Posts
              </h3>

              <hr className="mb-4 border-gray-300" />

              <div className="space-y-4">
                {popularposts.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <Image
                      src={item.image}
                      alt={item.demandedskill}
                      width={70}
                      height={70}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        {item.demandedskill}
                      </h4>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= PAGINATION ================= */}
      <div className="mb-10 mt-6 flex items-center justify-center gap-2">

        <button
          className="flex h-8 w-8 items-center justify-center rounded border text-gray-700 transition-all duration-200 hover:bg-gray-100 active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded border bg-[#4438df] font-bold text-white">
          1
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded border font-bold text-gray-700 transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#4438df]">
          2
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded border font-bold text-gray-700 transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#4438df]">
          3
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded border font-bold text-gray-700 transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#4438df]">
          4
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded border font-bold text-gray-700">
          ⋯
        </button>

        <button className="flex h-8 items-center justify-center rounded border px-3 font-bold text-gray-700 transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#4438df]">
          Next →
        </button>
      </div>

      <Footer />
    </>
  );
}
