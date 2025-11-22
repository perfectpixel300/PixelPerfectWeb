import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productpage from "./pages/Productpage";
import AdminLogin from "./Admin/Admin";
import Admin from "./pages/Admin";
import PrivateRoute from "./Admin/PrivateRoute";
import ServicePage from "./pages/ServicePage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HoverButton from "./components/HoverButton";
import Studio from "./pages/Studio";
import PrintingPress from "./pages/PrintingPress";
import NormalLayout from "./pages/NormalLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NormalLayout><Home /></NormalLayout>} />
        <Route path="/products" element={<NormalLayout><Productpage /></NormalLayout>} />
        <Route path="/product/:id" element={<NormalLayout><ProductDetail /></NormalLayout>} />
        <Route path="/services" element={<NormalLayout><ServicePage /></NormalLayout>} />
        <Route path="/about-us" element={<NormalLayout><AboutUs /></NormalLayout>} />
        <Route path="/contact" element={<NormalLayout><Contact /></NormalLayout>} />
        <Route path="/photo-studio" element={<NormalLayout><Studio /></NormalLayout>} />
        <Route path="/print-press" element={<NormalLayout><PrintingPress /></NormalLayout>} />
        <Route path="/admin/*" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
