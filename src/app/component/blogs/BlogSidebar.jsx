import Link from 'next/link';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faXTwitter, 
  faLinkedinIn, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';

export default function BlogSidebar({ popularposts1 }) {
  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6 text-left">
      {/* Table of Contents */}
      <div className="border rounded-xl p-4 sm:p-5 bg-white">
        <h3 className="font-bold mb-4">
          Table of Contents
        </h3>

        <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
          <li>○ Introduction</li>
          <li>○ Rise of Artificial Intelligence</li>
          <li>○ Remote and Hybrid Work</li>
          <li>○ In-Demand Skills</li>
          <li>○ Employee Well-Being</li>
        </ul>
      </div>

      {/* Explore */}
      <div className="bg-[#F3F0FF] p-5 rounded-xl">
        <h2 className="font-bold">
          Explore More Career Insights & Tips
        </h2>

        <p className="text-gray-600 mt-2 text-sm">
          Discover expert advice to boost your career growth
        </p>

        <Link href="/blogs">
          <button className="mt-4 bg-[#1D4ED8] text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer">
            Explore Blogs ➜
          </button>
        </Link>
      </div>

      {/* Author */}
      <div className="bg-[#F3F0FF] p-5 rounded-xl">
        <h2 className="text-xl font-bold mb-5">
          About the Author
        </h2>

        <div className="flex items-center gap-3">
          <Image
            src="/Images/humanlogo.jpeg"
            alt="Author"
            width={60}
            height={60}
            className="rounded-full object-cover shrink-0"
          />

          <div className="min-w-0">
            <h3 className="font-semibold text-lg">
              Aman Singh
            </h3>

            <p className="text-sm text-gray-500">
              Flutter Developer
            </p>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-6 mt-4">
          Aman writes about career growth, technology, and the
          future of work. He loves helping job seekers build
          successful careers.
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="w-7 h-7 bg-[#3B5998] rounded-full flex items-center justify-center text-white"
          >
            <FontAwesomeIcon icon={faFacebookF} className="text-xs" />
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            className="w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center text-white"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-xs" />
          </Link>

          <Link
            href="https://x.com"
            target="_blank"
            className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white"
          >
            <FontAwesomeIcon icon={faXTwitter} className="text-xs" />
          </Link>

          <Link
            href="https://linkedin.com"
            target="_blank"
            className="w-7 h-7 bg-[#0077B5] rounded-full flex items-center justify-center text-white"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="text-xs" />
          </Link>

          <Link
            href="https://telegram.org"
            target="_blank"
            className="w-7 h-7 bg-[#0088cc] rounded-full flex items-center justify-center text-white"
          >
            <FontAwesomeIcon icon={faTelegram} className="text-xs" />
          </Link>
        </div>
      </div>

      {/* Related Blogs */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4 gap-2">
          <h2 className="text-lg font-bold">
            Related Blogs
          </h2>

          <Link href="/blogs">
            <button className="text-blue-600 text-sm font-medium whitespace-nowrap cursor-pointer">
              View All ➜
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {popularposts1.map((item) => (
            <div
              key={item.demandedskill}
              className="flex gap-3 border-b pb-3 last:border-none min-w-0"
            >
              <Image
                src={item.image}
                alt=""
                width={70}
                height={70}
                className="rounded-lg object-cover w-[70px] h-[70px] shrink-0"
              />

              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-5 hover:text-blue-600 cursor-pointer break-words">
                  {item.demandedskill}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#F3F0FF] rounded-xl p-5 shadow-sm">
        <h2 className="text-xl font-bold text-gray-700">
          Get Career Tips
          <br />
          Straight to Your Inbox
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Join thousands of job seekers receiving expert advice
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mt-5 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />

        <button className="w-full mt-4 py-3 rounded-lg text-white font-semibold transition bg-[#1D4ED8] hover:bg-indigo-700 cursor-pointer">
          Subscribe
        </button>
      </div>
    </aside>
  );
}
