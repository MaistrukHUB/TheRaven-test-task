import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYR7iUv9mrlm-CSaAzeCf9a_iepOcMtQ4",
  authDomain: "theraventesttask-406c0.firebaseapp.com",
  databaseURL:
    "https://theraventesttask-406c0-default-rtdb.firebaseio.com",
  projectId: "theraventesttask-406c0",
  storageBucket: "theraventesttask-406c0.appspot.com",
  messagingSenderId: "794104613177",
  appId: "1:794104613177:web:f9ad25e1bde23e0f1ec0e8",
  measurementId: "G-KY61DFKYEW",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp); // Ініціалізуємо firestore тут

const initialProducts = [
  {
    id: 1,
    model: "iPhone 12",
    photo:
      "https://content1.rozetka.com.ua/goods/images/big_tile/30873592.jpg",
    memory: "64GB",
    price: 799,
  },
  {
    id: 2,
    model: "iPhone 13",
    photo:
      "https://content1.rozetka.com.ua/goods/images/big_tile/221214139.jpg",
    memory: "128GB",
    price: 829,
  },
  {
    id: 3,
    model: "iPhone 13 Mini",
    photo:
      "https://content1.rozetka.com.ua/goods/images/big_tile/221267496.jpg",
    memory: "64GB",
    price: 729,
  },
  {
    id: 4,
    model: "iPhone 13 Pro",
    photo:
      "https://content2.rozetka.com.ua/goods/images/big_tile/221214130.jpg",
    memory: "256GB",
    price: 1199,
  },
  {
    id: 5,
    model: "iPhone 13 Pro Max",
    photo:
      "https://content1.rozetka.com.ua/goods/images/big_tile/221214139.jpg",
    memory: "512GB",
    price: 1399,
  },
  {
    id: 6,
    model: "iPhone 14",
    photo:
      "https://content1.rozetka.com.ua/goods/images/big_tile/284913535.jpg",
    memory: "128GB",
    price: 899,
  },
  {
    id: 7,
    model: "iPhone 14 Pro",
    photo:
      "https://content2.rozetka.com.ua/goods/images/big_tile/284913536.jpg",
    memory: "256GB",
    price: 1199,
  },
  {
    id: 8,
    model: "iPhone 14 Pro Max",
    photo:
      "https://content2.rozetka.com.ua/goods/images/big_tile/284913536.jpg",
    memory: "512GB",
    price: 1399,
  },
];

const addInitialProductsToFirestore = async () => {
  try {
    const productsCollectionRef = collection(firestore, "products");

    for (const product of initialProducts) {
      await addDoc(productsCollectionRef, product);
    }

    console.log("Початкові продукти успішно додані до Firestore!");
  } catch (error) {
    console.error(
      "Помилка під час додавання початкових продуктів до Firestore: ",
      error
    );
  }
};


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();