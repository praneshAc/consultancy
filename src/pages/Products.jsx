import ProductList from "../components/ProductList.jsx";
import InnerHeaderBanner from "../components/InnerHeaderBanner.jsx";
import abtHeader from "../assets/img/contact-header.jpg";
import Aos from "aos";
import { useEffect, useState } from "react";
function Products() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Aos.init();
    Aos.refresh();
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products`
        );
        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const { data } = await response.json();
        setData(data.product);
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <InnerHeaderBanner name={"Product"} img={abtHeader} />
      <main id="main">
        <div className="container" data-aos="fade-up">
          <div className="row">
            {data.map((productItem) => (
              <div className="col-3 m-5" key={productItem.id}>
                <ProductList product={productItem} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
export default Products;
