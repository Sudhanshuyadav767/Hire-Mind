import { details } from "@/Data/data";
import { strength } from "@/Data/data";
import { improve } from "@/Data/data";
import { Check,SeparatorVertical,BicepsFlexed ,Trophy, BarChart3} from "lucide-react";
export default function Rightsection() {
  const candidate = details[0];

  return (
    <>
    <div className="boder border-gray-100 rounded-lg shadow-sm mt-4 sm:px-6 sm:py-6 px-4 py-4 bg-white rounded-2xl">

      {/* Candidate */}
      <div className="flex gap-6">
        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800">
          <p className="text-white font-bold">A</p>
        </span>

        <span>
          <h3 className="text-lg font-semibold">{candidate.name}</h3>
          <p className="text-sm">{candidate.post}</p>
        </span>
      </div>

      {/* Details */}
      <div className="space-y-4 mt-6">
        {details.slice(1).map((item, index) => {
         const Icon=item.icon;

          return (
            <div
              key={index}
              className="flex justify-between gap-4"
            >
              
              <div className="flex gap-4 items-center">
                <span>
                  <Icon className="w-5 h-5 text-indigo-600" />
                </span>

                <span className="text-base font-medium">{item.title}</span>
              </div>

              <div>
                <p className="sm:text-base text-sm font-medium">
                  {item.score}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
    <div className="bg-white border border-slate-100 shadow-sm sm:px-6 sm:py-6 px-4 py-4 mt-4 rounded-2xl">
      <span className="flex gap-4 items-center mb-4 ">
        <BicepsFlexed className="text-green-400"/>
      <h2 className="sm:text-lg text-sm font-medium ">Top Strengths</h2>
      </span>
    <div className="flex flex-col items-start gap-4 space-y-6">
      {strength.map((item,index)=>( 
     
      <span key={index} className="flex gap-4 shrink-0 ">
        <span className="w-5 h-5 bg-green-600 flex items-center justify-center rounded-full">
<Check className="w-4 h-4 text-white text-medium"/>
        </span>
        <span className="text-base font-medium">{item.Strength}</span>
      </span>
      ))}
      </div>
      <hr className="border-gray-400 mt-4"/>
      <span className="flex gap-4 items-center ">
        <SeparatorVertical className="text-orange-600"/>
        <h3  className="sm:text-lg text-sm font-medium mb-4 mt-4">Areas to improve</h3>
      </span>
      
      <div className="flex flex-col items-start gap-4 space-y-6 mt-4">
      {improve.map((item,index)=>( 
     
      <span key={index} className="flex   gap-4 shrink-0 ">
        <span className="w-5 h-5 bg-orange-300 flex items-center justify-center rounded-full">
<Check className="w-4 h-4 text-orange-600 text-medium"/>
        </span>
        <span className="text-base font-medium">{item.Improve}</span>
      </span>
      ))}
      </div>
    </div>
    
        <div className="bg-white border border-slate-100 flex items-center justify-center mt-4 rounded-2xl">
      
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex items-center justify-center">
        
        <div className="text-center w-full max-w-2xl px-6">

          {/* Circle */}
          <div className="mx-auto mb-4 w-26 h-26 rounded-full bg-[#eeeeff] flex items-center justify-center mt-6">
            
              <Trophy className="w-16 h-16 text-indigo-400"/>
           
          </div>

          {/* Heading */}
          <h1 className="text-lg font-bold text-gray-900 mb-5">
            Keep Improving!
          </h1>

          {/* Text */}
          <p className="text-base text-gray-400 sm:mb-8 mb-6">
            Practice regularly and track your progress to
           
            ace your next interview
          </p>

          {/* Simple Button */}
          <button className="w-full py-4 rounded-xl  bg-[#f1f1ff] text-[#4055d6] mb-6 font-semibold flex items-center justify-center gap-2 transition-all duration-300
                   
                   hover:scale-105
                   hover:shadow-lg">
            <span>
              < BarChart3 className="text-blue-600 font-bold"/>
            </span>
           <span> Practice More Interviews</span>
          </button>

        </div>

      </div>

    </div>

    </>
     
  );
}