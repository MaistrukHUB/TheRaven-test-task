import {
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
