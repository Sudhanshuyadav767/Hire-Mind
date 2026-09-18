import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import ResumeReviewHero from "../component/resume_review/ResumeReviewHero";
import ResumeUploadSection from "../component/resume_review/ResumeUploadSection";
import ResumeHowItWorks from "../component/resume_review/ResumeHowItWorks";
import ResumeWhatAIReviews from "../component/resume_review/ResumeWhatAIReviews";
import ResumeSampleReport from "../component/resume_review/ResumeSampleReport";
import ResumeWhyUse from "../component/resume_review/ResumeWhyUse";
import ResumeCtaBanner from "../component/resume_review/ResumeCtaBanner";

export default function ResumeReviewPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <ResumeReviewHero />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResumeUploadSection />
            <ResumeHowItWorks />
          </div>

          <ResumeWhatAIReviews />
          <ResumeSampleReport />
          <ResumeWhyUse />
          <ResumeCtaBanner />
        </main>
      </div>

      <Footer />
    </div>
  );
}