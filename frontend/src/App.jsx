import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
// import Categories from "./pages/Categories";
import Categories from "./components/CategoryCard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { CartProvider } from "./components/CartContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // const [count, setCount] = useState(0)
  return (
    <CartProvider>
      <Router>
        <ScrollToTop /> {/* Add this component */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}

          <Route path="/categories" element={<Categories />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
