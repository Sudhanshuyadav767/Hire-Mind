import {scoreData} from "@/Data/data";
import { performanceData } from "@/Data/data";
import { Sparkles ,Lightbulb} from "lucide-react";
const categoryStyles = {
  purple: "bg-purple-100 text-purple-600 border-purple-200",
  green: "bg-emerald-100 text-emerald-600 border-emerald-200",
  orange: "bg-orange-100 text-orange-600 border-orange-200",
};

const feedbackStyles = {
  green: "text-emerald-400",
  blue: "text-blue-500",
  yellow: "text-amber-400",
};
export default function leftsection(){
  return(
    <>
    <div className="flex flex-col md:flex-row md:items-center justify-center sm:px-6 sm:py-6 px-4 py-4 rounded-2xl border border-gray-200 gap-6 rounded-lg mt-4 bg-white">
      <div className="w-full md:w-auto flex flex-col items-center md:items-star">
        <h2 className="text-lg font-bold text-gray-900 mb-8">Overall Performance</h2>
       
<div>
  {(() => {
    const score = 84;
    const percentage = Math.min(Math.max(score, 0), 100);

    return (
      <div
        className="relative h-[150px] w-[150px] rounded-full"
        style={{
          background: `conic-gradient(
            #05eb3fd0 ${percentage * 3.6}deg,
            #e5e5ff ${percentage * 3.6}deg
          )`,
        }}
      >
        <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-white">
          <span className="text-[25px] font-semibold text-green-600">
            {percentage}
          </span>

          <span className="mt-1 text-[15px] text-gray-500">
            /100
          </span>
        </div>
      </div>
    );
  })()}
</div>

      </div>
      <div className="w-full"> 
           

      <h2 className="text-lg font-bold text-gray-900 mb-8">
        Score Breakdown
      </h2>

      <div className="space-y-4">

        {scoreData.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-4"
          >

            {/* Icon */}
            <div
              className="w-10 h-10 rounded-base flex items-center justify-center shrink-0 text-2xl font-bold"
              style={{
                backgroundColor: item.bgColor,
                color: item.color
              }}
            >
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-1">

              {/* Title + Score */}
              <div className="flex items-center justify-between mb-4">

                <h3 className="text-base font-semibold text-gray-800">
                  {item.title}
                </h3>

                <span
                  className="text-base font-bold"
                  style={{ color: item.color }}
                >
                  {item.score}/100
                </span>

              </div>

              {/* Progress */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden ">

                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${item.score}%,`,
                    backgroundColor: item.color
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    

      </div>
    </div>
{/*Question performance*/}
     <div className="w-full max-w-5xl mx-auto p-6 bg-white  shadow-sm border border-slate-100 mt-4 rounded-2xl">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Question Performance
      </h2>

      <div className=" rounded-2xl  overflow-hidden p-2 sm:p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Header */}
            <thead>
              <tr className="bg-slate-50/80 rounded-xl text-slate-600 text-sm font-semibold">
                <th className="py-4 px-4 rounded-l-xl w-12">#</th>
                <th className="py-4 px-4">Question</th>
                <th className="py-4 px-4 text-center">Category</th>
                <th className="py-4 px-4 text-center">Score</th>
                <th className="py-4 px-4 rounded-r-xl">Feedback</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {performanceData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-5 px-4 font-semibold text-slate-700">
                    {item.id}
                  </td>
                  <td className="py-5 px-4 font-semibold text-slate-800 max-w-md">
                    {item.question}
                  </td>
                  <td className="py-5 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        categoryStyles[item.categoryType]
                      }`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-center font-bold text-emerald-500">
                    {item.score}
                  </td>
                  <td
                    className={`py-5 px-4 font-semibold ${
                      feedbackStyles[item.feedbackType]
                    }`}
                  >
                    {item.feedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="border border-slate-100 sm:px-6 sm:py-6 px-4 py-4 mt-4 shadow-sm bg-white rounded-2xl">
      <h3 className="sm:text-base text-sm font-semibold flex items-center gap-4 mb-2">
 <Sparkles className="text-blue-600"/>
        AI Interview Feedback
      </h3>
      <p className="text-sm font-medium">Aman demonstrate a solid understanding of core computer science coccepts and solve most problems efficients.They wrote clean code and communicated their 
        thought process clearly .With more focus on edge cases and optimization,they can perform even better in complex scenarios.   
      </p>
      <div className="border border-slate-100 sm:px-6 px-4 sm:py-4 py-2 bg-[#F3F0FF] rounded-xl mt-4">
        <span className="flex gap-4">
        <span>
          <Lightbulb className="text-blue-600"/>
        </span>
        <span>
        <p className="text-blue-500 font-medium">
          Pro Tip
        </p>
        <p className="text-sm font-medium">practice solving problems with different approaches and focus on optimizing for time and space complexity.Also,explore more 
          system design case studies.
        </p>
        </span>
        </span>
      </div>
    </div>
    </>
  )
}