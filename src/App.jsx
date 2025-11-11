import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productpage from "./pages/Productpage";
import AdminLogin from "./Admin/AdminLogin";
import Admin from "./pages/Admin";
import PrivateRoute from "./Admin/PrivateRoute";
import ServicePage from "./pages/ServicePage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HoverButton from "./components/HoverButton";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <HoverButton />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productpage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
