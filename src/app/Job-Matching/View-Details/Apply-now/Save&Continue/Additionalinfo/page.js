import Link from "next/link"
import { Applynow } from "@/Data/data1"
import {ArrowLeft} from "lucide-react"
import Additionalinfo from "@/app/component/Apply-now/SaveContinue/AdditionalInfo/Left"
import Page2 from "@/app/component/Apply-now/SaveContinue/AdditionalInfo/Right"
export default function AdditionalInfo(){
    return(
        <>
<section className="w-full bg-[#f0efff] ">
<div className="max-w-7xl mx-auto sm:px-6 sm:py-6 px-4 py-4 mt-16">
            <Link
            href="/Job-Matching"
            className="group inline-flex items-center gap-2 text-black hover:text-indigo-600 transition-all duration-200"
          >
            <ArrowLeft
              size={20}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />

            <span>Back to Job</span>
          </Link>
          {Applynow.map((item,index)=>(
          <div
          key={index}
          >
<h1 className="sm:text-lg text-sm font-bold">{item.apply}</h1>
          <div className="mt-4 flex">
            <span className="text-gray-600"> 🏢 {item.company}</span>
            <span className="text-gray-600">📍 {item.location}</span>
            <span className="text-gray-600"> ⏰ {item.jobtype}</span>
           
          </div>
          </div>
          ))}
</div>
</section>
  <div
        className="
          flex flex-col lg:flex-row items-stretch px-2 sm:px-4 max-w-7xl mx-auto  mt-4 sm:mt-6 gap-4"
    >
 <div className="w-full lg:flex-1 min-w-0">
          <Additionalinfo />
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[100%] lg:w-[380px] lg:shrink-0">
  <Page2 />
</div>

      </div>

        </>
    )
}