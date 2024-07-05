import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import styles from "./global.module.scss";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const totalCount = useSelector(
    (state: RootState) => state.cart.totalCount
  );
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles["app-header"]}>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/shop'>Shop</Link>
            <Link to='/cart' className={styles.cartLink}>
              Cart
              <span className={styles.cartIcon}>🛒</span>
              {totalCount ? (
                <span className={styles.cartCount}>{totalCount}</span>
              ) : (
                ""
              )}
            </Link>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home: React.FC = () => (
  <div>
    <h1>Home </h1>
    <p>To make a purchase, please navigate to the shop tab.</p>
  </div>
);

export default App;
