import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Shop.module.scss";
import {
  selectProducts,
  fetchProducts,
} from "../../redux/slice/productsSlice";
import { addProduct } from "../../redux/slice/cartSlice";
import { AppDispatch } from "../../redux/store";

interface Product {
  id: number;
  model: string;
  photo: string;
  memory: string;
  price: number;
}

const Shop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productList = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addToCart = (product: Product) => {
    dispatch(addProduct({ ...product, id: Number(product.id) }));
    console.log(`Added ${product.model} to cart!`);
  };

  return (
    <div className={styles.shop}>
      <h1>Shop</h1>
      <div className={styles.productList}>
        {productList.map((product) => (
          <div key={product.id} className={styles.product}>
            <img
              src={product.photo}
              alt={product.model}
              className={styles.productPhoto}
            />
            <h2>{product.model}</h2>
            <p>Memory: {product.memory}</p>
            <p>Price: ${product.price}</p>
            <button
              className={styles.addToCartButton}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;









