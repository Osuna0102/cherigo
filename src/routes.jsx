import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;