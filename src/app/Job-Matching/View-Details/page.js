import { ArrowLeft ,Bookmark} from "lucide-react";
import Left from "../../component/View-Details/Left"
import Right from "@/app/component/View-Details/Right";

   import Link from "next/link";
export default function ViewDetails() {
  return (
    <>

      <div className="bg-[#f0efff] sm:px-6 sm:py-6 px-4 py-4 max-h-[3xl]">
       <div className="max-w-7xl mx-auto">
       <button className="group flex items-center gap-2 text-black transition-all duration-200 hover:text-indigo-600">
  <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />

  <Link href="/Job-Matching">
    <span className="transition-colors duration-200 group-hover:text-indigo-600">
      Back to Job
    </span>
  </Link>
</button>
    </div>
      
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-4 gap-4 px-2 sm:px-4 items-stretch">
        <div className="w-full lg:flex-1 min-w-0">
            <Left />
        </div>
       <div className="w-full lg:w-[380px] lg:shrink-0">
<Right/>
       </div>
    </div>
    </div>
  
    </>
  );
}