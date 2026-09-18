
import { review1 } from "@/Data/data";
import { ChartNoAxesColumnIncreasing,KeyRound,Type,Lock } from "lucide-react";
import Progressbar from '../Progressbar/Progressbar'
export default function Reviewsummary() {
  return (
    <div>
    <div className="max-w-7xl mx-3 sm:mx-4 md:mx-6 lg:mx-auto border shadow-lg mt-4 px-4 sm:px-6 py- ">
      <h3 className="text-lg sm:text-xl font-semibold">AI Review Summary</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">

      

      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full md:w-auto mt-8 gap-6">

        <div className="flex-shrink-0">
          <Progressbar />
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-xl font-medium text-blue-600">
            Great Job!
          </h2>

          <p className="text-base sm:text-lg text-gray-600">
            Your review is strong. A few improvements can <br className="hidden sm:blck" />
            make it excellent.
          </p>
        </div>

      </div>

      <div className="space-y-3 p-0 sm:p-4 w-full md:w-auto">
        {review1.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 sm:gap-4 w-full"
          >
            <span className="flex-shrink-0 w-20 sm:w-24 text-sm sm:text-base">
              {item.label}
            </span>

            <span className="w-full min-w-0 rounded-full bg-gray-200 overflow-hidden">
              <span
                className="block rounded-full"
                style={{
                  backgroundColor: item.color,
                  width:"100%",
                  maxwidth: "200px",
                  height: "12px",
                }}
              ></span>
            </span>

            <span>{item.score}</span>
          </div>
        ))}
      </div>

    </div>
    </div>
    <div className="max-w-7xl mx-3 sm:mx-4 md:mx-6 lg:mx-auto border shadow-lg mt-4 px-4 sm:px-6 py-6">
        <h2 className="text-xl font-bold">Top Suggestions</h2>
        <div className="mt-4">
            <div className="space-y-2">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-12 h-12 border rounded-full flex items-center justify-center"
                style={{backgroundColor:"#DCFCE7"}}
                >
                    <ChartNoAxesColumnIncreasing size={40} strokeWidth={2} className="w-6 h-6 text-blue-600 p-1"/>
                </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-medium">Add more quantifiable achievements</h3>
                        <p className="text-sm sm:text-base text-gray-600 font-medium">Include numbers and metrics to showcase your impact</p>
                    </div>
                    </div>
                    <button className="rounded-xl px-4 py-1 font-semibold "
                     style={{backgroundColor:"#EEF0FF",color:"blue"}}
                    >Impact</button>
                </div>
                    <hr className="border-gray-300"/>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4">
                <div className="w-12 h-12 border rounded-full flex items-center justify-center"
                style={{backgroundColor:"#DCFCE7"}}
                >
                    <KeyRound size={40} strokeWidth={2} className="w-6 h-6 text-blue-600 p-1"/>
                </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-medium">Include more relevent keywords</h3>
                        <p className="text-sm sm:text-base text-gray-600 font-medium">Add keywords related to your target role for better visibility</p>
                    </div>
                    </div>
                    <button className="rounded-xl px-4 py-1 font-semibold "
                     style={{backgroundColor:"#EEF0FF",color:"blue"}}>Keywords</button>
                    </div>
                    <hr className="border-gray-300"/>
                    <div className="flex flex-col md:flex-row gap-4 sm:items-center items-start justify-between">
                    <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-12 h-12 border rounded-full flex items-center justify-center"
                style={{backgroundColor:"#DCFCE7"}}
                >
                    <Type size={40} strokeWidth={2} className="w-6 h-6 text-blue-600 p-1"/>
                </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-medium">Improve formatting in some sections</h3>
                        <p className="text-sm sm:text-base text-gray-600 font-medium">Enhance spacing and consistency for a better readability</p>
                    </div>
                    </div>
                    <button className="rounded-xl px-4 py-1 font-semibold self-start md:self-auto flex-shrink-0"
                     style={{backgroundColor:"#FEF3C7",color:"#D97706"}}>Formatting</button>
                    </div>
                
            </div>
  
        </div>
        
    </div>
    <div className="flex items-center justify-center mt-8 mb-8 gap-2 px-4 text-center">
        <Lock className="w-5 h-5" />
        <p className="text-sm sm:text-base">Your data is secure and confidential</p>
    </div>
    
    </div>
  
  );
}

