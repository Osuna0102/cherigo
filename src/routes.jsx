import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import CheckOut from './pages/CheckOut';
import Payment from './Payment';
import PaymentSuccess from './pages/PaymentSuccess';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="payment" element={<Payment />} />
          <Route path="success" element={<PaymentSuccess />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;