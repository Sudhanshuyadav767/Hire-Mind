import Link from 'next/link';
import { CircleUserRound } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faXTwitter, 
  faLinkedinIn, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';

export default function BlogHeaderMeta({ blog1 }) {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-left">
        Future of work: key Trends
        <br className="hidden sm:block" />
        to watch in 2026
      </h1>

      <p className="mt-4 text-gray-600 text-sm sm:text-base leading-6 sm:leading-7 text-left">
        Explore the top workplace trends shaping the future,
        the skill you need, and how to stay ahead in a rapidly
        changing world.
      </p>

      {/* Author / Meta */}
      <div className="mt-6 border-b pb-4">
        {blog1.map((item) => (
          <div
            key={item.name}
            className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start sm:items-center gap-4 text-sm text-gray-500"
          >
            {/* Author */}
            <div className="flex items-center gap-2 shrink-0">
              <CircleUserRound size={24} className="text-blue-600" />
              <span>
                {item.name}
                <br />
                {item.post}
              </span>
            </div>

            {/* Date */}
            <span className="shrink-0">📆 {item.date}</span>

            {/* Read */}
            <span className="shrink-0">🕒 {item.read}</span>

            {/* Views */}
            <span className="shrink-0">👁️ {item.view}</span>

            {/* Social */}
            <div className="w-full sm:w-auto lg:ml-auto">
              <h4 className="text-[#1E2229] font-bold text-sm mb-2 text-left sm:text-right">
                Share this article
              </h4>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-[#3B5998] text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-[13px]" />
                </Link>

                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-[14px]" />
                </Link>

                <Link
                  href="https://x.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-black text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="text-[13px]" />
                </Link>

                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-[#0077B5] text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-[13px]" />
                </Link>

                <Link
                  href="https://telegram.org"
                  target="_blank"
                  className="w-7 h-7 shrink-0 bg-[#0088cc] text-white rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTelegram} className="text-[14px]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
