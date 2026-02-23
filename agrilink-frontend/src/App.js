import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import OrdersPage from "./pages/OrdersPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ChatPage from "./pages/ChatPage";
import FarmerOrders from "./pages/FarmerOrders";

import AddCrop from "./pages/AddCrop";
import CropList from "./pages/CropList";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/farmer-orders" element={<FarmerOrders />} />

        
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/crops" element={<CropList />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;