import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthTabs from './components/AuthTabs';
import AuthHeader from './components/AuthHeader';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import LanguageToggle from './components/LanguageToggle';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock credentials for testing
  const mockCredentials = {
    customer: { email: 'customer@eventconnect.com', password: 'Customer123!' },
    vendor: { email: 'vendor@eventconnect.com', password: 'Vendor123!' }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const isValidCustomer = formData?.emailOrPhone === mockCredentials?.customer?.email && 
                             formData?.password === mockCredentials?.customer?.password;
      const isValidVendor = formData?.emailOrPhone === mockCredentials?.vendor?.email && 
                           formData?.password === mockCredentials?.vendor?.password;
      
      if (isValidCustomer) {
        localStorage.setItem('userRole', 'customer');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/customer-booking-management');
      } else if (isValidVendor) {
        localStorage.setItem('userRole', 'vendor');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/vendor-dashboard');
      } else {
        alert('Invalid credentials. Use:\nCustomer: customer@eventconnect.com / Customer123!\nVendor: vendor@eventconnect.com / Vendor123!');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data and redirect
      localStorage.setItem('userRole', formData?.userType);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify({
        name: formData?.fullName,
        email: formData?.email,
        phone: formData?.phone,
        userType: formData?.userType
      }));
      
      if (formData?.userType === 'vendor') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/vendor-search-discovery');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('userRole', 'customer');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/vendor-search-discovery');
    } catch (error) {
      console.error('Social login error:', error);
      alert('Social login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                EventConnect
              </span>
            </button>

            {/* Language Toggle */}
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16 min-h-screen flex">
        {/* Background Image - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Beautiful wedding decoration setup in Pune"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Connect with Pune's Best Event Professionals
            </h2>
            <p className="text-lg font-body opacity-90 leading-relaxed">
              From intimate celebrations to grand weddings, discover trusted vendors who bring your vision to life with authentic local expertise.
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-2xl shadow-modal border border-border p-6 lg:p-8">
              <AuthHeader activeTab={activeTab} />
              
              <AuthTabs 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  onForgotPassword={handleForgotPassword}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                />
              )}

              <div className="mt-6">
                <SocialLoginButtons
                  onSocialLogin={handleSocialLogin}
                  isLoading={isLoading}
                />
              </div>

              {/* Additional Links */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground font-caption">
                  {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    {activeTab === 'login' ? 'Create one now' : 'Sign in instead'}
                  </button>
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground font-caption">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span>GST Compliant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="text-primary" />
                  <span>Pune Local</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-accent" />
                  <span>1000+ Vendors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationLogin;