import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import { blogs, popularposts } from "@/Data/data";
import Image from "next/image";
import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";

export default function Blogs() {
  return (
    <>
      <Header />
      <section className="bg-[#F3F0FF] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Blogs & Career Insights
          </h1>

          <p className="text-gray-600 mt-3">
            Explore expert advice, career tips and industry trends to help you grow in your professional journey.
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-2xl items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 focus-within:border-[#4438df] focus-within:ring-4 focus-within:ring-[#4438df]/10">
            <div className="pl-4 text-gray-400">
              <Search size={20} />
            </div>

            <input
              type="text"
              placeholder="Search articles, topics or keywords..."
              className="flex-1 bg-transparent px-3 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:text-base"
            />

            <button
              className="mr-1.5 rounded-lg bg-[#4438df] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#372fc5] hover:shadow-md active:scale-95 sm:px-6 sm:text-base"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#4438df]">
                  Our Blog
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Latest Articles
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Explore the latest career tips, insights and industry trends.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4438df]/20 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={400}
                      height={250}
                      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{blog.date}</span>
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium">
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-[#4438df]">
                      {blog.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 flex-grow text-sm leading-6 text-gray-600">
                      {blog.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {blog.author}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {blog.role}
                        </p>
                      </div>

                      <Link
                        href="/blogs/blog1"
                        className="ml-3 flex shrink-0 items-center gap-1 text-sm font-semibold text-[#4438df] transition-all duration-200 hover:gap-2 hover:text-[#3128b8]"
                      >
                        Read More
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-72">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4438df]">
                  Explore
                </p>
                <h3 className="mt-1 text-lg font-bold text-gray-900">
                  Categories
                </h3>
              </div>

              <ul className="space-y-2">
                {[
                  "Career Tips",
                  "Interview Preparation",
                  "Resume Building",
                  "Remote Work",
                  "Industry Trends",
                ].map((category) => (
                  <li key={category}>
                    <button className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-[#f5f3ff] hover:text-[#4438df]">
                      <span>{category}</span>
                      <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4438df]">
                  Trending
                </p>
                <h3 className="mt-1 text-lg font-bold text-gray-900">
                  Popular Posts
                </h3>
              </div>

              <div className="space-y-5">
                {popularposts.map((item, index) => (
                  <div key={index} className="group flex cursor-pointer gap-3">
                    <div className="relative shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.demandedskill}
                        width={70}
                        height={70}
                        className="h-16 w-16 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-800 transition-colors duration-200 group-hover:text-[#4438df]">
                        {item.demandedskill}
                      </h4>
                      <p className="mt-1.5 text-xs text-gray-500">
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

      <div className="mb-12 mt-2 flex items-center justify-center gap-2 px-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all duration-200 hover:border-[#4438df] hover:bg-[#f5f3ff] hover:text-[#4438df]">
          <ChevronLeft size={17} />
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4438df] text-sm font-semibold text-white shadow-sm">
          1
        </button>

        {[2, 3, 4].map((page) => (
          <button
            key={page}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-600 transition-all duration-200 hover:border-[#4438df] hover:bg-[#f5f3ff] hover:text-[#4438df]"
          >
            {page}
          </button>
        ))}

        <span className="flex h-9 w-9 items-center justify-center text-gray-400">
          ...
        </span>

        <button className="flex h-9 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-3.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:border-[#4438df] hover:bg-[#f5f3ff] hover:text-[#4438df]">
          Next
          <span>→</span>
        </button>
      </div>

      <Footer />
    </>
  );
}