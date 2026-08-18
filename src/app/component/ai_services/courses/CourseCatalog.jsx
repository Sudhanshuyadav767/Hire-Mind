"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock3, Star, ChevronDown } from "lucide-react";
import { fetchCourses } from "./mockData";

function CourseSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white flex flex-col justify-between h-[368px] animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-[150px] w-full bg-slate-200" />
      
      {/* Body Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Title */}
          <div className="h-4 bg-slate-200 rounded-md w-11/12" />
          {/* Providers */}
          <div className="h-3 bg-slate-100 rounded-md w-1/3" />
          <div className="h-3 bg-slate-100 rounded-md w-1/4" />
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between border-t border-[#f1f5f9] pt-2">
          <div className="h-3 bg-slate-100 rounded-md w-12" />
          <div className="h-3 bg-slate-100 rounded-md w-14" />
        </div>

        {/* Rating */}
        <div className="h-3 bg-slate-200 rounded-md w-16" />

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <div className="h-8 bg-slate-200 rounded-xl flex-1" />
          <div className="h-8 bg-slate-200 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white transition-all hover:border-[#433be2] hover:shadow-md flex flex-col justify-between h-full">
      {/* Top Banner Image */}
      <div className="relative h-[150px] w-full overflow-hidden bg-gradient-to-br from-[#0c1033] to-[#1a237e] text-white flex flex-col justify-between p-4">
        {/* Decorative Grid Patterns for Premium UI look */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
        
        {/* Tag Badge */}
        <span className="relative z-10 self-start text-[10px] uppercase font-semibold tracking-widest text-[#9ea7ff]">
          {course.tag}
        </span>
        
        {/* Banner Graphic Center */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-2">
          <span className="text-xl font-semibold text-white tracking-wide drop-shadow-md">Python</span>
          <span className="text-[10px] text-[#ffa000] font-semibold uppercase tracking-widest drop-shadow-md">Programming</span>
        </div>

        {/* Provider Subtext inside Banner for visuals */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-300 font-semibold border-t border-white/10 pt-1.5">
          <span>Learn Python</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Course Title */}
          <h3 className="text-sm font-semibold text-[#101014] leading-snug line-clamp-2">
            {course.title}
          </h3>

          {/* Providers List under the title */}
          <div className="mt-1 flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold text-[#5e637d]">Coursera</span>
            <span className="text-[11px] font-semibold text-[#5e637d]">Udemy</span>
          </div>
        </div>

        {/* Level and Duration */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#475569] border-t border-[#f1f5f9] pt-2">
          <span>{course.level}</span>
          <div className="flex items-center gap-1">
            <Clock3 size={13} className="text-[#64748b]" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#334155]">
          <Star size={14} className="text-[#f59e0b] fill-[#f59e0b]" />
          <span>{course.rating}</span>
          <span className="text-[#64748b] font-medium">({course.reviews})</span>
        </div>

        {/* Actions Buttons */}
        <div className="flex gap-2 pt-1 w-full">
          <Link href="/ai-services/courses/python-for-data-science" className="flex-1">
            <button className="w-full rounded-xl bg-[#433be2] hover:bg-[#3129c8] py-2 text-xs font-semibold text-white transition shadow-sm cursor-pointer">
              Start learning
            </button>
          </Link>
          <Link href="/ai-services/courses/python-for-data-science" className="flex-1">
            <button className="w-full rounded-xl border border-[#d9dcf7] bg-white hover:bg-[#f8fafc] py-2 text-xs font-semibold text-[#433be2] transition cursor-pointer">
              Preview
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CourseCatalog({ filters }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    
    // Defer state update to avoid synchronous state changes inside effects warning
    Promise.resolve().then(() => {
      if (active) setLoading(true);
    });
    
    fetchCourses(filters).then((res) => {
      if (active) {
        setCourses(res);
        setLoading(false);
      }
    });

    return () => { active = false; };
  }, [filters]);

  return (
    <div className="space-y-4">
      {/* Course Catalog Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#5e637d]">
            {loading ? "Loading courses..." : `Showing ${courses.length} courses`}
          </p>
        </div>
        <button 
          type="button" 
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-2 text-xs font-semibold text-[#433be2] shadow-xs hover:bg-[#f8fafc] cursor-pointer"
        >
          <span>Sort by: Most Relevant</span>
          <ChevronDown size={14} className="text-[#433be2]" />
        </button>
      </div>

      {/* Grid containing courses or skeleton */}
      <div className="mobile-card-swipe grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <CourseSkeleton key={idx} />
          ))
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white border border-[#e2e8f0] rounded-2xl">
            <p className="text-sm font-semibold text-[#64748b]">No courses match selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
