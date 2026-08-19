import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"
import { blogs } from "@/Data/data";
import {popularposts} from "@/Data/data";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Blogs() {
  return (
    <>
    <Header />
      <section className="bg-[#F3F0FF] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">
            Blogs & Career Insights
          </h1>

          <p className="text-gray-600 mt-3">
            Explore expert advice, career tips and industry trends and resources to <br />
                   help you grow in your professional journey
          </p>

          <div className="mt-8 max-w-2xl mx-auto flex border rounded-lg overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search articles, topics or keywords"
              className="flex-1 px-4 py-3 outline-none"
            />

            <button style={{ backgroundColor: "blue", color: "white",cursor: "pointer"}}
            className="bg-blue-100 text-blue-600 px-5 py-2 rounded font-semibold hover:bg-blue-200 transition"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
        
          <div className="flex-1 max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="font-semibold text-lg mt-3 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-3 flex-grow">
                      {blog.description}
                    </p>

                    <div className="flex justify-between items-center mt-5 pt-4 border-t">
                      <div>
                        <p className="font-medium text-sm">
                          {blog.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {blog.role}
                        </p>
                      </div>
                     <Link href="/blog1">
                      <button className="text-blue-600 font-medium text-sm hover:text-blue-800">
                        Read More⟶
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white border rounded-xl p-5  shadow-sm sticky ">
              <h3 className="font-semibold text-lg mb-4">
                Categories
              </h3>

              <ul className="space-y-3">
                <li className="cursor-pointer hover:text-blue-600">
                  Career Tips
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Interview Preparation
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Resume Building
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Remote Work
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  Industry Trends
                </li>
              </ul>
            </div>
          </div>
     <div className="w-full lg:w-72 mt-4 shrink-0">
            <div  className="bg-white border rounded-xl p-5  shadow-sm sticky ">
              <h3 className="font-semibold text-lg mb-4">
                Popular Posts
              </h3>
              <hr className="my-4 border-gray-300"/>
              <div className="space-y-4">
                {popularposts.map((item)=>(
                  <div 
                  key={item}
                    className="flex items-center gap-3 mb-4">

                
                    <Image
                    src={item.image}
                    alt=""
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                   
                  />
                
                <div>
                  <h2 className="text-gary-600">{item.demandedskill}</h2>
                  <p className="text-gray-600">  
                  {item.date}</p>
                </div>
                </div>
             ))}
              </div> 
            </div>
            </div>
            </div>
            </div>
            </section>
             <div className="flex items-center justify-center gap-2 mb-8 mt-8">
              <button className="w-8 h-8 rounded border items-center justify-center font-bold text-gary-700">
                <ChevronLeft size={18} />
              </button>
                <button className="w-8 h-8 rounded border font-bold bg-blue-600 text-gray-700 "
                style={{background:"rgb(15, 114, 243)"}}
                >1</button>
                 <button className="w-8 h-8 rounded border font-bold text-gary-700">2</button>
                  <button className="w-8 h-8 rounded border font-bold text-gray-700">3</button>
                   <button className="w-8 h-8 rounded border font-bold text-gray-700">4</button>
                    <button className="w-8 h-8 rounded border font-bold text-gray-700">⋯</button>
                     <button className="w-13 h-8 rounded border font-bold text-gray-700">Next→</button>

              </div>
    <Footer />
    </>
  );
}