"use client";

import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import TestimonialsHero from "../component/testimonials/TestimonialsHero";
import TestimonialsStats from "../component/testimonials/TestimonialsStats";
import SuccessStories from "../component/testimonials/SuccessStories";
import FeaturesAppreciated from "../component/testimonials/FeaturesAppreciated";
import VideoTestimonials from "../component/testimonials/VideoTestimonials";
import RatingsAndReviews from "../component/testimonials/RatingsAndReviews";
import TestimonialsCta from "../component/testimonials/TestimonialsCta";

export default function TestimonialsPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <TestimonialsHero />
        <TestimonialsStats />
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-10">
          <SuccessStories />
          <FeaturesAppreciated />
          <VideoTestimonials />
          <RatingsAndReviews />
          <TestimonialsCta />
        </main>
      </div>
      <Footer />
    </div>
  );
}
