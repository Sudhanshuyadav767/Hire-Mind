 import Header from "@/app/component/common/Header"
   import Footer from "@/app/component/common/Footer"
import Image from "next/image";
import JobMatching from "../component/Job-Matching/JobMatching"
import JobMatchingright from "../component/Job-Matching/JobMatchingright"
export default function JobMatchings() {
  return (
    <>
    <Header />
    <section className=" px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto w-full gap-8 bg-[#F3F0FF] px-4 py-4">
        
        <div className="w-1/2">
          <h1 className="text-5xl font-bold">
            AI Job Matching
          </h1>

          <p className="text-gray-600 text-xl mt-2">
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
    <div className="px-4 py-4 border rounded-xl flex flex-col md:flex-row gap-8 items-center justify-between"
      style={{backgroundColor:"#B8ADFF"}}>
      <div className="flex">

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
    </section>
    <Footer />
    </>
  );
}