import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../..";

interface Product {
  id: number;
  model: string;
  photo: string;
  memory: string;
  price: number;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, removeProduct } =
  productsSlice.actions;

export const selectProducts = (state: RootState) =>
  state.products.products;

export const fetchProducts = (): AppThunk => async (dispatch) => {
  const productsCollection = await getDocs(
    collection(firestore, "products")
  );
  const productsData = productsCollection.docs.map((doc) => ({
    id: Number(doc.id),
    ...doc.data(),
  })) as Product[];
  dispatch(setProducts(productsData));
};

export default productsSlice.reducer;
