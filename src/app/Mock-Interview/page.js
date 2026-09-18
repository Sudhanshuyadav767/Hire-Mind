import Image from "next/image"
import { Monitor, UserRound ,FileText} from "lucide-react";
import MockInterview from "../component/MOck-Interview/MockInterview";
import RecentMock from "../component/MOck-Interview/RecentMock";
import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"
export default function Mockinterview(){
    return(
        <>
        <Header />
        <div className="bg-[#F3F0FF] px-4 py-4 sm:px-6 sm:py-6 flex flex-col md:flex-row justify-between">
            <div>
                <h1 className="text-xl sm:text-3xl font-bold">AI Mock Interview</h1>
                <p className="text-blue-600 sm:text-base text-sm">
                    Pratice Smarter, Interview Better, Get Hired.
                </p>
                <p className="text-sm sm:text-base">
                    Experience realistic AI-powered mock interviews toilored to your role,
                    industry and experience level. Get instant feedback to boost your confidence and performance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-between mt-4 gap-4">
            <div className="">
                <span  className="flex gap-4 w-full">
                <span className=" bg-[#C5B8FF] flex items-center justify-center rounded-full w-12 h-12 min-w-12 min-h-12">
                    <Monitor  className="w-6 h-6 text-blue-600"/>
                </span>
                <span>
                <h2 className="sm:text-lg text-base font-semibold">Realistic Experience</h2>
                <p className="sm:text-base text-sm">AI simulates real interview scenarios.</p>
                </span>
                </span>
            </div>
            <div>
                <span className="flex gap-4 w-full">
                <span className="  bg-[#C5B8FF] flex items-center justify-center rounded-full w-12 h-12 min-w-12 min-h-12 ">
                    <FileText className="w-6 h-6 text-blue-600" />
                </span>
                <span>
                <h2  className="sm:text-lg text-base font-semibold">Instant Feedback</h2>
                <p className="sm:text-base text-sm">Get detailed insights and improvement tips.</p>
                </span>
                </span>
            </div>
            <div>
                <span className="flex gap-4 w-full ">
           <span className="relative inline-flex w-6 h-6  bg-[#C5B8FF] flex items-center justify-center rounded-full w-12 h-12 min-w-12 min-h-12">
  <Monitor className="w-6 h-6 text-blue-600" />
  <UserRound
    size={16}
    className="absolute bottom-0 left-1/2 -translate-x-1/2 text-blue-600 w-6 h-6"
  />
</span>
                    <span>
                <h2  className="sm:text-lg text-base font-semibold">Performance Score</h2>
                <p className="sm:text-base text-sm">Track your progress and improve continuously</p>
                </span>
                </span>
            </div>

                </div>
            </div>
            <div>
                <Image
                src="/Images/human3.png"
                alt=""
                width={400}
                height={400}
                
                />
            </div>
        </div>
        <div>
            <MockInterview />
        </div>
        <div>
            <RecentMock />
        </div>\
        <Footer />
        </>
    )
}