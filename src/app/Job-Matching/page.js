
import Image from "next/image";
import JobMatching from "../component/Job-Matching/JobMatching"
import JobMatchingright from "../component/Job-Matching/JobMatchingright"

export default function JobMatchings() {
  return (
    <>

    <section className=" max-w-7xl mx-auto ">
      <div className=" bg-[#F3F0FF]">
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto  gap-8 px-4 py-4 border border-slate-100 rounded-2xl">
        
        <div className="w-1/2">
          <h1 className="text-2xl font-bold">
            AI Job Matching
          </h1>

          <p className="text-gray-600 text-base mt-2">
            Find the most job opportunities that match your skills, 
            <br />
            experience, and career goals
          </p>
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
      </div>
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-4 gap-4 px-2 sm:px-4 items-stretch">

  {/* LEFT */}
  <div className="w-full lg:flex-1 min-w-0">
    <JobMatching />
  </div>

  {/* RIGHT */}
  <div className="w-full lg:w-[380px] lg:shrink-0">
    <JobMatchingright />
  </div>

</div>
<div className=" max-w-7xl mx-auto">
    <div className="px-4 py-4  rounded-xl bg-[#B8ADFF] flex flex-col md:flex-row gap-8 items-center justify-between mb-4"
>
      <div className="flex bg-[#B8ADFF] ">

        <Image
        src="/Images/bag.png"
        alt=""
        width={100}
        height={100}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">Get Better matches!</h2>
        <p className="text-gray-600 text-sm">Complete your profile,take skill test and keep your resume updated</p>
      </div>
      <div>
        <button className="text-blue-600 px-4 py-4 shadow-sm rounded-xl cursor-pointer bg-white">Improve Profile➜</button>
         </div>
    </div>
    </div>
    </section>
    
    </>
  );
}