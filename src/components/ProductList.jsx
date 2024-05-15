import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";
function ProductList({ product }) {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { _id, price, name, image, description } = product;
  const id = _id;
  const title = name;
  const addItemHandler = () => {
    if (isAuthenticated) {
      dispatch(
        cartActions.addItemToCart({
          id,
          price,
          title,
          image,
        })
      );
    } else {
      message.info("You have to login to add items to cart");
    }
  };
  return (
    <div className="card">
      <img src={image} className="card-img-top mh-10 " alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <h5>
            <i className="bi bi-currency-rupee" />
            {price}
          </h5>
          <button
            onClick={addItemHandler}
            type="button"
            className="btn btn-primary"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductList;
