import { FileDown,  Check } from "lucide-react";
import Header from "@/app/component/common/Header"
   import Footer from "@/app/component/common/Footer"
import Leftsection from "../../component/Score36/Leftsection";
import RightSection from "../../component/Score36/Rightsection";

export default function score(){
return(
    <>
    <Header />
    <section className="max-w-7xl mx-auto bg-[#f0efff] px-6 py-6 ">
    <div className="flex flex-col lg:flex-row justify-between border border-gray-200 rounded-2xl shadow-base sm:px-6 sm:py-6 px-4 py-4 gap-6 bg-white">
        <div className="flex gap-4 items-center justify-center">
            <span className="w-8 h-8 min-h-8 min-w-8 flex items-center justify-center bg-green-600 rounded-full">
    <Check className="w-6 h-6 text-white"/>
            </span>
            <span>
                <h3 className="sm:text-lg text-base font-semibold">Interview Completed</h3>
                <p className="text-gray-600">Your Interview for the role of software Engineerhas been completed</p>
            </span>
        </div>
        <div className="bg-indigo-600 px-4 py-2 rounded-xl cursor-pointer flex items-center justify-center transition-transform duration-100
  hover:brightness-110 active:scale-75 active:brightness-100 gap-2">
<FileDown className="text-white w-6 h-6"/>
<span  className="text-white">Download Report</span>
        </div>
    </div>
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-4 gap-4 px-2 sm:px-4 items-stretch">
        <div className="w-full lg:flex-1 min-w-0">
            <Leftsection />
        </div>
        <div>
            <RightSection />
        </div>
    </div>
    <div className="bg-[#E6E4FF] px-4 py-4 border border-slate-100 shadow-sm mt-4 rounded-2xl">
        <span className="text-base font-medium">This report is AI -generated based on your interview performance and response.For any concerns,please contact our support team.</span>
    </div>
    </section>
    <Footer />
    </>
)
}