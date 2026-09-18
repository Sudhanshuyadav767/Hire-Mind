import Image from "next/image";

export default function NeedHelpCard() {
  return (
    <div className="bg-[#E2E4F8] border border-blue-100/80 p-5 rounded-3xl shadow-sm text-left space-y-3 relative overflow-hidden">
      <h3 className="text-base font-bold font-poppins text-[#1E2229]">
        Need Help?
      </h3>

      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">
        Our AI career assistant is here to help you find the perfect job.
      </p>

      <div className="flex items-end justify-between pt-2">
        <button className="bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer transition active:scale-98">
          chat with AI Assistant
        </button>

        <div className="w-20 h-20 relative shrink-0">
          <Image
            src="/Images/robot3.png"
            alt="AI Assistant Robot"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
