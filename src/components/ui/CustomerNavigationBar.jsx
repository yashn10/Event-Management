import React from 'react';
import Icon from '../AppIcon';

const CustomerNavigationBar = ({
  activeRoute = '/',
  onNavigate,
  notifications = {},
  isDesktop = false,
  isMobile = false,
  isAuthenticated = true
}) => {
  const navigationItems = [
    // {
    //   label: 'Search Vendors',
    //   path: '/vendor-search-discovery',
    //   icon: 'Search',
    //   tooltip: 'Find and compare event vendors',
    //   badge: null
    // },
    {
      label: 'Browse Profiles',
      path: '/vendor-profile-portfolio',
      icon: 'Users',
      tooltip: 'View vendor portfolios and reviews',
      badge: null
    }
  ];

  const authenticatedItems = [
    {
      label: 'My Bookings',
      path: '/customer-booking-management',
      icon: 'Calendar',
      tooltip: 'Manage your event bookings',
      badge: notifications?.bookings > 0 ? notifications?.bookings : null
    },
    {
      label: 'Get Quote',
      path: '/quote-request-booking-flow',
      icon: 'MessageSquare',
      tooltip: 'Request quotes from vendors',
      badge: null,
      isPrimary: true
    }
  ];

  const allItems = isAuthenticated
    ? [...navigationItems, ...authenticatedItems]
    : navigationItems;

  const handleItemClick = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const renderNavigationItem = (item, index) => {
    const isActive = activeRoute === item?.path;

    if (isDesktop) {
      return (
        <button
          key={item?.path}
          onClick={() => handleItemClick(item?.path)}
          className={`
            relative flex items-center space-x-2 px-4 py-2 rounded-sm font-body font-medium transition-smooth
            ${isActive
              ? 'bg-primary text-primary-foreground'
              : item?.isPrimary
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
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
              : item?.isPrimary
                ? 'bg-accent text-accent-foreground'
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
        {allItems?.map(renderNavigationItem)}
      </nav>
    );
  }

  if (isMobile) {
    return (
      <nav className="space-y-2">
        {allItems?.map(renderNavigationItem)}
      </nav>
    );
  }

  return null;
};

export default CustomerNavigationBar;