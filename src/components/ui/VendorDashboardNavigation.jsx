import React, { useState } from 'react';
import Icon from '../AppIcon';

const VendorDashboardNavigation = ({ 
  activeRoute = '/', 
  onNavigate, 
  notifications = {}, 
  isDesktop = false, 
  isMobile = false 
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryItems = [
    {
      label: 'Dashboard',
      path: '/vendor-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Business overview and analytics',
      badge: null
    },
    {
      label: 'Bookings',
      path: '/vendor-bookings',
      icon: 'Calendar',
      tooltip: 'Manage customer bookings',
      badge: notifications?.bookings > 0 ? notifications?.bookings : null
    },
    {
      label: 'Messages',
      path: '/vendor-messages',
      icon: 'MessageSquare',
      tooltip: 'Customer communications',
      badge: notifications?.messages > 0 ? notifications?.messages : null
    },
    {
      label: 'Portfolio',
      path: '/vendor-portfolio',
      icon: 'Image',
      tooltip: 'Manage your portfolio',
      badge: null
    }
  ];

  const secondaryItems = [
    {
      label: 'Analytics',
      path: '/vendor-analytics',
      icon: 'BarChart3',
      tooltip: 'Performance metrics'
    },
    {
      label: 'Settings',
      path: '/vendor-settings',
      icon: 'Settings',
      tooltip: 'Account settings'
    },
    {
      label: 'Help',
      path: '/vendor-help',
      icon: 'HelpCircle',
      tooltip: 'Support and documentation'
    }
  ];

  const handleItemClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const renderNavigationItem = (item, isPrimary = true) => {
    const isActive = activeRoute === item?.path;
    
    if (isDesktop) {
      return (
        <button
          key={item?.path}
          onClick={() => handleItemClick(item?.path)}
          className={`
            relative flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-smooth
            ${isActive 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
          `}
          title={item?.tooltip}
        >
          <Icon name={item?.icon} size={18} />
          <span>{item?.label}</span>
          {item?.badge && (
            <span className="bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
              {item?.badge}
            </span>
          )}
        </button>
      );
    }

    if (isMobile) {
      return (
        <button
          key={item?.path}
          onClick={() => handleItemClick(item?.path)}
          className={`
            flex items-center justify-between w-full px-4 py-3 rounded-lg font-body font-medium transition-smooth
            ${isActive 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <Icon name={item?.icon} size={20} />
            <span>{item?.label}</span>
          </div>
          {item?.badge && (
            <span className="bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {item?.badge}
            </span>
          )}
        </button>
      );
    }

    return null;
  };

  if (isDesktop) {
    return (
      <nav className="flex items-center space-x-2">
        {primaryItems?.map(item => renderNavigationItem(item, true))}
        {/* More Menu */}
        <div className="relative">
          <button
            onClick={toggleMoreMenu}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-smooth
              ${isMoreMenuOpen 
                ? 'bg-muted text-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name="MoreHorizontal" size={18} />
            <span>More</span>
          </button>

          {isMoreMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
              <div className="py-2">
                {secondaryItems?.map(item => (
                  <button
                    key={item?.path}
                    onClick={() => handleItemClick(item?.path)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-2 text-left font-body font-medium transition-smooth
                      ${activeRoute === item?.path 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-popover-foreground hover:bg-muted'
                      }
                    `}
                    title={item?.tooltip}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  if (isMobile) {
    return (
      <nav className="space-y-2">
        <div className="space-y-2">
          {primaryItems?.map(item => renderNavigationItem(item, true))}
        </div>
        <div className="pt-4 border-t border-border space-y-2">
          <div className="px-4 py-2">
            <span className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
              More Options
            </span>
          </div>
          {secondaryItems?.map(item => renderNavigationItem(item, false))}
        </div>
      </nav>
    );
  }

  return null;
};

export default VendorDashboardNavigation;