import React, { useEffect } from "react";
import AOS from "aos";
import "../../node_modules/aos/dist/aos.css";
import about_img from "../assets/img/about.jpeg";
import InnerHeaderBaner from "../components/InnerHeaderBanner";
import Footer from "../components/Footer";
import abtHeader from "../img/about-header.jpg";
import aboutcontent from "../util/aboutcontent";
import Facts from "../components/UsersCount";
const About = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <InnerHeaderBaner name={"About Us"} img={abtHeader} />
      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>{aboutcontent.heading}</h2>
            </div>
            <div className="row gy-4 align-items-center" data-aos="fade-up">
              <div className="col-lg-6">
                <img
                  src={about_img}
                  className="img-fluid"
                  alt="Helping Clients achieve their Vision"
                  style={{ maxHeight: "30rem", maxWidth: "30rem" }}
                />
              </div>
              <div className="col-lg-6">
                <p> {aboutcontent.paracontent1}</p>
                <p> {aboutcontent.paracontent2}</p>
                <p> {aboutcontent.paracontent3}</p>
                <p> {aboutcontent.paracontent4}</p>
              </div>
            </div>
          </div>
        </section>
        <section></section>
        <Facts />
      </main>
      <Footer />
    </>
  );
};

export default About;
