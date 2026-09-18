import { question } from "@/Data/data";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
export default function LeftCareerguidance() {
  return (
<>
      <div className="border rounded-xl shadow-sm px-4 py-4 sm:px-6 py-6 mt-4">
        <h2 className="text-xl  sm:text-2xl font-bold">What would you like guidance on?</h2>

        <p className="text-sm sm:text-base text-gray-600">
          Tell us about yourself and let our AI suggest the best career path for you
        </p>

        <div>
            {question.map((item, index) => (
          <div key={index}
          className="flex flex-col md:flex-row items-center justify-between"
          >
            
            <div className="space-y-2">
              <h3  className="text-xl  sm:text-xl font-medium">What are your main interests?</h3>

              <select 
              className="border rounded-xl shadow-sm px-4 py-4 w-full"
              >
                <option className="text-gray-600 items-center">{item.interest}</option>
                
                
              </select>

              <h3  className="text-xl  sm:text-xl font-medium">What is your highest education level?</h3>

              <select
              
              className="border rounded-xl shadow-sm px-4 py-4 w-full"
              >
                <option>{item.educationlevel}</option>
              </select>
            </div>

            <div
            
              className="space-y-2 px-4 py-4"
            >
              <h3  className="text-xl  sm:text-xl font-medium">
                Which field describes your current/previous experience?
              </h3>

              <select
                 
              className="border rounded-xl shadow-sm px-4 py-4 w-full">
                <option>{item.currentexperience}</option>
              </select>

              <h3 className="text-xl  sm:text-xl font-medium">How many years of experience do you have?</h3>

              <select
              
              className="border rounded-xl shadow-sm px-4 py-4 w-full"
              >
                <option>{item.experienceyear}</option>
              </select>
            </div>
<div>
     
        </div>
       
    </div>
     ))}
    
            <h2 className="text-xl  sm:text-xl font-bold">Any other information</h2>

            <input
              type="text"
              placeholder="Write message"
              className="border shadow-sm w-full rounded-xl px-4 py-4 mt-4"
            />

            <div className="flex flex-col md:flex-row items-center mt-6 gap-8">
              <button className="boder rounded-xl bg-indigo-600 shadow-sm text-white px-4 py-4">Get AI Guidance</button>
              <p className="text-gray-600">Reset</p>
            </div>
  
         </div>
    
      </div>
      <div className="border rounded-xl shadow-sm px-4 px-4 sm:px-6 sm:py-4 mt-6">
        <div className="flex flex-col md:flex-row justify-between ">
        <h2 className="sm:text-xl text-lg font-bold">Your AI Career Guidance Results</h2>
        <p className="text-green-600 sm:text-base text-sm">Generate just for you</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-2">
            <p className="text-blue-600">Recommended Paths</p>
            <p>Skill Gap Analysis</p>
            <p>Roadmap</p>
            <p>Top Job Roles</p>
            <p>Industry Insights</p>
        </div>
        <hr className="text-gray-300 mt-4"/>
        <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
            <div className="">
                <Image 
                src='/AI-Icon/Career Guidance.jpeg'
                alt=""
                width={60}
                height={60}
                className=" rounded-xl bg-blue-300"
                />
            </div>
            <div className="space-y-4">
                <p>Top career Match</p>
                <span className="flex justify-between">
                <h2 className="sm:text-xl text-lg font-bold">Data Scientist</h2>
                 <p className="text-green-600">92% Match</p>
            </span>
            <p>Data Scientist analyze complex
                to help organization make better<br />
                decision and build data-driven  <br />solutions

            </p>
        
<Link href="/Career-Guidance/DataScientist">
  <button className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:shadow-sm active:scale-[0.98]">
    Explore Career Path ➜
  </button>
</Link>


            </div>
            
            <div className="space-y-4">
                <h3 className="sm:text-xl text-lg font-bold">✨ Why this is a great match?</h3>
                <span className="flex items-center  gap-2">
                    <span className="w-4 h-4 flex items-center  bg-green-500 rounded-full">
                    <Check className="w-4 h-4 text-white"/>  
                    </span>
                <span>Strong match with your skills in python ,SQL analysis</span>
                </span>
                 <span className="flex items-center  gap-2">
                    <span className="w-4 h-4 flex items-center justify-center bg-green-500 rounded-full">
                    <Check className="w-4 h-4 text-white"/>  
                    </span>
                <span>High demand in the job market with great growth potential</span>
                </span>
                 <span className="flex items-center  gap-2">
                    <span className="w-4 h-4 flex items-center justify-center bg-green-500 rounded-full">
                    <Check className="w-4 h-4 text-white"/>  
                    </span>
                <span>Aligns with your interest in technology and problem Solving</span>
                </span>
                 <span className="flex items-center  gap-2">
                    <span className="w-4 h-4 flex items-center justify-center bg-green-500 rounded-full">
                    <Check className="w-4 h-4 text-white"/>  
                    </span>
                <span>Average salary range ₹8-18 LpA</span>
                </span>
                
                <div className="flex justify-between items-center gap-2 mb-2">
                    
                    <div>Confidence Score</div>
                   <div className="w-full bg-gray-200 rounded-full h-3">
  <div
    className="bg-blue-600 h-3 rounded-full"
    style={{ width: "92%" }}
  ></div>
</div>
                    <div>
                 <p>92%</p>

                </div>
                 </div>
                 </div>
       </div>

      </div>
      <div className="border rounded-xl shadow-sm px-4 py-4 sm:px-6 sm:py-6 mt-8">
        <h2 className="sm:text-xl text-lg font-bold">
            Recommanded Roadmap Sanpshot
        </h2>
        <div className="flex flex-col md:flex-row mt-4">
            <div className="flex gap-2">
                <span className="w-8 h-8 border rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">1</span>
                </span>
                <span>
                  <h3 className="font-semibold text-lg">Foundation</h3>
                  <p>0-3 Months learn Python,Statics,and SQL basics</p>
                </span>
                </div>
                  {/* <ArrowRight className="text-gray-500 w-12 h-12" /> */}
                  {/* <span className="text-4xl justify-center">→</span> */}
        
  <ArrowRight className="mx-2 w-16 h-8" />

           
            <div  className="flex gap-2">
              <span className="w-8 h-8 border rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white text-sm font-semibold">2</span>
              </span>
              <span>
                <h3 className="font-semibold text-lg">Core Skills</h3>
                <p>3-6 Months Learn Machine Learning,Data Analysis</p>
               
              </span>
            </div>
            <ArrowRight className="mx-2 w-16 h-8" />
            <div  className="flex gap-2">
             <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
  <span className="text-white text-sm font-semibold">3</span>
</span>
              <span>
                <h3 className="font-semibold text-lg">Advanced Skills</h3>
                <p>6-12 Months Deep Learning,Data visualization</p>
              </span>
            </div>
            <ArrowRight className="mx-2 w-16 h-8" />
             <div  className="flex gap-2">
              <span className="w-8 h-8  rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">4</span>
              </span>
              <span>
                <h3 className="font-semibold text-lg">Build &Apply</h3>
                <p>12+Months Work on Projects and apply for roles</p>
              </span>
            </div>
        </div>
      </div>
    </>
  );
}