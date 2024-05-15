import InnerHeaderBaner from "../components/InnerHeaderBanner.jsx";
import abtHeader from "../img/about-header.jpg";
import ServiceList from "../components/ServiceList.jsx";
import Aos from "aos";
import { useEffect } from "react";
import Footer from "../components/Footer.jsx";
function Services() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);
  return (
    <>
      <InnerHeaderBaner name={"Services"} img={abtHeader} />
      <ServiceList />
      <Footer />
    </>
  );
}
export default Services;
