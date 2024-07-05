import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Cart.module.scss";
import { RootState } from "../../redux/store";
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalCount,
  addProduct,
  removeProduct,
  decreaseProductCount,
  clearCart,
} from "../../redux/slice/cartSlice";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { firestore } from "../..";

const Cart: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalCount = useSelector(selectCartTotalCount);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    phone: "",
  });

  const handleAdd = (productId: number) => {
    const productToAdd = cartItems.find(
      (item) => item.id === productId
    );
    if (productToAdd) {
      dispatch(addProduct(productToAdd));
    }
  };

  const handleRemove = (productId: number) => {
    dispatch(removeProduct(productId));
  };

  const handleDecrease = (productId: number) => {
    dispatch(decreaseProductCount(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      alert("Please add at least one item to your cart.");
      return;
    }

    if (
      !formData.name ||
      !formData.surname ||
      !formData.address ||
      !formData.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      ...formData,
      items: cartItems,
    };

    try {
      const ordersCollectionRef = collection(firestore, "orders");
      await addDoc(ordersCollectionRef, orderData);
      console.log("Order Data:", orderData);

      setFormData({
        name: "",
        surname: "",
        address: "",
        phone: "",
      });
      dispatch(clearCart());

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error adding order to Firestore:", error);
      alert(
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  return (
    <div className={styles.cart}>
      <h1>Cart </h1>
      {cartItems.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.photo}
                alt={item.model}
                className={styles.productPhoto}
              />
              <div className={styles.productInfo}>
                <div className={styles.productText}>
                  <h3>{item.model}</h3>
                  <p>Memory: {item.memory}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.count}</p>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleAdd(item.id)}
                  >
                    +
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.cartSummary}>
        <p>Total Price: ${totalPrice}</p>
        <p>Total Count: {totalCount}</p>
      </div>
      {cartItems.length > 0 && (
        <button
          className={styles.clearCartButton}
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      )}
      <div className={styles.orderForm}>
        <h2>Order Details</h2>
        <form>
          <label>
            Name:
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Surname:
            <input
              type='text'
              name='surname'
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <button type='button' onClick={handleOrder}>
            Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
