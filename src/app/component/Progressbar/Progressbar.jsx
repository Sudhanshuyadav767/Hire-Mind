"use client";

import React from "react";

const Progressbar = () => {
  
  const score = 87;

  const percentage = Math.min(Math.max(score, 0), 100);

  return (
    <div
      className="relative h-[150px] w-[150px] rounded-full"
      style={{
        background: `conic-gradient(
          #3026d9 ${percentage * 3.6}deg,
          #e5e5ff ${percentage * 3.6}deg
        )`,
      }}
    >
      {/* Inner Circle */}
      <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-white">
        <span className="text-[40px] font-semibold leading-none text-black">
          {percentage}
        </span>

        <span className="mt-1 text-[28px] leading-none text-gray-500">
          /100
        </span>
      </div>
    </div>
  );
};

export default Progressbar;