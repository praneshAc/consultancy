import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
function CartModel() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <>
      <div className="hero1 d-flex align-items-center ">
        <Link to="/cart">
          <Badge count={cartQuantity}>
            <ShoppingCartOutlined
              style={{
                fontSize: "24px",
                color: "#A6BEF0",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "white")}
              onMouseOut={(e) => (e.target.style.color = "#A6BEF0")}
            />
          </Badge>
        </Link>
      </div>
    </>
  );
}

export default CartModel;
