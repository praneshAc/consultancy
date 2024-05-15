import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
function OrderNotification() {
  const cartQuantity = 1;
  return (
    <>
      <div className="hero1 d-flex align-items-center m-1">
        <Link to="/orders">
          <Badge count={cartQuantity}>
            <BellOutlined
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

export default OrderNotification;
