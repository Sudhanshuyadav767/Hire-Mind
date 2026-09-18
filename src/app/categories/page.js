"use client";

import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import CategoriesHero from "../component/categories/CategoriesHero";
import TopCategoriesGrid from "../component/categories/TopCategoriesGrid";
import FeaturedCategories from "../component/categories/FeaturedCategories";
import TrendingSkills from "../component/categories/TrendingSkills";

export default function CategoriesPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <CategoriesHero />
        <TopCategoriesGrid />
        <FeaturedCategories />
        <TrendingSkills />
      </div>
      <Footer />
    </div>
  );
}
