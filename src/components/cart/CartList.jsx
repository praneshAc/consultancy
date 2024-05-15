import React from "react";
import { Button, Flex, Table, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const columns = (addItemHandler, removeItem) => [
  {
    dataIndex: "image",
    key: "image",
    render: (image) => <Avatar size={50} src={image} />,
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (text, record) => {
      return (
        <span>
          <Button
            shape="circle"
            size="small"
            icon={<MinusOutlined />}
            onClick={() => removeItem(record.itemId)}
          />
          {"\t"}
          {text}
          {"\t"}
          <Button
            shape="circle"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => addItemHandler(record)}
          />
        </span>
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
];

const CartList = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addItemHandler = (item) => {
    const { itemId, name, price, image } = item;

    dispatch(
      cartActions.addItemToCart({
        id: itemId,
        title: name,
        price: price,
        image,
      })
    );
  };
  const removeItem = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const tableData = cartItems
    .filter((item) => item.quantity)
    .map((item) => ({
      key: item.id,
      name: item.productName,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      itemId: item.id,
    }));

  const handleBuy = () => {
    navigate("/placeorder");
  };

  return (
    <Flex vertical style={{ marginLeft: 80, marginRight: 80, marginTop: 80 }}>
      <Table
        columns={columns(addItemHandler, removeItem)}
        dataSource={tableData}
        pagination={false}
      />
      <Button
        size="large"
        type="primary"
        style={{ marginLeft: "auto", marginTop: 25, maxWidth: 300 }}
        onClick={handleBuy} // Call handleCheckout when button is clicked
      >
        Buy
      </Button>
    </Flex>
  );
};

export default CartList;
