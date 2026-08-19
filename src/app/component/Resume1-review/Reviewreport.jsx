import Image from "next/image"
import {review1} from "@/Data/data"
import {review2} from "@/Data/data"
import{
    Clock,
    TrendingUp,
    Lightbulb,
    Lock,
    Upload,
    FileCheck,
    FileText,
    ClipboardCheck
}from "lucide-react";
export default function reviewreport(){
    return(
        <>
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-4 px-4 sm:px-6">
            <div className="w-full lg:flex-1 border mt-2 mb-2 shadow-sm rounded-xl bg-white">
                <h2 className="text-lg sm:text-xl font-semibold p-4">Sample AI review Report</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 px-4 py-4">
                        
                        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border-4 rounded-full border-blue-600 flex items-center justify-center"
                        >
                            <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-semibold leading-none">87</h2> 
                    <p className="text-sm font-medium leading-none mt-1">/100</p>
                            </div>
                            
                        </div>
                        <div>
                        <h3 className="text-sm font-medium "> Overall Score</h3>
                        <p className="text-blue-600 text-sm">Great Job!</p>
                        <p className="text-gray-600 text-sm">Your resume is strong.A few  improvement can make it  excellent</p>
                        </div>
                    </div>
                    
                    <div className="space-y-3 w-full p-4">
                        {review1.map((item,index)=>(
                            <div key={index}>
                                <div className="flex items-center gap-2 w-full ">
                                    <span className="shrink-0 text-xs sm:text-sm min-w-20">{item.label}</span>
                                    
                                
                                <div className="w-full rounded-full bg-gray-200">
                                    <div className="rounded-full bg-blue-600"
                                    
                               style={{
  backgroundColor:item.color,
  width:item.width,
  height:"12px"
}}
  
>
    
                                    
                                </div>
                                </div>
                                <span>{item.score}</span> 
                                  </div>
                            </div>
                        ))}
                          </div>     
                    
                    
                </div>
            <hr className="my-4 border-gray-300" />
                
                    <h3 className="text-lg sm:text-xl font-semibold p-4">Top Suggestions</h3>
                    <div>
                    <div className="flex items-center gap-1 p-2">
                        <div>
                            <FileCheck size={18} className="text-blue-600"/>
                        </div>
                        <div>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg p-2">Add more quantifiable achievements to showcase your impact</p>
                  </div>
                   </div>
                   <div className="flex items-center gap-1 p-2">
                    <div>
                       <FileText size={18} className="text-blue-600"/> 
                    </div>
                    <div>
                    <p className="text-gray-600 text-lg p-2  pl-4">Include more relevant keywords related to your target role</p>
                   
                   </div>
                   </div>
                   <div className="flex items-center gap-1 p-2">
                    <div>
                        <ClipboardCheck size={18} className="text-blue-600"
                        
                        />
                    </div>
                    <div>
                    <p className="text-gray-600 text-lg p-2 pl-4">Improve formatting in same sections for better readability</p>
                </div>
            
                </div>
                </div>
</div>
<div className= "w-full lg:flex-1 border rounded-xl mt-2 mb-2 shadow-sm bg-white p-4">
    <div>
            <h2 className="text-lg sm:text-xl font-semibold">Resume Summary</h2>
    <div className="mt-6">
    {review2.map((item,index)=>(
        <div
        key={index}
        className=" space-y-6"
        >
    <div>
    <h2 className="text-base sm:text-lg mt-4 font-medium">File Name:</h2>
    <p className="text-gray-600 text-sm mt-2">{item.name}</p>
    </div>
    <div>
        <h2 className="text-base sm:text-lg font-medium">Uploaded on:</h2>
        <p className="text-gray-600 text-sm mt-2">{item.time}</p>
    </div>
    <div>
        <h2 className="text-xl font-medium">Review Status:</h2>
<button className="bg-green-100 text-green-600 rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 mt-6 sm:mt-8 shadow-xl">Completed</button>
    </div>
    
        <button
  className="w-full sm:w-auto px-6 sm:px-10 py-3 text-white rounded-xl mt-8 sm:mt-14 shadow-xl"
  style={{ backgroundColor: "blue" }}
>
  Review Another Resume
</button>
</div>
    ))}
    </div>
</div>
        </div>
        
        <div className="border px-4 sm:px-6 m-2 py-4 rounded-xl max-w-7xl mx-auto w-full mt-4 shadow-xl">
            <h2 className="text-xl font-medium p-4">Why Use Our AI Resume Review</h2>
            <div className="flex flex-col md:flex-row justify-between w-full p-4 gap-8">
              
                <div className="flex-1">
                    <div className="flex items-center justify-center gap-2">
                        <div className=" w-14 h-14 flex items-center justify-center rounded-full border"
                style={{backgroundColor:"#DCCEFF"}}>
 
<Clock className="w-7 h-7 text-blue-600"/>
                        </div>
                        <div>
                    <h3 className="text-sm font-medium"> Save Time</h3>
                    <p className="text-gray-600 text-s">Get instant feedback in <br /> seconds</p>
                </div>
                </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-center gap-2">
                    <div className=" w-14 h-14 flex items-center justify-center rounded-full border"
                style={{backgroundColor:"#DCCEFF"}}>
<TrendingUp className="w-7 h-7 text-blue-600"/>
                    </div>
                    <div>
                    <h3 className="text-sm font-medium">Increase Shortlist Chances</h3>
                    <p className="text-gray-600 text-s">Make your resume ATS-friendly <br /> and recruiter ready</p>
                </div>
                </div>
                </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-center gap-2">   
                        <div className=" w-14 h-14 flex items-center justify-center rounded-full border"
                style={{backgroundColor:"#DCCEFF"}}>
                          <Lightbulb className="w-7 h-7 text-blue-600"/>  
                            </div>  
                        <div>           
                    <h3 className="text-sm font-medium">Improve Effectively</h3>
                    <p className="text-gray-600 text-s">Get actionable tips to <br /> improve your resume </p>
                </div>
                </div>
                </div>
                <div className="flex-1">          
                    <div className="flex items-center justify-center gap-2">
                <div className=" w-14 h-14 flex items-center justify-center rounded-full border"
                style={{backgroundColor:"#DCCEFF"}}
                >
                    <Lock className="w-7 h-7 text-blue-600"/>
                </div>
                <div>
                    <h3 className="text-sm font-medium">100% Confidntial</h3>
                    <p className="text-gray-600 text-s">We ensure your data <br /> privacy and security </p>
                </div>
                </div>
                </div>
            </div>
        </div>
        <div className="px-4 py-4 border rounded-xl max-w-7xl mx-auto shadow-xl mt-4 gap-8 mb-4"
        style={{backgroundColor:"#DCCEFF"}}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1 ml-4">
   <Image
   src="/Images/docs.png"
   alt=""
   width={150}
   height={150}
   
   />

                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold">Ready to Build a Winning Result?</h2>
                    <p className="text-gray-600 text-s mt-2">Get your AI-Powered resume review now and take the next <br /> step towards your dream job</p>
                </div>
                <div className="flex-1 flex justify-center">
                    <button className="px-4 py-4 flex items-center justify-center gap-2 text-white rounded-xl shadow-xl"
                    style={{backgroundColor:"blue"}}
                    >
                        <span>Upload Resume </span>
                        
                        <Upload className="w-4 h-4"/>
                        </button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}