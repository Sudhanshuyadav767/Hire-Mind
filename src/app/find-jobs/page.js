
import Header from "@/app/component/common/Header"
import {data} from "@/Data/data"
import {data1} from "@/Data/data"
import {location} from "@/Data/data"
import {data2} from "@/Data/data"
  import Footer from "@/app/component/common/Footer"
import {Mail} from "lucide-react"

import Image from "next/image"
export default function FindJobPage(){
    return(
      <div>
       <Header />
        <main>
       
            <section className="bg-[#F3F0FF] py-4 mx-2 sm:mx-3 md:mx-4 rounded-lg">
                <div className="max-w-8xl mx-auto px-5 py-4">
                  <div className="flex flex-col lg:flex-row justify-between mr-5">
                    <div className="mb-6"> 
                    <div className="inline-block bg-white px-4 py-2 rounded-full text-sm border font-medium text-[#2563EB] mt-5" >
                        AI- powered Job Portal
                    </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5x font-bold mt-6">
                    Find Job
                  </h1>
                  <p className="text-gray-600 mt-3">
                    Discover the best job opportunities <br /> and build your dream career
                  </p>
                  </div>
                  <div>
                  <div className=" w-full rounded-xl p-4 mt-8 flex flex-col lg:flex-row gap-4">
                    <input 
                    type="text"
                    placeholder="Job tittle or company"
                    className="flex-1 border rounded-lg px-4 py-3 outline-none hover:shadow-2xl transition-all duration-300"                    
                    />
                    <input
                    type="text"
                    placeholder="Location"
                    className="w-full lg:flex-1 border rounded-lg px-4 py-3 outline-none hover:shadow-2xl transition-all duration-300"/>
                  <div className="flex items-center gap-2">
                    <Mail size={26}
                    className="text-gray-500"/>
                    <p className="text-gray-500">All Categories</p>
                  </div>
                    

                    <button className="w-full lg:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)] transition-all duration-300 ">Search Job</button>
                  </div>
                  <div className="flex gap-3 mt-6 flex-wrap gap-2">
                    <p className="text-gray-600 font-bold gap-5 mt-2 ml-3">Popular Search</p>
                  <span className="bg-white px-4 py-2 rounded-full text-sm">Web Development</span>
                  <span className="bg-white px-4 py-2 rounded-full text-sm">App Development</span>
                  <span className="bg-white px-4 py-2 rounded-full text-sm">UI/UX Designer</span>
                  <span className="bg-white px-4 py-2 rounded-full text-sm">Product Manager</span>
                  </div>
                  </div>
                </div>
                </div>

            </section>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 w-full px-2 sm:px-4 md:px-6 lg:px-8">
              <div>
            <aside className="w-full lg:w-72 shrink-0">
  <div className="w-full bg-white border border-gray-200 rounded-lg p-4 sm:p-5 lg:sticky lg:top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button className="text-sm text-blue-600 font-medium" >Reset All</button>
              </div>
             <div className="text-sm font-bold mb-3">Job Type</div>
             <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>All Job Type</span>
              </label>
    
                  <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>Full TIme</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>Part Time</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>Remote</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>Internship</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>Freelance</span>
              </label>
             </div>
             <hr className="my-4 border-gray-300"/>
             <div className="text-sm font-bold mb-3 mt-3">Experience Level</div>
             
             <div className="space-y-2">
              {data1.map((item)=>(
             <div
             key={item}>
              <label
              
            className=" flex items-center gap-2"
               >
                <input type="checkbox"/>
                <span>{item.label1}({item.count1})</span>
              </label>

               <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>{item.label2}({item.count2})</span>
              </label>
               <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>{item.label3}({item.count3})</span>
              </label>
               <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>{item.label4}({item.count4})</span>
              </label>
               <label className="flex items-center gap-2">
                <input type="checkbox"/>
                <span>{item.label5}({item.count5})</span>
              </label>
              </div>
              ))}
             </div>
             
             
             
             <hr className="my-4 border-gray-300"/>
             <div className="pb-5 mt-3">
                <div className="flex justify-between items-center mb-1" ></div>
               <h3 className="text-sm font-bold mb-3">Salary Range</h3>
             </div>
             <input
             type="range"
             min="0"
             max="5000000"
             className="w-full accent-purple-600"
             />
             <div className="flex gap-2 mt-4">
              <input
              type="text"
              placeholder="0"
              className="w-1/2 border rounded-md px-3 py-2 text-sm outline-none"
              />
               <input
              type="text"
              placeholder="5000000"
              className="w-1/2 border rounded-md px-3 py-2 text-sm outline-none"
              />
             </div>
             <hr className="my-4 border-gray-300"/>
             <div className="text-sm font-bold mb-3 mt-3">Location</div>
             
             <div>
              <input
              type="text"
                    placeholder="Search Location"
                    className="flex-1 border rounded-lg px-4 py-3 outline-none hover:shadow-2xl transition-all duration-300"                    
                    />
             </div>
             <div className="space-y-2 mt-3">
              {location.map((item)=>(
                <div
                  key={item}>
              <label className="flex items-center gap-2">
              <input type="checkbox"/>
              <span>{item.location1}({item.count1})</span>

              </label>
              <label className="flex items-center gap-2">
              <input type="checkbox"/>
              <span>{item.location2}({item.count2})</span>
                </label>
              
              <label className="flex items-center gap-2">
              <input type="checkbox"/>
              <span>{item.location3}({item.count3})</span>

              </label>
              <label className="flex items-center gap-2">
              <input type="checkbox"/>
              <span>{item.location4}({item.count4})</span>

              </label>
              <label className="flex items-center gap-2">
              <input type="checkbox"/>
              <span>{item.location5}({item.count5})</span>

              </label>
              </div>
))}
             </div>
             <button className="text-blue-600 text-sm font-medium mt-2 hover:underline items-center">+Show More</button>
            </div>
            </aside>
            </div>
            <div className="w-full">
              <div>
              {data2.map((item)=>(
            <div  key={item}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-2 border-b pb-3 text-sm font-medium">
            
              <button className="text-blue-600 pb-2">{item.jobtype1}({item.count1})</button>
              <button className="text-gray-600 hover:text-blue-600 pb-2">{item.jobtype2}({item.count2})</button>
               <button className="text-gray-600 hover:text-blue-600 pb-2">{item.jobtype3}({item.count3})</button>
                <button className="text-gray-600 hover:text-blue-600 pb-2">{item.jobtype4}({item.count4})</button>
                 <button className="text-gray-600 hover:text-blue-600 pb-2">{item.jobtype5}({item.count5})</button>
                  <button className="text-gray-600 hover:text-blue-600 pb-2">{item.jobtype6}({item.count6})</button>
            </div>
            ))}
            </div>
            <div className="flex justify-between items-center mt-6 mb-4">
              <p className="text-sm text-gray-500">Showing 1-10 of 6,420 jobs</p>
              <div className="flex justify-between items-center gap-3">
                <span className="text-sm text-gray-500">Sort by</span>
                <select className="border rounded-md px-3 py-2 text-sm outline-none hover:shadow-2xl transition-all duration-300">
                  <option>Most Relevent</option>
                </select>
                <button className="rounded-md p-2 text-xl hover:shadow-2xl transition-all duration-300">☰</button>
                <button className=" rounded-md p-2 text-3xl hover:shadow-2xl transition-all duration-300">⊞</button>
              </div>
              </div>
              <div className="max-w-7xl mx-auto  border rounded-xl p-5 bg-white">
                <h2 className="text-lg font-semibolld mb-4">Top 10 Companies</h2>

              <div className="grid grid-cols-5 gap-4">
                {Array.from({length:10}).map((_,index)=>(

                
                <div 
                key={index}
                className="border rounded-lg p-4 flex items-enter justify-center hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300"
                >
                  <Image
                  src="/logo/google1.png"
                  alt=""
                  width={120}
                  height={40}

                  />
                </div>
                ))}
              </div>
            </div>
            <div className="grid grid  ">
                {data.map((item)=>(
                  
            <div
            key={item.id}
            className="border rounded-xl bg-white p-5 mt-4">
            <div className="flex justify-between">
              
              <div className="rounded-lg flex gap-4">
                <div className="w-15 h-15 mt-3  rounded-lg flex items-center justify-center">
                  <Image 
                  src="/logo/google.jpg"
                  alt=""
                  width={120}
                  height={40}
                  />
                </div>
                <div className="rounded-lg flex-col">
                  
                  <h3 className="text-gray-600 font-bold">{item.title}</h3>
 
                   <div className="flex items-center gap-2 text-sm text-gray-500">
        <p>{item.companyname}</p>
        <span className="text-blue-500">✔️</span>
      </div>

      <p className="text-sm text-gray-500 mt-1">
       {item.location}
      </p>
      <div className="flex gap-4 mt-2 text-sm text-gray-500">
        <span>💼{item.year}</span>
        <span>🕒 {item.jobtype}</span>
        <span>💰{item.package} </span>
      </div>
              </div>
               
            </div>
             
          <div className="flex flex-col items-end gap-3">
    
  <span className="bg-green-100 px-3 py-1 rounded-full text-sm flex items-center justify-center w-full sm:w-fit">
  <span className="text-green-600">
    {item.jobtype}
  </span>
</span>

    <p className="text-sm text-gray-400">
      {item.postedAt}

    </p>

  </div>
   
  </div>
 
            </div>
            ))}
             
            
            </div>
             
            </div>
             
            </div>
        </main>
        <Footer />
        </div>
    )
  }