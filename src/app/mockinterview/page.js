const Info = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="text-2xl mb-2">
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-base font-semibold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
};

const Divider = () => {
  return <div className="border-t border-gray-200" />;
};
import Link from "next/link";
import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"
export default function MockInterviewStart() {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-[#f0f0ff] flex flex-col items-center px-4 py-10">

      {/* Robot */}
      <div className="w-32 h-32 rounded-full bg-[#e9e8ff] flex items-center justify-center mb-5">
        <div className="relative">
          <div className="w-24 h-14 rounded-3xl bg-[#24235c] flex items-center justify-center gap-5">
            <span className="text-cyan-400 text-xl">⌒</span>
            <span className="text-cyan-400 text-xl">⌒</span>
          </div>

          <div className="absolute -left-3 top-4 w-3 h-8 bg-[#5654d9] rounded-full" />
          <div className="absolute -right-3 top-4 w-3 h-8 bg-[#5654d9] rounded-full" />

          <div className="absolute -top-5 left-3 w-18 h-7 border-4 border-[#5654d9] border-b-0 rounded-t-full" />

          <div className="absolute -bottom-7 left-10 w-6 h-2 rounded-full bg-[#292857]" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Your Mock Interview is Starting
      </h1>

      <p className="text-gray-500 text-center mt-4 max-w-xl leading-6">
        AI will ask questions based on your selected preferences.
        <br />
        Please answer as if you're in a real interview.
      </p>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md mt-12 px-8 md:px-20 py-8">

        <Info
          icon="💼"
          title="Job Role"
          value="Software Engineer"
        />

        <Divider />

        <Info
          icon="📊"
          title="Experience Level"
          value="Mid Level (2-5 Years)"
        />

        <Divider />

        <Info
          icon="👨‍💼"
          title="Interview Type"
          value="Technical Interview"
        />

        <Divider />

        <Info
          icon="⏱️"
          title="Difficulty Level"
          value="Medium"
        />

      </div>

      {/* Bottom */}
      <p className="text-gray-500 font-medium mt-12">
        The interview will begin shortly...
      </p>

      {/* Dots */}
      <div className="flex gap-5 mt-6">
        <span className="w-4 h-4 rounded-full bg-indigo-600" />
        <span className="w-4 h-4 rounded-full bg-gray-300" />
        <span className="w-4 h-4 rounded-full bg-gray-300" />
      </div>
<Link href='/interview'>  <button className="text-white bg-indigo-600 px-4 py-4 hover:bg-indigo-700 rounded-xl wshadow-sm mt-4">Start Interview ➜</button> </Link>
    </div>
    <Footer />
    </>
  );
}