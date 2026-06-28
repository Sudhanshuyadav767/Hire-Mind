import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Software Engineer at TechCorp',
      text: 'The AI resume review was a game-changer! It highlighted areas I never would have thought to improve.',
      avatar: '/avatars/bussiness-man.png', // Ise public/avatars/ folder me rakhna
    },
    {
      id: 2,
      name: 'Rohan Verma',
      role: 'Product Manager at Innovate Inc.',
      text: 'The mock interview feature is amazing! It feels like a real interview and the feedback is very helpful.',
      avatar: '/avatars/bussiness-man.png',
    },
    {
      id: 3,
      name: 'Anjali Mehta',
      role: 'UI/UX Designer at CreativeMinds',
      text: 'Found my dream job within a week. The platform is intuitive and the job matching is incredibly accurate.',
      avatar: '/avatars/bussiness-man.png',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-1 bg-white">
      
      {/* Top Header Section */} 
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-poppins font-medium text-gray-900 tracking-tight">
            What Job Seekers Say
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real stories from real people
          </p>
        </div>
        
        {/* Next.js Link Component */}
        <Link 
          href="/testimonials" 
          className="inline-flex items-center text-sm font-poppins font-medium text-blue-600 hover:text-blue-700 transition-colors group self-start sm:self-auto"
        >
          View All Testimonials
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

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div 
            key={item.id} 
            className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
          >
            {/* Top Row: Avatar and Quote Content */}
            <div className="flex items-start gap-4">
              {/* Avatar Holder (Aap next/image bhi use kar sakte hain) */}
              <div className="w-16 h-16 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                <Image 
                  src={item.avatar} 
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Quote Text */}
              <div className="relative">
                {/* Green Quote Mark */}
                <span className="text-emerald-500 font-serif text-3xl absolute -left-4 -top-3">“</span>
                <p className="text-sm text-gray-500 leading-relaxed pl-1 pt-1 font-poppins font-medium">
                  {item.text}
                </p>
              </div>
            </div>

            {/* Bottom Row: Stars and User Meta */}
            <div className="mt-6 pt-4 border-t border-gray-50/50 flex flex-col gap-2">
              {/* Star Ratings */}
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Identity */}
              <div>
                <h4 className="text-base font-poppins font-medium text-gray-900">{item.name}</h4>
                <p className="text-xs text-gray-400 font-poppins font-medium mt-0.5">{item.role}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default TestimonialsSection;