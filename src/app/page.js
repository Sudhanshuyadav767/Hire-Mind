import Header from "../app/component/common/Header";
import Footer from "../app/component/common/Footer";
import Hero from "./component/home_page/Hero";
import Category from "./component/home_page/Category";
import FeaturedJobs from "./component/home_page/FeaturedJobs";
import TophiringCompany from "./component/home_page/TophiringCompany";
import StatsSection from "./component/home_page/StatsSection";
import TestimonialsSection from "./component/home_page/TestimonialsSection";
import NewsletterSection from "./component/home_page/NewsletterSection";
import BlogSection from "./component/home_page/BlogSection";

export default function Home() {
  return <>
    <Header />
    <main className="homepage">
    <Hero />
    <Category />
    <FeaturedJobs />
    <TophiringCompany />
    <StatsSection />
    <TestimonialsSection />
    <NewsletterSection />
    <BlogSection />
    </main>
    <Footer />
  </>;
}
