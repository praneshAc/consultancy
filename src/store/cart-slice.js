import { createSlice } from "@reduxjs/toolkit";
const calculateBillAmount = (items) => {
  let billAmount = 0;
  items.forEach((item) => {
    billAmount += item.totalPrice;
  });
  return billAmount;
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    billAmount: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.billAmount = calculateBillAmount(action.payload.items);
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          image: newItem.image,
          totalPrice: newItem.price,
          productName: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalBill = calculateBillAmount(state.items);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((items) => items.id === id);
      state.totalQuantity--;

      if (existingItem.totalQuantity === 1) {
        state.items = state.items.filter((items) => items.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalBill = calculateBillAmount(state.items);
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
