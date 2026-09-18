import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

    </div>
  );
}