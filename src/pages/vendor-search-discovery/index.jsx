import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import SearchHeader from './components/SearchHeader';
import CategoryChips from './components/CategoryChips';
import FilterSidebar from './components/FilterSidebar';
import ResultsHeader from './components/ResultsHeader';
import VendorGrid from './components/VendorGrid';
import MapView from './components/MapView';

const VendorSearchDiscovery = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('pune');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [filters, setFilters] = useState({
    priceRange: '',
    rating: '',
    availability: '',
    ecoFriendly: false,
    verified: false,
    sortBy: 'relevance',
    radius: '10',
    fromDate: '',
    toDate: ''
  });

  // Mock vendor data
  const [vendors] = useState([
    {
      id: 1,
      name: "Pixel Perfect Photography",
      category: "Photography",
      location: "Koregaon Park, Pune",
      distance: 2.5,
      rating: 4.8,
      reviewCount: 127,
      startingPrice: 25000,
      originalPrice: 30000,
      logo: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?w=100&h=100&fit=crop&crop=face",
      portfolio: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop"
      ],
      description: "Professional wedding and event photography with a creative touch. Specializing in candid moments and artistic compositions.",
      services: ["Wedding Photography", "Pre-wedding Shoots", "Event Coverage", "Portrait Sessions"],
      isVerified: true,
      isEcoFriendly: false,
      isPremium: true,
      isAvailable: true,
      responseTime: "2 hours"
    },
    {
      id: 2,
      name: "Royal Decorators",
      category: "Decoration",
      location: "Baner, Pune",
      distance: 4.2,
      rating: 4.6,
      reviewCount: 89,
      startingPrice: 15000,
      logo: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop",
      portfolio: [
        "https://images.unsplash.com/photo-1519167758481-83f29c8e8d4b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop"
      ],
      description: "Creating magical moments with stunning decorations for all types of events. From intimate gatherings to grand celebrations.",
      services: ["Wedding Decoration", "Birthday Themes", "Corporate Events", "Floral Arrangements"],
      isVerified: true,
      isEcoFriendly: true,
      isPremium: false,
      isAvailable: true,
      responseTime: "1 hour"
    },
    {
      id: 3,
      name: "Spice Garden Catering",
      category: "Catering",
      location: "Kothrud, Pune",
      distance: 3.8,
      rating: 4.7,
      reviewCount: 156,
      startingPrice: 350,
      logo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop",
      portfolio: [
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
      ],
      description: "Authentic Indian cuisine with modern presentation. Specializing in traditional recipes with contemporary twists.",
      services: ["Wedding Catering", "Corporate Lunch", "Party Buffets", "Live Counters"],
      isVerified: true,
      isEcoFriendly: true,
      isPremium: false,
      isAvailable: false,
      responseTime: "30 minutes"
    },
    {
      id: 4,
      name: "Harmony Music Events",
      category: "Music & DJ",
      location: "Viman Nagar, Pune",
      distance: 6.1,
      rating: 4.5,
      reviewCount: 73,
      startingPrice: 12000,
      originalPrice: 15000,
      logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      portfolio: [
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
      ],
      description: "Professional DJ services and live music performances for all occasions. Creating the perfect atmosphere for your events.",
      services: ["DJ Services", "Live Band", "Sound System", "Lighting Effects"],
      isVerified: false,
      isEcoFriendly: false,
      isPremium: false,
      isAvailable: true,
      responseTime: "4 hours"
    },
    {
      id: 5,
      name: "Grand Palace Banquets",
      category: "Venues",
      location: "Hadapsar, Pune",
      distance: 8.3,
      rating: 4.9,
      reviewCount: 234,
      startingPrice: 45000,
      logo: "https://images.unsplash.com/photo-1519167758481-83f29c8e8d4b?w=100&h=100&fit=crop",
      portfolio: [
        "https://images.unsplash.com/photo-1519167758481-83f29c8e8d4b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop"
      ],
      description: "Luxurious banquet halls with world-class amenities. Perfect for weddings, corporate events, and special celebrations.",
      services: ["Wedding Halls", "Conference Rooms", "Party Venues", "Outdoor Spaces"],
      isVerified: true,
      isEcoFriendly: false,
      isPremium: true,
      isAvailable: true,
      responseTime: "1 hour"
    },
    {
      id: 6,
      name: "Elite Transport Services",
      category: "Transport",
      location: "Wakad, Pune",
      distance: 12.5,
      rating: 4.3,
      reviewCount: 45,
      startingPrice: 8000,
      logo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop",
      portfolio: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop"
      ],
      description: "Premium wedding cars and luxury transportation services. Making your special day even more memorable with style.",
      services: ["Wedding Cars", "Luxury Sedans", "Vintage Cars", "Decorated Vehicles"],
      isVerified: true,
      isEcoFriendly: false,
      isPremium: false,
      isAvailable: true,
      responseTime: "3 hours"
    }
  ]);

  const [filteredVendors, setFilteredVendors] = useState(vendors);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, filters, vendors]);

  const applyFilters = () => {
    setLoading(true);
    
    setTimeout(() => {
      let filtered = [...vendors];

      // Search query filter
      if (searchQuery?.trim()) {
        filtered = filtered?.filter(vendor =>
          vendor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          vendor?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          vendor?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          vendor?.services?.some(service => 
            service?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          )
        );
      }

      // Category filter
      if (selectedCategory !== 'all') {
        filtered = filtered?.filter(vendor =>
          vendor?.category?.toLowerCase()?.includes(selectedCategory?.toLowerCase())
        );
      }

      // Price range filter
      if (filters?.priceRange) {
        const [min, max] = filters?.priceRange?.split('-')?.map(p => 
          p?.includes('+') ? Infinity : parseInt(p)
        );
        filtered = filtered?.filter(vendor =>
          vendor?.startingPrice >= min && 
          (max === Infinity || vendor?.startingPrice <= max)
        );
      }

      // Rating filter
      if (filters?.rating) {
        filtered = filtered?.filter(vendor => vendor?.rating >= filters?.rating);
      }

      // Verified filter
      if (filters?.verified) {
        filtered = filtered?.filter(vendor => vendor?.isVerified);
      }

      // Eco-friendly filter
      if (filters?.ecoFriendly) {
        filtered = filtered?.filter(vendor => vendor?.isEcoFriendly);
      }

      // Availability filter
      if (filters?.availability && filters?.availability !== 'custom') {
        filtered = filtered?.filter(vendor => vendor?.isAvailable);
      }

      // Sort results
      switch (filters?.sortBy) {
        case 'rating':
          filtered?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'price-low':
          filtered?.sort((a, b) => a?.startingPrice - b?.startingPrice);
          break;
        case 'price-high':
          filtered?.sort((a, b) => b?.startingPrice - a?.startingPrice);
          break;
        case 'distance':
          filtered?.sort((a, b) => a?.distance - b?.distance);
          break;
        case 'newest':
          filtered?.sort((a, b) => b?.id - a?.id);
          break;
        default:
          // Keep relevance order (default)
          break;
      }

      setFilteredVendors(filtered);
      setLoading(false);
    }, 500);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleGetQuote = (vendorId) => {
    navigate('/quote-request-booking-flow', { 
      state: { selectedVendorId: vendorId } 
    });
  };

  const handleViewProfile = (vendorId) => {
    navigate('/vendor-profile-portfolio', { 
      state: { vendorId: vendorId } 
    });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceRange: '',
      rating: '',
      availability: '',
      ecoFriendly: false,
      verified: false,
      sortBy: 'relevance',
      radius: '10',
      fromDate: '',
      toDate: ''
    };
    setFilters(clearedFilters);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavigation
        userRole="customer"
        isAuthenticated={false}
        activeRoute="/vendor-search-discovery"
        onNavigate={handleNavigation}
      />
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
        isMapView={isMapView}
        onMapToggle={() => setIsMapView(!isMapView)}
      />
      {/* Category Chips */}
      <CategoryChips
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {/* Results Header */}
      <ResultsHeader
        totalResults={filteredVendors?.length}
        currentFilters={filters}
        sortBy={filters?.sortBy}
        onSortChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
        onClearFilters={handleClearFilters}
        isMapView={isMapView}
        onMapToggle={() => setIsMapView(!isMapView)}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              onApplyFilters={() => {}}
              isMobile={false}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            onApplyFilters={() => setIsFilterOpen(false)}
            isMobile={true}
          />

          {/* Content Area */}
          <div className="flex-1 lg:ml-6">
            {isMapView ? (
              <div className="h-[600px]">
                <MapView
                  vendors={filteredVendors}
                  selectedVendor={selectedVendor}
                  onVendorSelect={setSelectedVendor}
                  onGetQuote={handleGetQuote}
                />
              </div>
            ) : (
              <VendorGrid
                vendors={filteredVendors}
                loading={loading}
                onGetQuote={handleGetQuote}
                onViewProfile={handleViewProfile}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSearchDiscovery;