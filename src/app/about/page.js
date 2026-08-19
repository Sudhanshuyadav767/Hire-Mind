 import Header from "@/app/component/common/Header"
   import Footer from "@/app/component/common/Footer"
import Image from "next/image";
import { statsData, teamData } from "@/Data/data";
import{
  Goal,
  Eye
} from "lucide-react";

export default function AboutUs() {
  return (
    <div>
      <main>
<Header />
      
      <section className="bg-[#F3F0FF] py-8">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 items-center gap-10">

            <div>
              <p className="text-blue-600 font-medium mb-2">
                About Us
              </p>

              <h1 className="text-5xl font-bold leading-tight">
                Empowering Career.
                <br />
                Building{" "}
                <span className="text-blue-600">
                  Futures.
                </span>
              </h1>

              <p className="text-gray-600 mt-5">
                At HireMind AI, we believe every talent deserves the right
                opportunity. Our AI-powered platform connects job
                 seekers with employers,provides smart career guidance
                 and helps you grow at every step of your journey
              </p>

   <button style={{ backgroundColor: "blue", color: "white" }}
  className="mt-6 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
  Join Our Mission →
</button>
            </div>

            <div>
              <Image
                src="/Images/about.jpeg"
                alt=""
                width={600}
                height={400}
                className="w-full"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="w-full mx-auto px-6 py-10 mt-4">
  <div className="grid md:grid-cols-4 gap-5">

    {statsData.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={item.id}
          className="bg-white border rounded-xl p-5 shadow-sm"
        >
          <div className="flex gap-3">
          <div className="flex items-center">
          <div className="text-4xl bg-[#F3F0FF]">
            <Icon size={50} />
          </div>
</div>
<div>
          <h2 className="text-3xl font-bold mt-3">
            {item.number}
          </h2>

          <h3 className="font-semibold">
            {item.title}
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            {item.description}
          </p>
          </div>
          </div>
        </div>
      );
    })}

  </div>
  
</section>

      
   <section className="w-full mx-auto px-6 mt-4 py-10">
  <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-white p-8 rounded-xl flex border gap-3  items-center" >
            <div className="bg-white p-8 rounded-xl border ml-2 flex items-center justify-center min-h-[250px] gap-4">
  <Goal size={50} className="text-blue-600" />
</div>
<div>
            <h2 className="text-3xl font-bold text-blue-600">
              Our Mission
            </h2>

            <p className="mt-4 text-gray-600">
              To empower individuals to achieve their career
              goals by connecting them with right opportunities.
              leveraging AI technology and expert guidance
            </p>
            </div>
          </div>

          <div className="bg-[#eefdf3] p-8 h-6xl flex rounded-xl border">
            <div className="flex items-center gap-3">
    <div className="bg-white p-8 rounded-xl border flex items-center ml-2 justify-center min-h-[250px] gap-4">
  <Eye size={50} className="text-blue-600" />
</div>
<div>
            <h2 className="text-3xl font-bold text-green-600">
              Our Vision
            </h2>

            <p className="mt-4 text-gray-600">
              To become the world's most trusted career
              platform, transforming the way people Discover
              opportunites and build meaningful careers.
            </p>
            </div>
            </div>
          </div>

        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-6 mt-4 pb-16">

        <h2 className="text-4xl font-bold text-center">
          Meet Our Team
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-10">
          Passionate professionals working together to
          revolutionize hiring.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-4">

          {teamData.map((member) => (
            <div
              key={member.id}
              className="border rounded-xl p-5 text-center shadow-sm hover:shadow-lg duration-300"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className="mx-auto rounded-full"
              />

              <h3 className="font-bold text-lg mt-4">
                {member.name}
              </h3>

              <p className="text-gray-500">
                {member.role}
              </p>

              <div className="flex justify-center gap-3 mt-4">
                <button
  style={{ backgroundColor: "#2563eb" }}
  className="w-8 h-8 border rounded-full text-white"
>
  in
</button>

                          <button
  style={{ backgroundColor: "black" }}
  className="w-8 h-8 border rounded-full text-white"
>
  X
</button>

                        <button
  style={{ backgroundColor: "#F0F9FF" }}
  className="w-8 h-8 border rounded-full text-white"
>
  ✉️
</button>
              </div>
            </div>
          ))}

        </div>

      </section>
      </main>
<Footer />
    </div>
  );
}