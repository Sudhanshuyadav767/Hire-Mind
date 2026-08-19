 import Header from "@/app/component/common/Header"
  import Footer from "@/app/component/common/Footer"
  import Link from "next/link";
import {
  FileText,
  Briefcase,
  TrendingUp,
  GraduationCap,
  ClipboardCheck,
   BookOpen,
   Bot,
   MessageSquare
  
 
} from "lucide-react";
import Image from "next/image";

export default function AIServicesPage(){
    const service=[
                {
                    title:"AI Resume Review",
                    description:" Get your resume analyzed by AI and receive suggestions to improve your chances getting hired",
                    Link:"resume-review",
                    icon:FileText
              
                },
                {
                    title:"AI Job Matching",
                    description:"Find the most relevant job opportunity that match your skill,experience nd performances.",
                    Link:"Job-Matching",
                    icon:Briefcase
              
                },
                {
                    title:"AI Career Guidance",
                    description:"Get personalized career advice skill recommmandtion and roadmaps powered by AI.",
                     Link:"Career-Guidance",
                    icon:TrendingUp
                   
                },
                {
                    title:"AI Mock Interview",
                    description:"Practice real interview questions with AI,get feedback and improve your confidence.",
                  Link:"Mock-Interview",
                    icon:MessageSquare
              
                },
                {
               title:"Skill Assessment ",
               description:"take AI-powered tests,evaluate your skill and get detailed perfomance insights.",
            Link:"Skill-Assessment",
               icon:ClipboardCheck 
              
            },
                {
                    title:"AI Learning",
                    description:"Learn new skill or personalized AI Learning.",
                    Link:"AI-Learning",
                    icon:BookOpen
                   
                },
                {
                    title:"AI Career Chatbot",
                    description:"Ask anything about jobs, career,skill and more, Get instant smart answer.",
                      Link:"Career-Chatbot",
                    icon:Bot
                  
                },
                {
                    title:"Learning Recommendation",
                    description:"Discover personalized courses and resources to upsikll and grow faster in your career.",
                     Link:"Learning-Recommendation",
                    icon:GraduationCap
                   
                }
            ]
    return(
        <div>
        <Header />
        <main>
            <section className="bg-[#F3F0FF] px-10 py-1">
                <div className="grid md:grid-cols-2 items-center gap-10">
                    <div>

                    
                   <h1 className="text-5xl font-bold">AI Services</h1>
                   <h2 className="mt-4 text-2xl font-medium">
                    Smart AI-powered tools to boost your career joureny
                   </h2>
                   <p className="mt-4 text-gray-600 text-xl">
                    Our AI Services are designed to help you find the right
                    opportunites,improve your skills,and achieve your career goal faster
                   </p>
                </div>
                <div>
                    <Image
                    src="/Images/Robot.jpeg"
                    alt=" "
                    height={600}
                    width={900}
                     />

       </div>
                 </div>
                 </section>
                 <section className="px-10 py-2">
                 <div>
                    <h2 className="mt-4 text-2xl font-medium">Our AI-Powered Services</h2>
                 <p className="text-gray-500 mt-3">Leverage the power of AI to enhance your profile,prepare better,and get hired faster.</p>
            </div>
            </section>
           
            <div className="grid md:grid-cols-4 gap-5 mt-14 mx-6 md:mx-10" >
   {
    service.map((service,index)=>{
     const Icon = service.icon;
     return(
    <div
  key={index}
  className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
>
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-[#F3F0FF] rounded-lg flex items-center justify-center shrink-0">
    <Icon size={28} className="text-[#5B4BDB]" />

    
    
</div>
    <div>
      <h3 className="font-semibold text-lg">
        {service.title}
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        {service.description}
      </p>
<Link href={`/${service.Link}`}>
      <button className="mt-4 w-8 h-8 rounded-full bg-[#E3E4F8] text-[#5B4BDB] flex items-center justify-center font-semibold">
        ➝
      </button>
      </Link>
    </div>
  </div>
</div>
)
})

    
}
            </div>
            <section className="px-10 py-8">
                <div className="bg-[#F3F0FF] rounded-2xl p-6 flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Image 
                        src="/AI-Icon/Robot1.jpeg"
                        alt=""
                        width={150}
                        height={150}
                        />
                        <div>
                            <h2 className="text-3xl font-bold">Experience the power of AI in your career joureny</h2>
                            <p className="text-gray-600 mt-2">
                                Our AI tools are continuously improving to provide you with the best career guidance and opportunities
                            </p>

                        </div>
                    </div>
                    <div>
                        <button className="bg-[#5B4BDB] text-white px-6 py-3 rounded-lg font-medium">Try AI ChatBot Now</button>
                        <p className="text-gray-500 text-sm mt-2">Available 24/7 to assist you</p>
                    </div>
                </div>


            </section>
        </main>
        <Footer />
        </div>
        
    )
}