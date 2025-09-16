import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomePage from './pages/Home/HomePage';
import VendorProfilePortfolio from './pages/vendor-profile-portfolio';
import VendorSearchDiscovery from './pages/vendor-search-discovery';
import CustomerBookingManagement from './pages/customer-booking-management';
import VendorDashboard from './pages/vendor-dashboard';
import QuoteRequestBookingFlow from './pages/quote-request-booking-flow';
import UserRegistrationLogin from './pages/user-registration-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/vendor-profile-portfolio" element={<VendorProfilePortfolio />} />
        <Route path="/vendor-search-discovery" element={<VendorSearchDiscovery />} />
        <Route path="/customer-booking-management" element={<CustomerBookingManagement />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/quote-request-booking-flow" element={<QuoteRequestBookingFlow />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
