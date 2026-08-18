import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import AiLearningHero from "../component/ai_services/AiLearningHero";
import AdaptiveLearningStream from "../component/ai_services/AdaptiveLearningStream";
import CareerPathCopilot from "../component/ai_services/CareerPathCopilot";
import TalentProfile from "../component/ai_services/TalentProfile";
import CommunityMentors from "../component/ai_services/CommunityMentors";
import SkillAssessmentSpotlight from "../component/ai_services/SkillAssessmentSpotlight";

export default function AiServices() {
  return (
    <div className="min-w-[320px] bg-white text-[#0b0b0d]">
      <Header />
      <AiLearningHero />

      <main className="mx-auto my-4 grid max-w-[1345px] grid-cols-1 gap-3 px-2 lg:grid-cols-[minmax(0,3fr)_390px]">
        <section>
          <SkillAssessmentSpotlight />
          <AdaptiveLearningStream />
          <CareerPathCopilot />
        </section>

        <aside className="grid gap-3 lg:block">
          <TalentProfile />
          <CommunityMentors />
        </aside>
      </main>

      <Footer />
    </div>
  );
}
