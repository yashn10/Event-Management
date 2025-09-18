import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import AuthHeader from "./components/AuthHeader";
import AuthTabs from "./components/AuthTabs";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SocialLoginButtons from "./components/SocialLoginButtons";

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // Mock credentials for testing
  const mockCredentials = {
    customer: { email: "customer@eventnect.com", password: "Customer123!" },
    vendor: { email: "vendor@eventnect.com", password: "Vendor123!" },
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCustomer =
        formData?.emailOrPhone === mockCredentials?.customer?.email &&
        formData?.password === mockCredentials?.customer?.password;
      const isValidVendor =
        formData?.emailOrPhone === mockCredentials?.vendor?.email &&
        formData?.password === mockCredentials?.vendor?.password;

      if (isValidCustomer) {
        localStorage.setItem("userRole", "customer");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/customer-booking-management");
      } else if (isValidVendor) {
        localStorage.setItem("userRole", "vendor");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/vendor-dashboard");
      } else {
        alert(
          "Invalid credentials. Use:\nCustomer: customer@eventnect.com / Customer123!\nVendor: vendor@eventnect.com / Vendor123!"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store user data and redirect
      localStorage.setItem("userRole", formData?.userType);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: formData?.fullName,
          email: formData?.email,
          phone: formData?.phone,
          userType: formData?.userType,
        })
      );

      if (formData?.userType === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/vendor-search-discovery");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);

    try {
      // Simulate social login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem("userRole", "customer");
      localStorage.setItem("isAuthenticated", "true");
      navigate("/vendor-search-discovery");
    } catch (error) {
      console.error("Social login error:", error);
      alert("Social login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset link would be sent to your email address.");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (

    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-smooth"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">
            Eventnect
            </span>
          </button>
        </div>
      </header>

      {/* Main Content - fixed height card */}
      <main className="flex flex-1 pt-16 items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-lg border border-border flex flex-col lg:flex-row w-full max-w-5xl h-[calc(100vh-5rem)] max-h-[80vh]">
          {/* Image Section - fixed aspect ratio on desktop, banner on mobile */}
          <div className="lg:w-1/2 relative h-40 lg:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
              alt="Event setup"
              className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            />
            <div className="absolute inset-0 bg-black/40 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none" />
            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold leading-snug drop-shadow-md">
                Plan Your Event with Ease
              </h2>
              <p className="text-sm lg:text-base opacity-90 leading-relaxed mt-1">
                Book trusted vendors in minutes.
              </p>
            </div>
          </div>

          {/* Form Section - compact layout */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-6">
            <div className="w-full max-w-sm space-y-4 max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
              <AuthHeader activeTab={activeTab} />
              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

              {activeTab === "login" ? (
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  onForgotPassword={handleForgotPassword}
                />
              ) : (
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
              )}

              {/* Social Login Buttons */}
              <SocialLoginButtons
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
              />

              {/* ✅ Removed redundant Sign Up / Sign In link */}

              {/* Trust Indicators */}
              <div className="flex justify-center space-x-4 text-[11px] text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} className="text-success" />
                  <span>GST Ready</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} className="text-primary" />
                  <span>Pune Local</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} className="text-accent" />
                  <span>1000+ Vendors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};

export default UserRegistrationLogin;
