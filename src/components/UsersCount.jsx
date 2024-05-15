import React from "react";

const Facts = () => {
  return (
    <>
      <section id="facts" className="facts">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="section-header">
                <h2 className="text-white">Our Footprints</h2>
                <p>
                  Delivering service excellence to over 43 million Happy
                  Customers across geography…{" "}
                </p>
              </div>
              <div className="row counters">
                <div className="col-lg-4 col-4 text-center">
                  <span className="purecounter">17</span>

                  <p> Years of Experience </p>
                </div>
                <div className="col-lg-4 col-4 text-center">
                  <span className="purecounter">60</span>

                  <p> Expert Specialist</p>
                </div>
                <div className="col-lg-4 col-4 text-center">
                  <span className="purecounter">1000+</span>

                  <p>Successful Project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Facts;
