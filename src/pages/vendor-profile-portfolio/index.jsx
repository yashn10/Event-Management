import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import VendorHero from './components/VendorHero';
import PortfolioGallery from './components/PortfolioGallery';
import VendorAbout from './components/VendorAbout';
import PricingPackages from './components/PricingPackages';
import ReviewsSection from './components/ReviewsSection';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ContactSection from './components/ContactSection';
import StickyBottomBar from './components/StickyBottomBar';

const VendorProfilePortfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAuthenticated] = useState(false);
  const [userRole] = useState('customer');

  // Mock vendor data
  const vendor = {
    id: "vendor-001",
    name: "Elegant Events & Decor",
    logo: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop&crop=center",
    categories: ["Wedding Decor", "Event Planning", "Floral Design"],
    rating: 4.8,
    reviewCount: 127,
    location: "Pune, Maharashtra",
    experience: 8,
    isEcoFriendly: true,
    responseTime: "2 hours",
    completedEvents: 450,
    isVerified: true,
    phone: "+91 98765 43210",
    email: "contact@elegantevents.com",
    address: "Shop No. 15, FC Road, Pune, Maharashtra 411005",
    workingHours: "Mon-Sat: 9:00 AM - 8:00 PM",
    languages: ["English", "Hindi", "Marathi"],
    coordinates: {
      lat: 18.5204,
      lng: 73.8567
    },
    description: `Elegant Events & Decor has been transforming ordinary spaces into extraordinary experiences for over 8 years. We specialize in creating memorable weddings, corporate events, and special celebrations with our unique blend of traditional Indian aesthetics and contemporary design elements.\n\nOur team of experienced designers and decorators work closely with clients to understand their vision and bring it to life within their budget. We pride ourselves on attention to detail, timely execution, and exceptional customer service.`,
    teamSize: 15,
    serviceAreas: ["Pune", "Mumbai", "Nashik", "Aurangabad", "Kolhapur"],
    specializations: ["Mandap Decoration", "Floral Arrangements", "Lighting Design", "Stage Setup", "Theme Parties"],
    certifications: [
      "Certified Event Planner - IIEP",
      "Best Wedding Decorator 2023 - Maharashtra Events Awards",
      "Eco-Friendly Business Certification"
    ]
  };

  // Mock portfolio images
  const portfolioImages = [
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
      title: "Royal Wedding Mandap",
      description: "Traditional mandap with marigold and rose decorations"
    },
    {
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      title: "Corporate Event Setup",
      description: "Modern corporate event with elegant lighting"
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      title: "Birthday Party Decor",
      description: "Colorful birthday celebration setup"
    },
    {
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
      title: "Garden Wedding",
      description: "Outdoor wedding with floral archway"
    },
    {
      url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop",
      title: "Reception Hall",
      description: "Elegant reception hall decoration"
    },
    {
      url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop",
      title: "Engagement Ceremony",
      description: "Intimate engagement setup with fairy lights"
    }
  ];

  // Mock pricing packages
  const pricingPackages = [
    {
      id: "basic",
      name: "Basic Decoration Package",
      startingPrice: 25000,
      description: "Perfect for intimate gatherings and small celebrations",
      duration: "4-6 hours setup",
      guestCapacity: "Up to 50 guests",
      customizable: true,
      isPopular: false,
      inclusions: [
        "Basic stage decoration",
        "Entrance gate decoration",
        "Table centerpieces",
        "Basic lighting setup",
        "Flower arrangements",
        "Setup and cleanup"
      ],
      exclusions: [
        "Sound system",
        "Photography",
        "Catering arrangements",
        "Additional decorative items"
      ]
    },
    {
      id: "premium",
      name: "Premium Wedding Package",
      startingPrice: 75000,
      description: "Comprehensive wedding decoration with premium elements",
      duration: "Full day setup",
      guestCapacity: "Up to 200 guests",
      customizable: true,
      isPopular: true,
      inclusions: [
        "Complete mandap decoration",
        "Bridal entry pathway",
        "Stage backdrop with lighting",
        "Guest seating arrangements",
        "Floral decorations throughout venue",
        "Welcome gate with flowers",
        "Photography corner setup",
        "Cleanup service"
      ],
      exclusions: [
        "Catering services",
        "Music and DJ",
        "Transportation",
        "Accommodation"
      ]
    },
    {
      id: "luxury",
      name: "Luxury Event Package",
      startingPrice: 150000,
      description: "Ultimate luxury experience with premium decorations and services",
      duration: "2-3 days planning and setup",
      guestCapacity: "200+ guests",
      customizable: true,
      isPopular: false,
      inclusions: [
        "Complete venue transformation",
        "Designer mandap with premium flowers",
        "LED lighting and effects",
        "Themed decorations",
        "VIP seating arrangements",
        "Multiple photo corners",
        "Dedicated event coordinator",
        "24/7 support during event",
        "Post-event cleanup"
      ],
      exclusions: [
        "Venue booking",
        "Catering services",
        "Entertainment",
        "Guest accommodation"
      ]
    }
  ];

  // Mock reviews
  const reviews = [
    {
      id: "review-001",
      customerName: "Priya Sharma",
      customerAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2024-01-15",
      eventType: "Wedding",
      isVerified: true,
      comment: "Absolutely stunning work! The team at Elegant Events transformed our wedding venue into a fairy tale setting. The attention to detail was incredible, and they managed everything perfectly within our budget. Highly recommended!",
      images: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop"
      ],
      helpfulCount: 12
    },
    {
      id: "review-002",
      customerName: "Rajesh Patel",
      customerAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.5,
      date: "2024-01-08",
      eventType: "Corporate Event",
      isVerified: true,
      comment: "Professional service for our company's annual event. The setup was modern and elegant, exactly what we wanted. The team was punctual and efficient. Will definitely book again for future events.",
      images: [],
      helpfulCount: 8
    },
    {
      id: "review-003",
      customerName: "Anita Desai",
      customerAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2023-12-22",
      eventType: "Birthday Party",
      isVerified: true,
      comment: "Amazing experience! They decorated my daughter's birthday party with such creativity and care. The theme was executed perfectly, and all the kids loved it. Great value for money!",
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop"
      ],
      helpfulCount: 15
    },
    {
      id: "review-004",
      customerName: "Vikram Singh",
      customerAvatar: "https://randomuser.me/api/portraits/men/38.jpg",
      rating: 4,
      date: "2023-12-10",
      eventType: "Anniversary",
      isVerified: false,
      comment: "Good service overall. The decoration was beautiful and the team was cooperative. There were minor delays in setup, but the final result was worth it. Would recommend for special occasions.",
      images: [],
      helpfulCount: 5
    },
    {
      id: "review-005",
      customerName: "Meera Joshi",
      customerAvatar: "https://randomuser.me/api/portraits/women/42.jpg",
      rating: 5,
      date: "2023-11-28",
      eventType: "Engagement",
      isVerified: true,
      comment: "Exceptional work! The engagement setup was romantic and elegant. They understood our vision perfectly and executed it beautifully. The eco-friendly approach was a bonus. Highly satisfied!",
      images: [
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=200&h=200&fit=crop"
      ],
      helpfulCount: 10
    }
  ];

  // Mock availability data
  const availability = {
    '2024-01-15': 'available',
    '2024-01-16': 'limited',
    '2024-01-17': 'booked',
    '2024-01-20': 'available',
    '2024-01-21': 'available',
    '2024-01-22': 'limited',
    '2024-01-25': 'booked',
    '2024-01-28': 'available',
    '2024-02-01': 'available',
    '2024-02-02': 'limited',
    '2024-02-05': 'available',
    '2024-02-10': 'booked',
    '2024-02-14': 'limited',
    '2024-02-15': 'available'
  };

  // Breadcrumb navigation
  const breadcrumbs = [
    { label: 'Search', path: '/vendor-search-discovery' },
    { label: 'Wedding Decor', path: '/vendor-search-discovery?category=wedding-decor' },
    { label: vendor?.name, path: null }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCall = () => {
    window.location.href = `tel:${vendor?.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in your event decoration services. Can you please provide more details?`);
    window.open(`https://wa.me/${vendor?.phone?.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleGetQuote = () => {
    navigate('/quote-request-booking-flow', {
      state: {
        vendor: vendor,
        selectedDate: selectedDate
      }
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSubmitInquiry = (inquiryData) => {
    console.log('Inquiry submitted:', inquiryData);
    // Handle inquiry submission
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavigation
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        activeRoute={location?.pathname}
        onNavigate={handleNavigation}
      />
      {/* Breadcrumb */}
      <div className="pt-16">
        <BreadcrumbNavigation
          breadcrumbs={breadcrumbs}
          onNavigate={handleNavigation}
        />
      </div>
      {/* Main Content */}
      <main className="pb-20 lg:pb-8">
        {/* Vendor Hero Section */}
        <VendorHero
          vendor={vendor}
          onGetQuote={handleGetQuote}
          onCall={handleCall}
          onWhatsApp={handleWhatsApp}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Portfolio Gallery */}
              <PortfolioGallery images={portfolioImages} />

              {/* About Section */}
              <VendorAbout vendor={vendor} />

              {/* Pricing Packages */}
              <PricingPackages packages={pricingPackages} />

              {/* Reviews Section */}
              <ReviewsSection
                reviews={reviews}
                overallRating={vendor?.rating}
                totalReviews={vendor?.reviewCount}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Availability Calendar */}
              <AvailabilityCalendar
                availability={availability}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />

              {/* Contact Section */}
              <ContactSection
                vendor={vendor}
                onCall={handleCall}
                onWhatsApp={handleWhatsApp}
                onSubmitInquiry={handleSubmitInquiry}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Sticky Bottom Bar for Mobile */}
      <StickyBottomBar
        onCall={handleCall}
        onWhatsApp={handleWhatsApp}
        onGetQuote={handleGetQuote}
        vendor={vendor}
      />
    </div>
  );
};

export default VendorProfilePortfolio;