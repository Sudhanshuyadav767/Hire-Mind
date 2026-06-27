// import Image from "next/image";
import { Children } from "react";
import Header from "../app/component/common/Header";
import Footer from "../app/component/common/Footer";
import Hero from "./component/home_page/Hero";



export default function Home() {
  return (
    
       <>
        <Header/>
       <Hero/>
      {/* {Children} */}
      <Footer/>
     </>
  );
}
