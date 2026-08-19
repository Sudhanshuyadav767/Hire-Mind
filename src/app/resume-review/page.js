import Header from "@/app/component/common/Header"
   import Footer from "@/app/component/common/Footer"
   import Link from "next/link"
import Image from "next/image"
import {Sparkles,BadgeCheck,GraduationCap,Upload, Lock,CheckCircle} from "lucide-react"
import {review} from "@/Data/data"
import {review1} from "@/Data/data"
import Reviewreport from "../component/Resume1-review/Reviewreport"


export default function HeroSection() {
  return (
    <>
    <Header />
    <section className="bg-[#F3F0FF] py-8 sm:py-10 lg:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">

         
          
            <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              AI Resume Review
            </h1>

            <p className="mt-3 text-base sm:text-lg lg:text-xl text-blue-600 font-medium">
              Get AI-Powered Feedback. Build a Stronger Resume.
              Land Your Dream Job.
            </p>

            <p className="mt-5 sm:mt-6 text-gray-600 text-base sm:text-lg leading-7 sm:leading-8">
              Upload your resume and get instant AI-powered feedback
              to improve your resume's impact, clarity, and chances
              of getting shortlisted.
            </p>

            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-6">

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full bg-white shadow flex items-center justify-center">
                  <Sparkles size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">
                    Instant AI Feedback
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500">
                    Get actionable suggestions
                    in seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                   <BadgeCheck size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">
                    ATS Friendly Score
                  </h3>

                  <p className="text-xs text-gray-500">
                    Check how well your resume
                    passes ATS systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                   <GraduationCap size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-sm">
                    Expert Tips
                  </h3>

                  <p className="text-xs text-gray-500">
                    Improve content,
                    format & structure.
                  </p>
                </div>
              </div>

            </div>
          </div>

          
          <div className=" flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-full max-w-[420px] h-auto mx-auto lg:ml-auto">

            

              <Image
                src="/Images/Hero_Homepage.jpeg"
                alt=""
      width={320}
      height={320}
                className="w-full h-auto object-contain relative z-10"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
     <section className="w-full px-8">
      |      
      <div className="grid md:grid-cols-2 gap-6">

        
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="text-3xl font-bold">Upload Your Resume</h2>

          <p className="text-gray-500 mt-2">
            Supported format: PDF, DOC, DOCX (Max size: 5 MB)
          </p>

          <div className="mt-4 border-2 border-dashed rounded-xl bg-[#F3F0FF] h-100 flex flex-col justify-center items-center">
            <Upload className="w-10 h-10  mt-2 text-blue-600" />

            <p className="mt-2 text-gray-600">
              Drag & Drop your resume here
            </p>

            <p className="my-3 text-gray-500">or</p>

             <Link href="/Chose-file">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium mb-5">
              Choose File
            </button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-500">
            <Lock size={16} />
            <span>Your data is secure and confidential</span>
          </div>
        </div>

        
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="text-3xl font-bold mb-5">
            How It Works?
          </h2>

          <div className="space-y-6 gap-10">

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Upload Your Resume
                </h3>

                <p className="text-gray-500">
                  Upload your resume in PDF or DOC format.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  AI Reviews It
                </h3>

                <p className="text-gray-500">
                  Our AI analyzes your content, structure and ATS compatibility.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Get Actionable Feedback
                </h3>

                <p className="text-gray-500">
                  Receive score, suggestions and improve your resume.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
    <section className="max-w-7xl px-4 sm:px-6 lg:px-8 py-4 mx-auto  mt-8 w-full">
       <div className="border rounded-xl bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold p-4 sm:mb-8"> What Our AI Review</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 w-full">
       {review.map((item,index)=>(
        <div 
        key={index}
          className="flex flex-col items-center text-center mb-2 px-2"
       >
        
          <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
          <p className="whitespace-pre-line text-sm text-gray-500">{item.disc}</p>
        </div>
       ))}
      
      </div>
      </div>
    </section>
    <div className="mt-3">
  
   <Reviewreport />
  
      </div>
      <Footer />
    </>
  );
}