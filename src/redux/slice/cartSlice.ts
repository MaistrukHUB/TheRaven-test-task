import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product {
  id: number;
  model: string;
  photo: string;
  memory: string;
  price: number;
}

interface CartItem extends Product {
  count: number; 
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  totalCount: 0,
};

const updateTotalPriceCount = (state: CartState) => {
  state.totalCount = state.cartItems.reduce((sum, item) => {
    return item.count + sum;
  }, 0);

  state.totalPrice = state.cartItems.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};

const loadState = (): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch {
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadState() || initialState, 
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      updateTotalPriceCount(state);
      saveState(state); 
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      updateTotalPriceCount(state);
      saveState(state); 
    },
    decreaseProductCount(state, action: PayloadAction<number>) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (existingItem && existingItem.count > 1) {
        existingItem.count--;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }

      updateTotalPriceCount(state);
      saveState(state);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalCount = 0;
      saveState(state); 
    },
  },
});

export const selectCartItems = (state: RootState) =>
  state.cart.cartItems;
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.totalPrice;
export const selectCartTotalCount = (state: RootState) =>
  state.cart.totalCount;

export const {
  addProduct,
  removeProduct,
  decreaseProductCount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
