import { cartActions } from "./cart-slice";
export const fetchCartData = () => {
  const { user } = JSON.parse(localStorage.getItem("user_data"));
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/cart/${user._id}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const sendCartData = (cart) => {
  const { user } = JSON.parse(localStorage.getItem("user_data"));
  const { items, totalQuantity } = cart;
  console.log(items);
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/cart/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: items,
            totalQuantity: totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        console.log("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
