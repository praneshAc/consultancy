import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import client01 from "../assets/clients/i2.png";
import client02 from "../assets/clients/i3.png";
import client03 from "../assets/clients/i4.png";
import client04 from "../assets/clients/i5.png";
import client05 from "../assets/clients/i6.png";
import client06 from "../assets/clients/i7.png";
import client07 from "../assets/clients/i8.png";
import client08 from "../assets/clients/i9.png";
import client09 from "../assets/clients/i10.png";
import client10 from "../assets/clients/i11.png";
import client11 from "../assets/clients/i12.png";
import client12 from "../assets/clients/i13.png";
import client13 from "../assets/clients/i14.png";
import client14 from "../assets/clients/i15.png";
import client15 from "../assets/clients/i16.jpeg";
import client16 from "../assets/clients/client1.png";


const ClientList = () => {
  return (
    <>
      <section id="clients" className="clients">
        <div className="container" data-aos="zoom-out">
          <div className="section-header">
            <h2>Our Clients</h2>
          </div>
          <div className="clients-slider swiper">
            <Swiper
              modules={[Autoplay]}
              //spaceBetween={15}
              //slidesPerView={6}
              autoplay={{
                delay: 1500,
                disableOnInteraction: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <img src={client01} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client02} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client03} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client04} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client05} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client06} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client07} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client08} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client09} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client10} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client11} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client12} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client13} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client14} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client15} className="img-fluid" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={client16} className="img-fluid" alt="" />
              </SwiperSlide>
           
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientList;
