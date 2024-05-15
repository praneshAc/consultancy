import React, { useEffect, useState } from "react";
import { Button, Modal, Spin, Table, Tag, message } from "antd";
import { useAuth } from "../contexts/AuthContext";
import InnerHeaderBanner from "../components/InnerHeaderBanner";
const Orders = () => {
  const [orderData, setOrderData] = useState();
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { userData } = useAuth();

  useEffect(() => {
    async function getUserOrders(userId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/orders/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user orders");
        }
        const { orders } = await response.json();
        console.log(orders);
        const mockData = orders.map((order) => ({
          key: order._id,
          transactionId: order.payment_id,
          product: order.products
            .filter((ele) => ele.quantity >= 1)
            .map((prod) => (
              <div key={prod._id}>
                • {prod.name} -{" "}
                <span style={{ fontWeight: "bold" }}>{prod.quantity}</span>
              </div>
            )),
          billAmount: <i class="bi bi-currency-rupee">{order.billAmount}</i>,
          status: order.status,
          quantity: order.totalQuantity,
        }));
        setOrderData(mockData);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
      }
    }
    if (userData) {
      getUserOrders(userData._id);
    }
  }, [userData, orderData]);

  const handleCancelOrder = (transactionId) => {
    setCancelOrderId(transactionId);
    setIsCancelModalVisible(true);
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    setIsCancelModalVisible(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/orders/${cancelOrderId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      const responseData = await response.json();
      message.success(
        "Order cancelled successfully. You amount will be refunded in 5-7 business days"
      );
      const updatedOrderData =
        orderData &&
        orderData.map((order) =>
          order.key === cancelOrderId
            ? { ...order, status: "cancelled" }
            : order
        );
      setOrderData(updatedOrderData);
      console.log("Cancellation response:", responseData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalVisible(false);
  };

  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Products & Quantity",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "No.Of Items",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Bill Amount",
      dataIndex: "billAmount",
      key: "billAmount",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "pending":
            color = "grey";
            break;
          case "confirmed":
            color = "yellow";
            break;
          case "shipped":
            color = "orange";
            break;
          case "delivered":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          default:
            color = "blue";
            break;
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="dashed"
          style={{ color: "red", borderColor: "red" }}
          onClick={() => handleCancelOrder(record.transactionId)}
          disabled={record.status === "cancelled"}
        >
          Cancel Order
        </Button>
      ),
    },
  ];

  return (
    <>
      <InnerHeaderBanner name={"Orders"} />
      <Table
        columns={columns}
        dataSource={orderData}
        style={{ width: "80%", margin: "auto", marginTop: "3%" }}
      />
      <Modal
        title="Order cancellation"
        open={isCancelModalVisible}
        onOk={handleCancel}
        onCancel={handleCancelModalCancel}
      >
        <p>Are you sure you want to cancel this order?</p>
        <p color="red">Only 50% of the order would be refunded</p>
        {isCancelling && <Spin />}
      </Modal>
    </>
  );
};

export default Orders;
