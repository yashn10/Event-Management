import React, { useState, useEffect } from 'react';
import CustomerNavigationBar from './CustomerNavigationBar';
import VendorDashboardNavigation from './VendorDashboardNavigation';
import Icon from '../AppIcon';


const RoleBasedNavigation = ({ userRole = 'customer', isAuthenticated = false, activeRoute = '/', onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    bookings: 0,
    messages: 0,
    alerts: 0
  });

  useEffect(() => {
    // Simulate notification updates
    const interval = setInterval(() => {
      if (isAuthenticated) {
        setNotifications(prev => ({
          ...prev,
          bookings: Math.floor(Math.random() * 5),
          messages: Math.floor(Math.random() * 3)
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderLogo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Calendar" size={20} color="white" />
      </div>
      <span className="text-xl font-heading font-bold text-foreground">
        EventConnect
      </span>
    </div>
  );

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon
              name="Bell"
              size={20}
              className="text-muted-foreground hover:text-foreground cursor-pointer transition-smooth"
            />
            {(notifications?.bookings + notifications?.messages) > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications?.bookings + notifications?.messages}
              </span>
            )}
          </div>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center cursor-pointer">
            <Icon name="User" size={16} className="text-muted-foreground" />
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleNavigation('/user-registration-login')}
          className="text-muted-foreground hover:text-foreground transition-smooth font-body"
        >
          Sign In
        </button>
        {/* <button
          onClick={() => handleNavigation('/user-registration-login')}
          className="text-muted-foreground px-4 py-2 rounded-lg font-body hover:text-foreground transition-smooth"
        >
          Get Started
        </button> */}
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-5">
          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            {renderLogo()}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            {isAuthenticated ? (
              userRole === 'vendor' ? (
                <VendorDashboardNavigation
                  activeRoute={activeRoute}
                  onNavigate={handleNavigation}
                  notifications={notifications}
                  isDesktop={true}
                />
              ) : (
                <CustomerNavigationBar
                  activeRoute={activeRoute}
                  onNavigate={handleNavigation}
                  notifications={notifications}
                  isDesktop={true}
                />
              )
            ) : (
              <CustomerNavigationBar
                activeRoute={activeRoute}
                onNavigate={handleNavigation}
                notifications={notifications}
                isDesktop={true}
                isAuthenticated={false}
              />
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex">
            {renderAuthButtons()}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            {isAuthenticated && (
              <div className="relative">
                <Icon
                  name="Bell"
                  size={20}
                  className="text-muted-foreground"
                />
                {(notifications?.bookings + notifications?.messages) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications?.bookings + notifications?.messages}
                  </span>
                )}
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-modal">
          <div className="px-4 py-4 space-y-4">
            {isAuthenticated ? (
              userRole === 'vendor' ? (
                <VendorDashboardNavigation
                  activeRoute={activeRoute}
                  onNavigate={handleNavigation}
                  notifications={notifications}
                  isMobile={true}
                />
              ) : (
                <CustomerNavigationBar
                  activeRoute={activeRoute}
                  onNavigate={handleNavigation}
                  notifications={notifications}
                  isMobile={true}
                />
              )
            ) : (
              <>
                <CustomerNavigationBar
                  activeRoute={activeRoute}
                  onNavigate={handleNavigation}
                  notifications={notifications}
                  isMobile={true}
                  isAuthenticated={false}
                />
                <div className="pt-4 border-t border-border">
                  {renderAuthButtons()}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default RoleBasedNavigation;