import React from "react";
import services from "../util/servicelist";
const ServiceList = () => {
  return (
    <>
      <section id="services-list" className="services-list">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>What we do? </h2>
            <p>
              We deliver the products to our clients beyond their expectations.{" "}
            </p>
          </div>

          <div className="row gy-5">
            {services.map((data, index) => (
              <div
                className="col-lg-4 col-md-4 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay="100"
                key={index}
              >
                <div className="single-service">
                  <div>
                    <li className="image_wrapper" style={{ listStyle: "none" }}>
                      <div className="sinservice">
                        <img src={data.imageurl} alt="" />
                        <div className="over"></div>
                        <div className="service-label">
                          <p>{data.title}</p>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceList;
