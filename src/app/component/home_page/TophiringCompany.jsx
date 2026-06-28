"use client";
import Image from 'next/image';

const TopCompanies = () => {
  // Aap yahan apne actual logos ke paths aur names daal sakte hain
  const companies = [
    { id: 1, name: 'Google', logo: '/logo/google.png' },
    { id: 2, name: 'Meta', logo: '/logo/meta.png' },
    { id: 3, name: 'Amazon', logo: '/logo/social.png' },
    { id: 4, name: 'Netflix', logo: '/logo/netflix.png' },
    { id: 5, name: 'Microsoft', logo: '/logo/microsoft.png' },
    { id: 6, name: 'Apple', logo: '/logo/apple.png' },
    { id: 7, name: 'Tesla', logo: '/logo/tesla.png' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Main Container with light lavender/blue tint background */}
      <div className="bg-[#EEF0FC] border border-[#DCE1F8] rounded-2xl p-6 md:p-8 shadow-sm">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="font-poppins font-medium">
            <h2 className="text-xl md:text-2xl  text-gray-900 tracking-tight">
              Top Companies Hiring
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Explore opportunities from top leading companies
            </p>
          </div>
          
          {/* View All Button */}
          <a 
            href="#all-companies" 
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group self-start sm:self-center"
          >
            View All Companies
            <svg 
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Logos Grid/Flex Container */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center justify-center">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center h-16 shadow-2xs hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              {/* Logo Placeholder - Ise aap real img tag se replace kar dena */}
              <Image 
                src={company.logo} 
                alt={`${company.name} logo`} 
                width={80}
                height={32}
                className="max-h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopCompanies;