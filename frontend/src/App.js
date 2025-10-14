import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster";

// Landing
import LandingPage from "./pages/LandingPage";

// Rider pages
import RiderLogin from "./pages/rider/RiderLogin";
import RiderHome from "./pages/rider/RiderHome";
import BookRide from "./pages/rider/BookRide";
import TrackRide from "./pages/rider/TrackRide";
import RateRide from "./pages/rider/RateRide";
import RideHistory from "./pages/rider/RideHistory";
import PaymentMethods from "./pages/rider/PaymentMethods";
import RiderProfile from "./pages/rider/RiderProfile";

// Driver pages
import DriverLogin from "./pages/driver/DriverLogin";
import DriverHome from "./pages/driver/DriverHome";
import ActiveRide from "./pages/driver/ActiveRide";
import DriverEarnings from "./pages/driver/DriverEarnings";
import DriverHistory from "./pages/driver/DriverHistory";
import DriverProfile from "./pages/driver/DriverProfile";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Rider Routes */}
            <Route path="/rider/login" element={<RiderLogin />} />
            <Route path="/rider/home" element={<RiderHome />} />
            <Route path="/rider/book-ride" element={<BookRide />} />
            <Route path="/rider/track-ride" element={<TrackRide />} />
            <Route path="/rider/rate-ride" element={<RateRide />} />
            <Route path="/rider/history" element={<RideHistory />} />
            <Route path="/rider/payment" element={<PaymentMethods />} />
            <Route path="/rider/profile" element={<RiderProfile />} />

            {/* Driver Routes */}
            <Route path="/driver/login" element={<DriverLogin />} />
            <Route path="/driver/home" element={<DriverHome />} />
            <Route path="/driver/active-ride" element={<ActiveRide />} />
            <Route path="/driver/earnings" element={<DriverEarnings />} />
            <Route path="/driver/history" element={<DriverHistory />} />
            <Route path="/driver/profile" element={<DriverProfile />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
