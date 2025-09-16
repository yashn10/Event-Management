import React, { useState, useEffect } from 'react';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import BookingCard from './components/BookingCard';
import BookingFilters from './components/BookingFilters';
import BookingStats from './components/BookingStats';
import BookingTabs from './components/BookingTabs';
import EmptyState from './components/EmptyState';
import BookingCalendarView from './components/BookingCalendarView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerBookingManagement = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock booking data
  const mockBookings = [
    {
      id: 1,
      bookingId: 'EC2025001',
      eventType: 'Wedding Reception',
      vendorName: 'Royal Decorators',
      vendorId: 'vendor_001',
      eventDate: '2025-01-15T00:00:00Z',
      eventTime: '18:00',
      location: 'Pune, Maharashtra',
      guestCount: 150,
      status: 'Confirmed',
      totalAmount: 85000,
      advancePaid: 25000,
      paymentStatus: 'Partially Paid',
      duration: 6,
      specialRequirements: 'Floral arrangements with roses and marigolds',
      eventImage: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
      hasReview: false,
      communications: [
        {
          from: 'Royal Decorators',
          message: 'Confirmed your booking. We will contact you 2 days before the event.',
          date: '2025-01-05T10:30:00Z'
        }
      ]
    },
    {
      id: 2,
      bookingId: 'EC2025002',
      eventType: 'Birthday Party',
      vendorName: 'Party Perfect Caterers',
      vendorId: 'vendor_002',
      eventDate: '2025-01-20T00:00:00Z',
      eventTime: '16:00',
      location: 'Baner, Pune',
      guestCount: 50,
      status: 'Pending',
      totalAmount: 35000,
      advancePaid: 10000,
      paymentStatus: 'Partially Paid',
      duration: 4,
      specialRequirements: 'Vegetarian menu only',
      eventImage: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg',
      hasReview: false,
      communications: [
        {
          from: 'You',
          message: 'Requested quote for birthday party catering',
          date: '2025-01-08T14:20:00Z'
        }
      ]
    },
    {
      id: 3,
      bookingId: 'EC2024003',
      eventType: 'Corporate Event',
      vendorName: 'Elite Event Management',
      vendorId: 'vendor_003',
      eventDate: '2024-12-15T00:00:00Z',
      eventTime: '09:00',
      location: 'Hinjewadi, Pune',
      guestCount: 200,
      status: 'Completed',
      totalAmount: 120000,
      advancePaid: 120000,
      paymentStatus: 'Paid',
      duration: 8,
      specialRequirements: 'Audio-visual equipment and stage setup',
      eventImage: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      hasReview: false,
      communications: [
        {
          from: 'Elite Event Management',
          message: 'Thank you for choosing us. Event completed successfully!',
          date: '2024-12-15T18:00:00Z'
        }
      ]
    },
    {
      id: 4,
      bookingId: 'EC2024004',
      eventType: 'Anniversary Celebration',
      vendorName: 'Romantic Moments',
      vendorId: 'vendor_004',
      eventDate: '2024-11-10T00:00:00Z',
      eventTime: '19:00',
      location: 'Koregaon Park, Pune',
      guestCount: 30,
      status: 'Cancelled',
      totalAmount: 45000,
      advancePaid: 15000,
      paymentStatus: 'Refunded',
      duration: 3,
      specialRequirements: 'Intimate setup with candles and flowers',
      eventImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
      hasReview: false,
      communications: [
        {
          from: 'You',
          message: 'Cancelled due to personal reasons. Refund processed.',
          date: '2024-11-05T12:00:00Z'
        }
      ]
    }
  ];

  const [allBookings] = useState(mockBookings);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      filterBookingsByTab(activeTab);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filterBookingsByTab = (tab) => {
    const now = new Date();
    let filtered = [];

    switch (tab) {
      case 'upcoming':
        filtered = allBookings?.filter(booking => 
          new Date(booking.eventDate) >= now && 
          booking?.status !== 'Cancelled'
        );
        break;
      case 'past':
        filtered = allBookings?.filter(booking => 
          new Date(booking.eventDate) < now || 
          booking?.status === 'Completed'
        );
        break;
      case 'cancelled':
        filtered = allBookings?.filter(booking => 
          booking?.status === 'Cancelled'
        );
        break;
      default:
        filtered = allBookings;
    }

    setFilteredBookings(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterBookingsByTab(tab);
  };

  const handleFilterChange = (filters) => {
    let filtered = allBookings;

    // Filter by tab first
    const now = new Date();
    switch (activeTab) {
      case 'upcoming':
        filtered = filtered?.filter(booking => 
          new Date(booking.eventDate) >= now && 
          booking?.status !== 'Cancelled'
        );
        break;
      case 'past':
        filtered = filtered?.filter(booking => 
          new Date(booking.eventDate) < now || 
          booking?.status === 'Completed'
        );
        break;
      case 'cancelled':
        filtered = filtered?.filter(booking => 
          booking?.status === 'Cancelled'
        );
        break;
    }

    // Apply additional filters
    if (filters?.searchQuery) {
      const query = filters?.searchQuery?.toLowerCase();
      filtered = filtered?.filter(booking =>
        booking?.eventType?.toLowerCase()?.includes(query) ||
        booking?.vendorName?.toLowerCase()?.includes(query) ||
        booking?.location?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.eventType) {
      filtered = filtered?.filter(booking =>
        booking?.eventType?.toLowerCase()?.includes(filters?.eventType?.toLowerCase())
      );
    }

    if (filters?.status) {
      filtered = filtered?.filter(booking =>
        booking?.status?.toLowerCase() === filters?.status?.toLowerCase()
      );
    }

    if (filters?.vendor) {
      filtered = filtered?.filter(booking =>
        booking?.vendorName?.toLowerCase()?.includes(filters?.vendor?.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const handleClearFilters = () => {
    filterBookingsByTab(activeTab);
  };

  const getBookingCounts = () => {
    const now = new Date();
    return {
      upcoming: allBookings?.filter(booking => 
        new Date(booking.eventDate) >= now && 
        booking?.status !== 'Cancelled'
      )?.length,
      past: allBookings?.filter(booking => 
        new Date(booking.eventDate) < now || 
        booking?.status === 'Completed'
      )?.length,
      cancelled: allBookings?.filter(booking => 
        booking?.status === 'Cancelled'
      )?.length
    };
  };

  const getBookingStats = () => {
    return {
      total: allBookings?.length,
      upcoming: allBookings?.filter(booking => 
        new Date(booking.eventDate) >= new Date() && 
        booking?.status !== 'Cancelled'
      )?.length,
      completed: allBookings?.filter(booking => 
        booking?.status === 'Completed'
      )?.length,
      pending: allBookings?.filter(booking => 
        booking?.status === 'Pending'
      )?.length
    };
  };

  const handleViewDetails = (bookingId) => {
    console.log('View details for booking:', bookingId);
    // Navigate to booking details page
  };

  const handleModifyRequest = (bookingId) => {
    console.log('Modify request for booking:', bookingId);
    // Navigate to modification flow
  };

  const handleContactVendor = (vendorId) => {
    console.log('Contact vendor:', vendorId);
    // Open communication interface
  };

  const handleWriteReview = (bookingId) => {
    console.log('Write review for booking:', bookingId);
    // Open review modal
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEmptyStateAction = () => {
    // Navigate based on empty state type
    window.location.href = '/vendor-search-discovery';
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation 
          userRole="customer"
          isAuthenticated={true}
          activeRoute="/customer-booking-management"
          onNavigate={handleNavigation}
        />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading your bookings...</p>
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
        userRole="customer"
        isAuthenticated={true}
        activeRoute="/customer-booking-management"
        onNavigate={handleNavigation}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  My Bookings
                </h1>
                <p className="text-muted-foreground font-body mt-2">
                  Track and manage all your event bookings in one place
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  iconName="List"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  iconName="Calendar"
                  onClick={() => setViewMode('calendar')}
                >
                  Calendar
                </Button>
              </div>
            </div>
          </div>

          {/* Booking Stats */}
          <div className="mb-8">
            <BookingStats stats={getBookingStats()} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Filters */}
              <BookingFilters
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                totalBookings={filteredBookings?.length}
              />

              {/* Calendar View in Sidebar for Desktop */}
              {viewMode === 'list' && (
                <div className="hidden lg:block">
                  <BookingCalendarView
                    bookings={allBookings}
                    onDateSelect={handleDateSelect}
                    selectedDate={selectedDate}
                  />
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {viewMode === 'calendar' ? (
                <BookingCalendarView
                  bookings={allBookings}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                />
              ) : (
                <>
                  {/* Booking Tabs */}
                  <div className="mb-6">
                    <BookingTabs
                      activeTab={activeTab}
                      onTabChange={handleTabChange}
                      counts={getBookingCounts()}
                    />
                  </div>

                  {/* Booking List */}
                  <div className="space-y-6">
                    {filteredBookings?.length === 0 ? (
                      <EmptyState
                        type={activeTab}
                        onAction={handleEmptyStateAction}
                      />
                    ) : (
                      filteredBookings?.map((booking) => (
                        <BookingCard
                          key={booking?.id}
                          booking={booking}
                          onViewDetails={handleViewDetails}
                          onModifyRequest={handleModifyRequest}
                          onContactVendor={handleContactVendor}
                          onWriteReview={handleWriteReview}
                        />
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingManagement;