import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"
import {Check ,FileText,CheckCircle} from "lucide-react"
import Image from "next/image"
import Reviewsummary from "../component/Review-summary/Reviewsummary"
export default function resumeuploded(){
    return(
        <>
        <Header />
        <div className="max-w-7xl mx-auto w-full bg-[#F3F0FF] px-6 py-6 flex flex-col md:flex-row justify-between">
            <div>
                <div  className="items-center justify-center flex gap-2">
                <span className="rounded-full w-8 h-8 gap-2 flex items-center justify-center font-semibold"
                style={{backgroundColor:"#DCFCE7"}}
                >
                    <Check className="text-green-600 "/>
                </span>
                <span className="text-2xl font-bold">Resume Uploded Successfully!
                   
                </span>
                
                </div>
                <span className="ml-8">Your resume is ready for AI review</span>
                <div className="bg-white shadow-sm mt-8 px-4 py-4 flex flex-col md:flex-row items-center justify-between">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div
                        style={{color:'blue'}}
                        >
                    <FileText size={40} strokeWidth={1.5}/>
                        </div>
                         <div> 
                            <h3 className="text-xl font-semibold">Aman_Singh_Resume.pdf</h3>
                            <p className="text-sm text-gray-600">234KB</p>
                         </div>
                    </div>
                    <span className="w-6 h-6  border-green-600 rounded-full flex item-center justify-center">
                 <CheckCircle className="w-2 h-2 text-green-600" strokeWidth={2.5} />
                 </span>
                </div>
            </div>
            <Image
            src="/Images/docs.png"
            alt=""
            width={300}
            height={300}
            className="px-6 py-6 flex flex-col md:flex-row justify-between"
            />           


        </div>
        <div>
            <Reviewsummary />
        </div>
        <Footer />
        </>
    )
}