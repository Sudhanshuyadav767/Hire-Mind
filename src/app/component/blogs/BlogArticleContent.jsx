import Image from "next/image";

export default function BlogArticleContent() {
  return (
    <>
      {/* Hero Image */}
      <div className="w-full mt-6 overflow-hidden rounded-xl">
        <Image
          src="/Images/blog1.jpeg"
          alt="Blog Image"
          width={1200}
          height={500}
          className="w-full h-[200px] sm:h-[280px] lg:h-[350px] object-cover rounded-xl"
        />
      </div>

      {/* Blog Content */}
      <article className="w-full space-y-8 mt-8 text-left">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Introduction
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            The world of work is evolving faster than ever. From
            AI-powered tools to remote-first workplaces, the future
            belongs to those who adapt, learn, and grow continuously.
            Here are the key trends shaping the future of work in 2026.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            1. Rise of Artificial Intelligence
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Artificial Intelligence is transforming industries by
            automating repetitive tasks, improving productivity, and
            creating new opportunities. Professionals who learn AI
            tools will have a competitive advantage in the job market.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            2. Remote and Hybrid Work Stay Strong
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Companies continue to embrace flexible work models.
            Remote and hybrid work arrangements allow employees to
            maintain better work-life balance while enabling businesses
            to access talent from around the world.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            3. In-Demand Skills Will Continue to Evolve
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Technical skills, communication, problem-solving, and
            adaptability are becoming increasingly important.
            Continuous learning is essential to stay relevant in a
            rapidly changing job market.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            4. Employee Well-Being Takes Center Stage
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            Organizations are investing more in employee wellness,
            mental health support, and workplace culture. A healthy
            workforce leads to higher productivity and job satisfaction.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Conclusion
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
            The future of work is full of opportunities. By staying
            curious, learning continuously, and embracing change, you
            can build a successful and future-ready career.
          </p>
        </div>
      </article>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
        <button className="w-full border rounded-lg py-3 font-medium bg-[#1D4ED8] text-white">
          Find Job
        </button>
        <button className="w-full border rounded-lg py-3 font-medium hover:bg-blue-600 hover:text-white transition cursor-pointer">
          Build Resume
        </button>
        <button className="w-full border rounded-lg py-3 font-medium hover:bg-blue-600 hover:text-white transition cursor-pointer">
          Skill Assessment
        </button>
        <button className="w-full border rounded-lg py-3 font-medium hover:bg-blue-600 hover:text-white transition cursor-pointer">
          Mock Interview
        </button>
      </div>
    </>
  );
}
