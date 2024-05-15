import logo from "../assets/img/logo 2.png";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const useCheckout = () => {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const checkout = async (billAmount) => {
    try {
      setLoading(true);
      console.log(userData);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/orders/razor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: billAmount * 100,
            currency: "INR",
            receipt: "receiptId",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Checkout failed.");
      }
      const order = await response.json();

      console.log(order);

      var options = {
        key: "rzp_test_lEjUkxcCd826xz", // Enter the Key ID generated from the Dashboard
        amount: billAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Dreamland Agencies", //your business name
        description: "Test Transaction",
        image: logo,
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const body = await { ...response };

          const validateRes = await fetch(
            `${process.env.REACT_APP_API_URL}/users/orders/validate`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonRes = await validateRes.json();
          if (jsonRes.msg === "Success") {
            const { items, totalQuantity } = cart;
            const productData = items
              .filter((item) => item.quantity >= 1)
              .map((item) => ({
                _id: item.id,
                name: item.productName,
                quantity: item.quantity,
              }));

            try {
              const orderData = {
                payment_id: jsonRes.paymentId,
                razorpay_order_id: jsonRes.orderId,
                user_id: userData._id,
                products: productData,
                billAmount,
                status: "confirmed",
                totalQuantity,
              };
              console.log(orderData);
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/users/order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(orderData),
                }
              );

              if (!response.ok) {
                throw new Error("Failed to create order");
              }

              const responseData = await response.json();
              console.log("Order created:", responseData);
              // Handle success, e.g., show a success message to the user

              navigate("/orders");
            } catch (error) {
              console.error("Error creating order:", error);
              // Handle error, e.g., show an error message to the user
            }
          }

          console.log(jsonRes);
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: userData.name, //your customer's name
          email: userData.email,
          contact: userData.phone, //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);

        alert(response.error.reason);
      });

      rzp1.open();
    } catch (error) {
      console.log("Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, checkout };
};

export default useCheckout;
