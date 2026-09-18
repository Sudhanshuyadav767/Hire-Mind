import { popularrole } from "@/Data/data"
import Link from "next/link";
import { Clock,Video,FileText,Monitor,Presentation} from "lucide-react";
export default function MockInterview(){
    return(
        <>
        <div className="border border-gray-200 max-w-7xl mx-auto shadow-sm rounded-xl mt-4 sm:px-4 sm:py-4 px-2 py-2 items-stretch">
<h1 className="sm:text-xl text-lg font-bold">Start Your Mock Interview</h1>
<div className="flex flex-col md:flex-row  w-full  justify-between gap-2">
    <span>
     <h4 className="sm:text-base text-base font-semibold">Job Role</h4>
     <select className="w-full sm:px-4 sm:py-2 px-2 py-2  rounded-xl  border  border-gray-200 hover:-translate-y-1 transition-transform duration-100">
  <option value="">Search job role</option>
  
</select>
    </span>
    <span>
<h4 className="sm:text-base text-base font-semibold">Experience Level</h4>
    <select className="w-full sm:px-4 sm:py-2 px-2 py-2  rounded-xl  border  border-gray-200 hover:-translate-y-1 transition-transform duration-100">
  <option value="">Select Experience</option>
  
</select>
    </span>
    <span>
<h4 className="sm:text-base text-base font-semibold">Interview Type</h4>
    <select className="w-full sm:px-4 sm:py-2 px-2 py-2  rounded-xl border border-gray-200 hover:-translate-y-1 transition-transform duration-100">
  <option value="">Select Interview Type</option>
  
</select>
    </span>
    <span>
<h4 className="sm:text-base text-base font-semibold">Difficulty Level</h4>
<select className="w-full sm:px-4 sm:py-2 px-2 py-2  rounded-xl border  border-gray-200 hover:-translate-y-1 transition-transform duration-100">
  <option value="">Select Difficulty Level</option>
  
</select>

    </span>
   
</div>
<div className="flex flex-wrap gap-6 mt-4">
     <h2 className="sm:text-xl font-semibold text-lg">Popular Role:</h2>
  {popularrole.map((item, index) => (
    
    <div
      key={index}
      className="px-2 py-2 rounded-xl border  border-gray-200"
    >
       
      <span>{item.role}</span>
    </div>
  ))}
</div>
<div className="items-center justify-center flex mt-4">
    <div>
        
    <button className=" flex items-center justify-center  gap-4 bg-indigo-600 w-full hover:bg-indigo-700 text-white border cursor-pointer border-gray-200 rounded-xl sm:px-4 sm:py-4 px-2 py-2">
         <Video size={20} />
    <Link href="./mockinterview">  <span>  Start Mock Interview
        </span></Link>
      </button>
    <div className="flex flex-col md:flex-row gap-6 mt-2">
        <span className="flex items-center justify-center gap-4">
            <span>
         <Clock size={20} />
            </span>
            <span>Duration 30-45 Minutes</span>
        </span>
        <span>Question: 10-15</span>
    </div>
</div>
</div>

        </div>
        <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg mt-4 shadow-sm sm:px-4 sm:py-4 px-2 py-2 mt-4">
            <h2 className="sm:text-xl text-lg font-bold">How It Works?</h2>
             <div className="relative flex items-center justify-between w-full mt-4">

  {/* Connecting line */}
  <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-10"></div>

  {/* Icons */}
  <div className="w-8 h-8 rounded-full bg-[#C5B8FF] border flex items-center justify-center">
    <FileText  className="w-5 h-5 text-blue-600"/>
  </div>

  <div className="w-8 h-8 rounded-full bg-[#C5B8FF] border flex items-center justify-center">
    <Monitor  className="w-5 h-5 text-blue-600"/> 
  </div>

  <div className="w-8 h-8 rounded-full bg-[#C5B8FF] border flex items-center justify-center">
    < Presentation className="w-5 h-5 text-blue-600"/>
  </div>

  <div className="w-8 h-8 rounded-full bg-[#C5B8FF] border flex items-center justify-center">
    <Clock  className="w-5 h-5 text-blue-600"/>
  </div>

</div>

<div className="flex flex-col md:flex-row mt-6">
    <div className="flex gap-4">
       <span className="w-10 h-10 min-w-10 min-h-10 shrink-0 bg-blue-600 border rounded-full items-center justify-center flex">
        <p className="text-white">1</p>
       </span>
        <span>
            <h2>Choose your Preferences</h2>
            <p>Select role,experience level ,interview type and difficulty</p>
        </span>
    </div>
    <div className="flex gap-4">
        <span className="w-10 h-10 min-w-10 min-h-10 shrink-0 bg-blue-600 rounded-full items-center justify-center flex">
        <p className="text-white">2</p>
       </span>
       <span>
        <h1>Start Interview</h1>
        <p>Answer AI-generated questions in a real time interviews</p>
       </span>
       
    </div>
    <div className="flex gap-4">
<span className="w-10 h-10 min-w-10 min-h-10 shrink-0 bg-blue-600 rounded-full items-center justify-center flex">
        <p className="text-white">3</p>
       </span>
<span>
    <h1>Get AI Feedback</h1>
  <p>  Receive detailed feedback on your answer and performance.</p>
</span>

    </div>
    <div className="flex gap-4">
        <span className="w-10 h-10 min-w-10 min-h-10 shrink-0 bg-blue-600 rounded-full items-center justify-center flex">
        <p className="text-white">4</p>
       </span>
        <span>
    <h1>Improve & Practice More</h1>
  <p>Review your performance and come back stronger.</p>
</span>
    </div>
</div>
        </div>
        </>
    )
}