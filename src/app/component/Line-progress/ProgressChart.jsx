const ProgressChart = () => {
  return (
    <div className="w-full rounded-xl bg-white p-4 ">
      
      {/* Left Content */}
      <div>
        <h2 className="text-lg font-semibold text-black">
          Average Score
        </h2>

        <p className="mt-3 text-4xl font-semibold text-black">
          87%
        </p>

        <p className="mt-4 text-base font-semibold text-emerald-500">
          Good Progress
        </p>
      </div>

      {/* Chart */}
      <div className="mt-4 w-full overflow-hidden">
        <svg
          viewBox="0 0 700 250"
          className="h-auto w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Line */}
          <path
            d="M280 205 L370 80 L475 115 L590 25"
            stroke="#17174B"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Point 1 */}
          <circle
            cx="280"
            cy="205"
            r="28"
            fill="#13BD83"
          />
          <circle
            cx="280"
            cy="205"
            r="13"
            fill="white"
          />

          {/* Point 2 */}
          <circle
            cx="370"
            cy="80"
            r="28"
            fill="#13BD83"
          />
          <circle
            cx="370"
            cy="80"
            r="13"
            fill="white"
          />

          {/* Point 3 */}
          <circle
            cx="475"
            cy="115"
            r="28"
            fill="#13BD83"
          />
          <circle
            cx="475"
            cy="115"
            r="13"
            fill="white"
          />

          {/* Point 4 */}
          <circle
            cx="590"
            cy="25"
            r="28"
            fill="#13BD83"
          />
          <circle
            cx="590"
            cy="25"
            r="13"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressChart;