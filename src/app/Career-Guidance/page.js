import Image from "next/image"
import LeftCareerGuidance from '../component/Career-guidance/LeftCareer-guidance'
// import RightCareerGuidance from '../component/Career-guidance/RightCareer-guidance'
import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"
export default function careerGuidance(){
    return(
        <>
        <Header />
       <div>
        <div className="max-w-8xl mx-auto bg-[#F3F0FF] w-full flex flex-col md:flex-row w-full justify-between px-4 py-4 sm:px-6 sm:py-4 ">
            <div className="">
                <h1 className="text-xl sm:text-4xl font-bold">AI Career Guidance</h1>
                <p className="text-sm text-base text-gray-600">Get personalized recommendation,skill insights,and setp-by-step guidance to achieve your goals</p>
            </div>
            <div>
                 <Image
                    src="/Images/Robot1.png"
                    alt="Robot"
                    width={300}
                    height={300}
                    
                    className="w-full h-auto"
                  />
            </div>
        </div>
        <div className="flex flex-col lg:flex-row  mt-4 gap-4 px-2 sm:px-4 items-stretch mb-4">
               
            <div className="w-full lg:flex-1 min-w-0">
                 <LeftCareerGuidance />
            </div>
            <div className="w-full lg:w-[400px] lg:shrink-0">
                {/* <RightCareerGuidance /> */}
            </div>
        </div>
       </div> 
     <Footer />
      </>
    )
}