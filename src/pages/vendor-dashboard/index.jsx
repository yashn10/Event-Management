import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import MetricsCard from './components/MetricsCard';
import BookingRequestsTable from './components/BookingRequestsTable';
import NotificationPanel from './components/NotificationPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import RevenueChart from './components/RevenueChart';
import CalendarWidget from './components/CalendarWidget';

import Button from '../../components/ui/Button';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [currentPeriod, setCurrentPeriod] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for dashboard metrics
  const metricsData = [
    {
      title: "Monthly Revenue",
      value: "₹2,45,000",
      subtitle: "Last 30 days",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+12.5%",
      color: "success"
    },
    {
      title: "Pending Quotes",
      value: "8",
      subtitle: "Awaiting response",
      icon: "FileText",
      trend: "neutral",
      trendValue: "2 new",
      color: "warning"
    },
    {
      title: "Confirmed Bookings",
      value: "15",
      subtitle: "This month",
      icon: "Calendar",
      trend: "up",
      trendValue: "+3",
      color: "primary"
    },
    {
      title: "Customer Rating",
      value: "4.8",
      subtitle: "Based on 127 reviews",
      icon: "Star",
      trend: "up",
      trendValue: "+0.2",
      color: "warning"
    }
  ];

  // Mock booking requests data
  const bookingRequests = [
    {
      id: 1,
      eventDate: "2025-01-15",
      eventTime: "6:00 PM - 11:00 PM",
      eventType: "Wedding Reception",
      eventIcon: "Heart",
      customerName: "Priya & Arjun Sharma",
      customerPhone: "+91 98765 43210",
      status: "pending",
      estimatedValue: 85000,
      location: "Pune, Maharashtra"
    },
    {
      id: 2,
      eventDate: "2025-01-20",
      eventTime: "4:00 PM - 8:00 PM",
      eventType: "Birthday Party",
      eventIcon: "Gift",
      customerName: "Rajesh Patel",
      customerPhone: "+91 87654 32109",
      status: "quoted",
      estimatedValue: 25000,
      location: "Mumbai, Maharashtra"
    },
    {
      id: 3,
      eventDate: "2025-01-25",
      eventTime: "7:00 PM - 12:00 AM",
      eventType: "Corporate Event",
      eventIcon: "Building",
      customerName: "TechCorp Solutions",
      customerPhone: "+91 76543 21098",
      status: "confirmed",
      estimatedValue: 150000,
      location: "Pune, Maharashtra"
    },
    {
      id: 4,
      eventDate: "2025-02-02",
      eventTime: "11:00 AM - 4:00 PM",
      eventType: "Baby Shower",
      eventIcon: "Baby",
      customerName: "Sneha Desai",
      customerPhone: "+91 65432 10987",
      status: "pending",
      estimatedValue: 18000,
      location: "Nashik, Maharashtra"
    }
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "New Booking Request",
      message: "Priya & Arjun Sharma requested a quote for their wedding reception on Jan 15th",
      timestamp: new Date(Date.now() - 300000),
      read: false,
      priority: "high",
      actionRequired: true,
      actionText: "Review Request"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      message: "₹75,000 payment received for TechCorp Solutions corporate event",
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      type: "message",
      title: "Customer Message",
      message: "Rajesh Patel sent a message regarding birthday party decorations",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      priority: "medium",
      actionRequired: true,
      actionText: "Reply"
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      message: "Received 5-star review from Amit & Kavya for their wedding decoration",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      priority: "low"
    },
    {
      id: 5,
      type: "system",
      title: "Profile Update Required",
      message: "Please update your portfolio with recent work samples to improve visibility",
      timestamp: new Date(Date.now() - 86400000),
      read: false,
      priority: "medium",
      actionRequired: true,
      actionText: "Update Profile"
    }
  ];

  // Mock revenue data
  const revenueData = {
    '7d': [
      { period: 'Mon', revenue: 12000, commission: 480 },
      { period: 'Tue', revenue: 8500, commission: 340 },
      { period: 'Wed', revenue: 15000, commission: 600 },
      { period: 'Thu', revenue: 22000, commission: 880 },
      { period: 'Fri', revenue: 18000, commission: 720 },
      { period: 'Sat', revenue: 35000, commission: 1400 },
      { period: 'Sun', revenue: 28000, commission: 1120 }
    ],
    '30d': [
      { period: 'Week 1', revenue: 65000, commission: 2600 },
      { period: 'Week 2', revenue: 78000, commission: 3120 },
      { period: 'Week 3', revenue: 52000, commission: 2080 },
      { period: 'Week 4', revenue: 89000, commission: 3560 }
    ],
    '90d': [
      { period: 'Month 1', revenue: 245000, commission: 9800 },
      { period: 'Month 2', revenue: 198000, commission: 7920 },
      { period: 'Month 3', revenue: 267000, commission: 10680 }
    ],
    '1y': [
      { period: 'Q1', revenue: 650000, commission: 26000 },
      { period: 'Q2', revenue: 780000, commission: 31200 },
      { period: 'Q3', revenue: 890000, commission: 35600 },
      { period: 'Q4', revenue: 920000, commission: 36800 }
    ]
  };

  // Mock calendar data
  const availability = [
    '2025-01-10', '2025-01-11', '2025-01-12', '2025-01-17', '2025-01-18',
    '2025-01-24', '2025-01-25', '2025-01-31', '2025-02-01', '2025-02-07'
  ];

  const calendarBookings = [
    {
      date: '2025-01-15',
      eventType: 'Wedding Reception',
      time: '6:00 PM'
    },
    {
      date: '2025-01-25',
      eventType: 'Corporate Event',
      time: '7:00 PM'
    },
    {
      date: '2025-02-02',
      eventType: 'Baby Shower',
      time: '11:00 AM'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBookingAction = (action, bookingId) => {
    console.log(`${action} booking:`, bookingId);
    // Handle booking actions
  };

  const handleNotificationAction = (notificationId) => {
    console.log('Mark notification as read:', notificationId);
    // Handle notification actions
  };

  const handleMarkAllNotificationsRead = () => {
    console.log('Mark all notifications as read');
    // Handle mark all as read
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    // Handle quick actions
    switch (action) {
      case 'calendar': navigate('/vendor-calendar');
        break;
      case 'portfolio': navigate('/vendor-portfolio');
        break;
      case 'analytics': navigate('/vendor-analytics');
        break;
      default:
        break;
    }
  };

  const handleUpdateAvailability = (date) => {
    console.log('Update availability for:', date);
    // Handle availability update
  };

  const handleViewCalendar = () => {
    navigate('/vendor-calendar');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation 
          userRole="vendor"
          isAuthenticated={true}
          activeRoute="/vendor-dashboard"
          onNavigate={handleNavigation}
        />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground font-body">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation 
        userRole="vendor"
        isAuthenticated={true}
        activeRoute="/vendor-dashboard"
        onNavigate={handleNavigation}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Welcome back, Elegant Events!
                </h1>
                <p className="text-muted-foreground font-body mt-2">
                  Here's what's happening with your business today
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create Quote
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Booking Requests */}
            <div className="lg:col-span-2">
              <BookingRequestsTable
                bookings={bookingRequests}
                onAccept={(id) => handleBookingAction('accept', id)}
                onReject={(id) => handleBookingAction('reject', id)}
                onSendQuote={(id) => handleBookingAction('quote', id)}
                onViewDetails={(id) => handleBookingAction('view', id)}
              />
            </div>

            {/* Right Column - Notifications */}
            <div>
              <NotificationPanel
                notifications={notifications}
                onMarkAsRead={handleNotificationAction}
                onMarkAllAsRead={handleMarkAllNotificationsRead}
              />
            </div>
          </div>

          {/* Revenue Chart and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RevenueChart
              data={revenueData?.[currentPeriod]}
              period={currentPeriod}
              onPeriodChange={setCurrentPeriod}
            />
            <CalendarWidget
              availability={availability}
              bookings={calendarBookings}
              onUpdateAvailability={handleUpdateAvailability}
              onViewCalendar={handleViewCalendar}
            />
          </div>

          {/* Quick Actions */}
          <QuickActionsPanel onAction={handleQuickAction} />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;