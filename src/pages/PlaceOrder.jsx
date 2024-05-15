import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Input,
  List,
  Select,
  Typography,
  message,
} from "antd";
import { useState, useEffect } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { useSelector } from "react-redux";
import useCheckout from "../hooks/useCheckout";
import { City } from "country-state-city";
import InnerHeaderBanner from "../components/InnerHeaderBanner";
import { useAuth } from "../contexts/AuthContext";
const { Title, Paragraph } = Typography;
const { user } = JSON.parse(localStorage.getItem("user_data"));

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { billAmount } = cart;
  const { shippingAddress } = user;
  const { userData } = useAuth();
  const { items } = cart;
  const { loading, checkout } = useCheckout();
  const [address, setAddress] = useState(shippingAddress);
  const [isEditing, setIsEditing] = useState(false);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const data = City.getCitiesOfState("IN", "TN");
    setCities(data.map((city) => city.name));
  }, []);
  useEffect(() => {});
  const handleChangeAddress = () => {
    setIsEditing(true); // Enable editing
  };

  const handleSaveAddress = async () => {
    try {
      console.log(address.street, address.city, address.pincode);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: address.street,
            city: address.city,
            pincode: address.pincode,
          }),
        }
      );

      if (response.ok) {
        message.success("Address updated successfully");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Failed to update address");
      }
    } catch (err) {
      console.error("Error updating address:", err);
      message.error("Failed to update address. Please try again later.");
    }
  };

  const handleAddressChange = (key, value) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [key]: value,
    }));
    console.log(address);
  };

  const placeOrderHandler = async (e) => {
    checkout(billAmount);

    try {
      console.log(userData._id);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/cart/${userData._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove cart");
      }

      const responseData = await response.json();

      console.log("Cart data removed:", responseData);
    } catch (err) {
      console.log(err);
    }

    e.preventDefault();
  };

  return (
    <>
      <InnerHeaderBanner name={"Summary"} />
      <ContentWrapper>
        <Flex>
          <Title level={3}>Delivery address</Title>

          <Button
            size="large"
            type="primary"
            icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
            style={{ marginLeft: "auto", marginTop: 25, maxWidth: 300 }}
            onClick={isEditing ? handleSaveAddress : handleChangeAddress}
            disabled={loading}
          >
            {isEditing ? "Save Address" : "Change Address"}
          </Button>
        </Flex>
        <div style={{ width: "70%", marginTop: 20, marginLeft: 40 }}>
          {isEditing ? (
            <>
              <Input
                placeholder="Street"
                value={address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                style={{ marginTop: 10 }}
              />

              <Select
                showSearch
                placeholder="City"
                value={address.city}
                onChange={(val) => handleAddressChange("city", val)}
                style={{ marginTop: 10, width: 200 }}
              >
                {cities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
              </Select>
              <Input
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => handleAddressChange("pincode", e.target.value)}
                style={{ marginTop: 10 }}
              />
            </>
          ) : (
            <>
              <Title level={5}>
                DoorNo & Street :{" "}
                <span style={{ fontWeight: "lighter" }}>{address.street}</span>
              </Title>
              <Title level={5}>
                City :{" "}
                <span style={{ fontWeight: "lighter" }}>{address.city}</span>
              </Title>
              <Title level={5}>
                Zip Code :{" "}
                <span style={{ fontWeight: "lighter" }}>{address.pincode}</span>
              </Title>
            </>
          )}
        </div>
        <Divider />

        <Title level={3}>Review Items & Delivery</Title>

        <List
          itemLayout="horizontal"
          dataSource={items.filter((item) => item.quantity >= 1)}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={100} shape="square" src={item.image} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={
                  <>
                    <Paragraph>Price: {item.price} </Paragraph>
                    <Paragraph style={{ marginTop: -15 }}>
                      Quantity: {item.quantity}
                    </Paragraph>
                    <Paragraph style={{ marginTop: -15 }}>
                      Total Price: {item.quantity * item.price}
                    </Paragraph>
                  </>
                }
              />
            </List.Item>
          )}
        />
        <Divider />
        <Button
          size="large"
          icon={<CheckOutlined />}
          type="primary"
          style={{ marginLeft: "80%", marginTop: 25, maxWidth: 300 }}
          onClick={placeOrderHandler}
          disabled={loading}
        >
          {loading ? "Processing..." : `Checkout ₹ ${billAmount}`}
        </Button>
      </ContentWrapper>
    </>
  );
};

export default PlaceOrder;
