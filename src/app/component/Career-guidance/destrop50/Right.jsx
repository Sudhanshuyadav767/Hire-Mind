"use client";

import { useMemo, useState } from "react";
import { Bookmark, Search, Clock3, Star, ArrowRight } from "lucide-react";

import { courses } from "@/Data/data4";

export default function RightCourses() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Popular");
  const [bookmarked, setBookmarked] = useState(new Set());

  // =========================
  // Bookmark Toggle
  // =========================
  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const updated = new Set(prev);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      return updated;
    });
  };

  // =========================
  // Search + Sort
  // =========================
  const filteredCourses = useMemo(() => {
    const result = courses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "Rating") {
      return [...result].sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    if (sort === "Newest") {
      return [...result].reverse();
    }

    return result;
  }, [search, sort]);

  return (
    <section className="w-full min-w-0 flex-1">
      {/* ================= SEARCH + SORT ================= */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 sm:shrink-0">
          <span className="whitespace-nowrap text-sm text-gray-500">
            Sort by:
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option>Popular</option>
            <option>Newest</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      {/* ================= COURSE COUNT ================= */}
      <h2 className="mb-5 text-sm font-semibold text-gray-800">
        {filteredCourses.length}{" "}
        {filteredCourses.length === 1 ? "Course" : "Courses"} Found
      </h2>

      {/* ================= COURSE GRID ================= */}
      {/* Mobile: 1 | Tablet: 2 | Laptop/Desktop: 3 */}
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isBookmarked={bookmarked.has(course.id)}
              onToggleBookmark={() => toggleBookmark(course.id)}
            />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="text-sm font-medium text-gray-600">
              No courses found
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 sm:px-4"
        >
          ‹
        </button>

        <button
          type="button"
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white sm:px-4"
        >
          1
        </button>

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 sm:px-4"
        >
          2
        </button>

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 sm:px-4"
        >
          3
        </button>

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 sm:px-4"
        >
          ...
        </button>

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 sm:px-4"
        >
          5
        </button>

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 sm:px-4"
        >
          ›
        </button>
      </div>
    </section>
  );
}


// =====================================================
// COURSE CARD
// =====================================================

function CourseCard({
  course,
  isBookmarked,
  onToggleBookmark,
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* ================= TOP ================= */}
      <div className="mb-4 flex items-start justify-between gap-3">
        {/* Course Image */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          <img
            src={course.image}
            alt={course.title}
            className="h-12 w-12 object-contain"
          />
        </div>

        {/* Bookmark */}
        <button
          type="button"
          onClick={onToggleBookmark}
          aria-label={
            isBookmarked
              ? "Remove bookmark"
              : "Add bookmark"
          }
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
            isBookmarked
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-400 hover:bg-gray-100 hover:text-indigo-600"
          }`}
        >
          <Bookmark
            size={20}
            fill={isBookmarked ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* ================= LEVEL ================= */}
      <span className="w-fit rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
        {course.level}
      </span>

      {/* ================= TITLE ================= */}
      <h3 className="mt-3 min-h-[48px] text-base font-bold leading-6 text-gray-800">
        {course.title}
      </h3>

      {/* ================= PROVIDER ================= */}
      <p className="mt-2 min-h-[20px] text-sm text-gray-500">
        {course.provider}
      </p>

      {/* ================= INFO ================= */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Clock3 size={15} />
          {course.duration}
        </span>

        <span className="flex items-center gap-1.5">
          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />
          {course.rating} ({course.reviews})
        </span>
      </div>

      {/* ================= BUTTON ================= */}
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-indigo-300 bg-indigo-50 py-2.5 text-sm font-semibold text-indigo-600 transition duration-200 hover:bg-indigo-600 hover:text-white"
      >
        View Course
        <ArrowRight size={17} />
      </button>
    </div>
  );
}