import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarFold } from 'lucide-react';
import { Clock } from 'lucide-react';

const BlogSection = () => {
  // Dummy data array design ke hisab se (8 cards total)
  const blogs = [
    {
      date: 'May 02, 2024',
      readTime: '7 min read',
      title: 'Future of Work: Key Trends to Watch in 2024',
      description: 'Explore the evolving landscape of work, from remote collaboration to AI integration and the gig economy.',
      author: 'Priya Sharma',
      role: 'HR Analyst',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
    {
      date: 'April 28, 2024',
      readTime: '5 min read',
      title: 'Crafting the Perfect Resume with AI Assistance',
      description: 'Learn how to leverage AI tools to create a standout resume that gets you noticed by recruiters.',
      author: 'Rohan Verma',
      role: 'Career Coach',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
    {
      date: 'April 22, 2024',
      readTime: '8 min read',
      title: 'Mastering the Art of the Mock Interview',
      description: 'Practice makes perfect. Discover how mock interviews can boost your confidence and performance.',
      author: 'Anjali Mehta',
      role: 'Tech Recruiter',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
    {
      date: 'April 15, 2024',
      readTime: '6 min read',
      title: 'Navigating Your Career Path with a Skill Assessment',
      description: 'Identify your strengths and weaknesses to make informed decisions about your professional growth.',
      author: 'Vikram Singh',
      role: 'L&D Specialist',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
     {
      date: 'April 15, 2024',
      readTime: '6 min read',
      title: 'Navigating Your Career Path with a Skill Assessment',
      description: 'Identify your strengths and weaknesses to make informed decisions about your professional growth.',
      author: 'Vikram Singh',
      role: 'L&D Specialist',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
     {
      date: 'April 15, 2024',
      readTime: '6 min read',
      title: 'Navigating Your Career Path with a Skill Assessment',
      description: 'Identify your strengths and weaknesses to make informed decisions about your professional growth.',
      author: 'Vikram Singh',
      role: 'L&D Specialist',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
     {
      date: 'April 15, 2024',
      readTime: '6 min read',
      title: 'Navigating Your Career Path with a Skill Assessment',
      description: 'Identify your strengths and weaknesses to make informed decisions about your professional growth.',
      author: 'Vikram Singh',
      role: 'L&D Specialist',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
     {
      date: 'April 15, 2024',
      readTime: '6 min read',
      title: 'Navigating Your Career Path with a Skill Assessment',
      description: 'Identify your strengths and weaknesses to make informed decisions about your professional growth.',
      author: 'Vikram Singh',
      role: 'L&D Specialist',
      image: '/Images/blog2.png',
      authorAvatar: '/avatars/bussiness-man.png',
    },
  ];
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Our Blogs
        </h2>
        <Link 
          href="/blogs" 
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          View All Blogs
          <svg 
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Grid Layout: Mobile pe 1, Tablet pe 2, Desktop pe 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Blog Feature Image Container */}
            <div className="relative w-full h-48 bg-gray-100">
              <Image 
                src={blog.image}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              
              {/* Meta Data: Date and Read Time */}
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                   <CalendarFold /> {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock /> {blog.readTime}
                </span>
              </div>

              {/* Title and Description */}
              <div>
                <h3 className="font-poppins font-medium  text-black text-base leading-snug line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
              </div>

              {/* Separator line */}
              <div className="w-full h-[1px] bg-gray-100 my-1" />

              {/* Author & Read More Row */}
              <div className="flex items-center justify-between">
                {/* Author Info */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
                    <Image 
                      src={blog.authorAvatar}
                      alt={blog.author}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 leading-tight">{blog.author}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{blog.role}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link 
                  href={`/blogs/${blog.title.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 gap-0.5 group"
                >
                  Read more
                  <svg 
                    className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BlogSection;