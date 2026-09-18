import { RecentMock } from "@/Data/data"
import { FileText,Crown,History,Users, BriefcaseBusiness,Brain } from "lucide-react"
import Progressbar from "../Progressbar/Progressbar"
import ProgressChart from "../Line-progress/ProgressChart"
import { data4 } from "@/Data/data"
export default function RecentMoc1(){
    return(
        <>
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-4 gap-4 px-2 sm:px-4 items-stretch ">
        <div className="border border-gray-200 rounded-lg sm:px-6 sm:py-6 px-4 py-4 mt-4 w-full lg:flex-1 min-w-0">
            <div className="flex flex-col md:flex-row justify-between">
                <h2 className="sm:text-xl  text-lg font-bold">Recent Mock Interviews</h2>
                <button className=" bg-transparent text-green-600 hover:-translate-y-1 transition-all duration-200">View All→</button>
            </div>
            {RecentMock.map((item,index)=>(
            <div key={index}
            className="border border-gray-200 sapce-y-1 shadow-sm px-2 py-4 flex flex-col md:flex-row justify-between mt-4"
            >
            <div className="flex items-center justtify-center gap-4 ">
                <div className="w-10 h-10 bg-[#C5B8FF] rounded-full min-w-10 min-h-10 shrink-0 flex items-center justify-center">
 <FileText className="w-5 h-5 text-blue-600"/>
                </div>
                <div>
                    <h3>{item.post}</h3>
                    <p>{item.interviewtype}{item.level}</p>
                </div>
            </div>
            <div>
                <p>{item.day}</p>
                <p>{item.time}</p>
            </div>
            <div className="flex gap-4 items-center justify-center">
                <span>
                <Progressbar size={10}/>

                </span>
                <span className="text-green-600 bg-green-100 px-4 py-2 border rounded-xl shadow-sm">{item.reponse}</span>
                 
            </div>
             
        </div>
        ))}
        </div>
        {/* performance overview*/}
        <div className="border border-gray-200 rounded-lg sm:px-6 sm:py-6 px-6 py-6  w-full lg:w-[400px] lg:shrink-0 mt-3">
        <div className="flex justify-between items-center">
    <h2 className="sm:text-xl text-lg font-bold">
      Performance Overview
    </h2>

    <button className="text-indigo-600 sm:mt-10 mt-6 hover:-translate-y-1 transition-all duration-200">
      View Analytics →
    </button>
  </div>
<div>
    <ProgressChart />
</div>
        
        {data4.map((item,index)=>(
         <div key={index}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
         >
          
          <div>
          <span className="bg-[#C5B8FF] border border-blue-300 rounded-xl w-12 h-12 flex items-center justify-center">
  <FileText className="text-blue-600 w-8 h-8" />
</span>
            <p className="text-gray-600">Total Interviews</p>
            <p className="sm:text-xl text-base font-bold">{item.totalinterview}</p>
          </div>
          <div>
         <span className="bg-[#C5B8FF] border border-blue-300 rounded-xl w-12 h-12 flex items-center justify-center">
  <FileText className="text-blue-600 w-8 h-8" />
</span>
            <p className="text-gray-600">Best Score</p>
            <p className="sm:text-xl text-base font-bold">{item.score}</p>
          </div>
          <div>
               <span className="bg-[#C5B8FF] border border-blue-300 rounded-xl w-12 h-12 flex items-center justify-center">
  <FileText className="text-blue-600 w-8 h-8" />
</span>
            <p className="text-gray-600">Avg. Duration</p>
            <p className="sm:text-xl text-base font-bold">{item.duration}</p>
          </div>
          <div>
             <span className="bg-[#C5B8FF] border border-blue-300 rounded-xl w-12 h-12 flex items-center justify-center">
  <FileText className="text-blue-600 w-8 h-8" />
</span>
            <p className="text-gray-600">Improv. ement</p>
            <p className="sm:text-xl text-base font-bold">{item.improvement}</p>
          </div>
         </div>
         ))}
             <p className="text-end text-gray-400 mt-4">vs last month</p>
        </div>
    
        </div>

        <div  className=" max-w-7xl mx-auto flex flex-col lg:flex-row justify-between sm:px-6 sm:py-6 px-6 py-6 sm:gap-2 gap-4 mt-4 border border-gray-200 shadow-sm">
            <div></div>
            <div>
                <h2>Unlock YOur Full Potential</h2>
                <p>Practice more mock interviews and get better every day.
                Consistency today leads to success tomorrow
                </p>
            </div>
            <div>
                <div className="items-center justify-center">
                <button className="border rounded-xl px-4 py-2 text-white shadow:sm bg-indigo-600 hover:indigo-700 flex gap-2 ">
                   
 <span>Premium</span>
  <Crown className="w-5 h-5 text-white-500 inline mr-1" />
                </button>
                </div>
                <p>Get unlimited mock interviews.<br />
                    detailed reort & more
                </p>
            </div>
        </div> 
        <div className="max-w-7xl px-6 py-6  mx-auto mt-4">
        <h2 className="sm:text-lg text-base font-semibold">Tips to Ace Your Interview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div  className="w-full flex items-center gap-4 px-2 py-2 sm:px-4 sm:py-4 border border-gray-200">
                <span className="w-12 h-12 bg-[#C5B8FF] rounded-lg shadow-sm flex justify-center items-center">
                    <History className="w-8 h-8 text-indigo-600"/>
                </span>
                <span>
                    <h3 className="sm:text-lg text-base font-medium">Rearch the data</h3>
                    <p className="text-gray-600">Understand the job description ,company and industry</p>
                </span>
            </div>
            <div className="w-full flex items-center gap-4 px-2 py-2 sm:px-4 sm:py-4 border border-gray-200">
                 <span className="w-12 h-12 bg-[#C5B8FF] rounded-lg shadow-sm flex justify-center items-center">
                    <Users className="w-8 h-8 text-indigo-600"/>
                 </span>
                <span >
                    <h3 className="sm:text-lg text-base font-medium">Practice Regularly</h3>
                    <p className="text-gray-600">The more you practice,the more confident you become</p>
                </span>
            </div>
            <div  className="w-full flex items-center gap-4 px-2 py-2 sm:px-4 sm:py-4 border border-gray-200">
                 <span className="w-12 h-12 bg-[#C5B8FF] rounded-lg shadow-sm flex justify-center items-center">
                    <BriefcaseBusiness className="w-8 h-8 text-indigo-600"/>
                 </span>
                <span>
                    <h3 className="sm:text-lg text-base font-medium">Structure Your Answer</h3>
                    <p className="text-gray-600">Use Star method for behavioural questions.</p>
                </span>
            </div>
            <div  className="w-full flex items-center gap-4 px-2 py-2 sm:px-4 sm:py-4 border border-gray-200">
                 <span className="w-12 h-12 bg-[#C5B8FF] rounded-lg shadow-sm flex justify-center items-center">
                    <Brain className="w-8 h-8 text-indigo-600"/>
                 </span>
                <span>
                    <h3 className="sm:text-lg text-base font-medium">Stay calm & confident</h3>
                    <p className="text-gray-600">Take a deep breath and let you knowledge shine.</p>
                </span>
            </div>
        </div>
        </div>
        </>
    )
}
