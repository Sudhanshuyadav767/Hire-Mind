import Image from 'next/image';

const StatsSection = () => {
  const stats = [
    { id: 1, count: '50K+', label: 'Active Jobs', iconBg: 'bg-[#EBF1FF]', image: '/Images/job-search.png'},
    { id: 2, count: '120K+', label: 'Job Seekers', iconBg: 'bg-[#EBF1FF]', image: '/Images/job-search (1).png' },
    { id: 3, count: '12K+', label: 'Companies', iconBg: 'bg-[#EBF1FF]', image: '/Images/office-building.png'},
    { id: 4, count: '90K+', label: 'Successful Hire', iconBg: 'bg-[#EBF1FF]', image: '/Images/employee.png'},
  ];

  return (
    <div className="home-section home-stats w-full max-w-7xl mx-auto px-4 py-6">
      {/* Main Border Container */}
      <div className="border border-gray-200 rounded-2xl bg-white p-6 shadow-2xs">
        
        {/* Responsive Grid / Flex Layout */}
        <div className="home-swiper flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-5 items-center gap-6 lg:gap-0">
          
          {/* Stats Items */}
          {stats.map((stat, index) => (
            <div key={stat.id} className="flex items-center lg:h-16 relative shrink-0 min-w-[200px] snap-start">
              <div className="flex items-center gap-4 px-4 w-full justify-start md:justify-center lg:justify-start">
                
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0 border border-[#DFE7FA]`}>
                  <Image
                    src={stat.image}
                    alt={stat.label}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="font-poppins font-medium">
                  <h3 className="text-xl md:text-xl  text-gray-900 leading-tight">
                    {stat.count}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 mt-0.5 whitespace-nowrap">
                    {stat.label}
                  </p>
                </div>
              </div>

              {/* Vertical Divider for Large Screens */}
              {index !== stats.length && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gray-200" />
              )}
            </div>
          ))}

          {/* Right-most CTA Section */}
          <div className="flex flex-col justify-center px-6 gap-3 lg:col-span-1 md:col-span-2 lg:text-left text-center md:border-t lg:border-t-0 md:pt-6 lg:pt-0 border-gray-100">
            <p className="text-xs md:text-sm font-poppins font-medium text-gray-800 leading-snug max-w-xs mx-auto lg:mx-0">
              Join thousands of professionals building their dream careers
            </p>
            <button className="bg-[#5B65F2] hover:bg-[#4A54E1] text-white font-medium text-xs md:text-sm py-2 px-4 rounded-xl inline-flex items-center justify-center gap-2 self-center lg:self-start shadow-sm transition-all group duration-200 cursor-pointer">
              Join Now
              <svg 
                className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StatsSection;
