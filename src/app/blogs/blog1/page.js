import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import { blog1, popularposts1 } from "@/Data/data";
import BlogHeaderMeta from "@/app/component/blogs/BlogHeaderMeta";
import BlogArticleContent from "@/app/component/blogs/BlogArticleContent";
import BlogSidebar from "@/app/component/blogs/BlogSidebar";

export default function Blog1() {
  return (
    <>
      <Header />
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* MAIN BLOG CONTENT */}
          <main className="w-full lg:flex-1 min-w-0">
            <BlogHeaderMeta blog1={blog1} />
            <BlogArticleContent />
          </main>

          {/* SIDEBAR */}
          <BlogSidebar popularposts1={popularposts1} />
        </div>
      </section>
      <Footer />
    </>
  );
}