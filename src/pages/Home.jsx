import React from "react";
import Carousel from "../components/Carosel";
import Footer from "../components/Footer";
import ServiceList from "../components/ServiceList";
import { useEffect } from "react";
import AOS from "aos";
import ClientList from "../components/ClientList";

function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <Carousel />
      <main id="main">
        <ServiceList />
        <ClientList />
      </main>
      <Footer />
    </>
  );
}
export default Home;
