
import ApplicationSuccess1 from "@/app/component/Apply-now/SaveContinue/AdditionalInfo/ReviewRating/Submit/Left"
import Page5 from "@/app/component/Apply-now/SaveContinue/AdditionalInfo/ReviewRating/Submit/Right"
export default function Submit(){
    return(
        <>
        <section className="min-h-20 bg-[#f0efff]"></section>
        <div
                className="
                  flex flex-col lg:flex-row items-stretch px-2 sm:px-4 max-w-7xl mx-auto  gap-4"
            >
         <div className="w-full lg:flex-1 min-w-0">
                  <ApplicationSuccess1 />
                </div>
        
                {/* RIGHT */}
                <div className="w-full md:w-[100%] lg:w-[380px] lg:shrink-0">
          <Page5 />
        </div>
        
              </div>
        </>
    )
}