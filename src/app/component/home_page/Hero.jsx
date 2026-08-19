import React from 'react';
import Image from 'next/image';
import { Search, MapPin, Briefcase, Sparkles, FileText, CheckCircle, Bot,ChartNoAxesCombined} from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full bg-white  overflow-hidden">
      
      {/* Decorative Dot Matrix in Background */}
     

      <div className="max-w-7xl  mx-auto bg-[#E2E4F8] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1  lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT CONTENT: Heading, Subtext, Search Bar & Popular Tags */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top AI Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full w-fit mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#2D24D0]" />
              <span className="text-xs font-semibold text-[#2D24D0] tracking-wide font-poppins">
                AI-Powered Job Portal
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium font-poppins text-[#1E2229] tracking-tight leading-none">
              Find Jobs. Grow Skills. <br />
             <span className="text-[#1E2229]   mt-2">Build Your <span className="text-[#2D24D0]  mt-2">Future.</span> </span>
             
            </h1>

            {/* Paragraph Subtext */}
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mt-6 leading-relaxed font-poppins font-medium">
              Discover the best job opportunities, internships, and freelance projects. <br />
              Get AI-powered support for resume, mock interviews, and more.
            </p>

            {/* Multi-Input Search Bar Block */}
           <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl gap-4 w-[850px] max-w-[1100px] mt-8 z-20">
              
              {/* Job Title Input */}
              <div className="bg-white w-full md:w-auto flex items-center gap-3 px-4 h-[49px]  m-4 rounded-xl shadow-md border border-black/20">
                <Search className="w-5 h-5 text-black/50 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Job title or company" 
                  className="w-full md:w-[180px] text-sm font-medium text-gray-700 placeholder:text-black/50 outline-none bg-transparent"
                />
              </div>

              {/* Location Input */}
              <div className="bg-white w-full md:w-auto flex items-center gap-3 px-4 h-[49px] rounded-xl shadow-md border border-black/20">
                <MapPin className="w-5 h-5 text-black/50 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full md:w-[110px] text-sm font-medium text-gray-700 placeholder:text-black/50 outline-none bg-transparent"
                />
              </div>

              {/* Experience Input */}
              <div className="bg-white w-full md:w-auto flex items-center gap-3 px-4 h-[49px] rounded-xl shadow-md border border-black/20">
                <Briefcase className="w-5 h-5 text-black/50 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Experience" 
                  className="w-full md:w-[110px] text-sm font-medium text-gray-700 placeholder:text-black/50 outline-none bg-transparent"
                />
              </div>
             
              {/* Search Action Button */}
              <button className="w-full md:w-[160px] h-[49px] bg-[#4240E5] hover:bg-[#2D24D0] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shrink-0 transition-colors shadow-md border border-black/20">
                <Search className="w-5 h-5" />
                <span>Search Jobs</span>
              </button>
            
            </div>

            {/* Popular Searches Tags Section */}
            <div className="flex flex-wrap items-center gap-2 mt-6 text-xs text-gray-500 font-poppins font-medium">
              <span className="text-[#1E2229] font-bold mr-1">Popular Searches:</span>
              {['Web Development', 'App Development', 'UI/UX Designer', 'Product Manager'].map((tag) => (
                <span key={tag} className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-[#2D24D0] hover:text-[#2D24D0] transition cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT CONTENT: Vector Circle Background, Main Image & Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-12 lg:mt-2 h-[450px] sm:h-[500px] mr-8">
            
            {/* Blue Background Vector Circle */}
            {/* <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] bg-[#5361FF] rounded-full bottom-4 z-0"></div> */}

            {/* Main Candidate Image (Replace with your asset path) */}
            <div className="absolute  z-10 w-[320px] sm:w-auto h-auto ">
              <Image 
                src="/Images/Hero_Homepage.jpeg" 
                alt="Candidate Profile Hero" 
                width={554} 
                height={550} 
                priority
                className="object-contain"
              />
            </div>

            {/* FLOATING CARD 1: AI Career Guide (Top Right) */}
            <div className="absolute top-4 -right-2 sm:right-2 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2.5 z-20 min-w-[170px]">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
               <ChartNoAxesCombined className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-black tracking-wider font-poppins font-medium">AI Career Guide</span>
                <span className="text-[13px] font-poppins font-medium text-[#2D24D0]">Get AI Advice</span>
                <span className="text-[12px] text-gray-400 font-poppins font-medium">Chat with AI</span>
              </div>
            </div>

            {/* FLOATING CARD 2: AI Resume Review (Middle Right) */}
            <div className="absolute top-1/3 -right-6 sm:right-0 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2.5 z-20 min-w-[170px]">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-poppins font-medium text-black tracking-wider">AI Resume Review</span>
                <span className="text-[13px] text-[#2D24D0] font-poppins font-medium">Good</span>
                <span className="text-[12px] text-gray-400 font-poppins font-medium">Improve your skills</span>
              </div>
            </div>

            {/* FLOATING CARD 3: AI Match Score (Bottom Right) */}
            <div className="absolute bottom-12 -right-4 sm:right-4 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2.5 z-20 min-w-[170px]">
              <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-black font-poppins font-medium tracking-wider">AI Match Score</span>
                <span className="text-[13px] text-[#2D24D0] font-medium font-poppins">80%</span>
                <span className="text-[12px] text-green-500 ">Excellent Match</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Floating Highlights Feature Card Grid */}
        
        <div className="relative -mt-8 bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* Highlight Item 1 */}
          <div className="flex items-start gap-3.5 ">
            <div className="w-10 h-10 bg-indigo-50 text-[#2D24D0] rounded-2xl flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-sm font-poppins font-medium text-gray-900">AI Resume Reviewer</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal">Get AI-powered resume analysis & improve your chances</p>
            </div>
          </div>

          {/* Highlight Item 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-7 h-7" />
            </div>
            <div className="font-poppins font-medium">
              <h3 className="text-sm  text-gray-900">Mock Interview</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal">Practice with AI and improve your interview skills</p>
            </div>
          </div>

          {/* Highlight Item 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div className="font-poppins font-medium">
              <h3 className="text-sm  text-gray-900">Skill Assessment</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal">Take tests and prove your skills to employers</p>
            </div>
          </div>

          {/* Highlight Item 4 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-7 h-7" />
            </div>
            <div className="font-poppins font-medium">
              <h3 className="text-sm  text-gray-900">AI Career Chatbot</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal">Get personalized career guidance instantly</p>
            </div>
          </div>
          </div>

        </div>

      
    </section>
  );
};

export default Hero;