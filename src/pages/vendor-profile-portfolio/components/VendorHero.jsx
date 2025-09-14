import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorHero = ({ vendor, onGetQuote, onCall, onWhatsApp }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-amber-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Vendor Logo & Basic Info */}
          <div className="flex items-start space-x-4 mb-6 lg:mb-0">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={vendor?.logo}
                alt={`${vendor?.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground mb-2">
                {vendor?.name}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {vendor?.categories?.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center space-x-1">
                  {renderRatingStars(vendor?.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {vendor?.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({vendor?.reviewCount} reviews)
                </span>
              </div>

              {/* Location & Experience */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{vendor?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{vendor?.experience} years experience</span>
                </div>
                {vendor?.isEcoFriendly && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="Leaf" size={14} />
                    <span>Eco-Friendly</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex flex-col space-y-3 flex-shrink-0">
            <Button
              variant="default"
              size="lg"
              onClick={onGetQuote}
              iconName="MessageSquare"
              iconPosition="left"
              className="w-48"
            >
              Get Quote
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="default"
                onClick={onCall}
                iconName="Phone"
                iconPosition="left"
                className="flex-1"
              >
                Call Now
              </Button>
              <Button
                variant="success"
                size="default"
                onClick={onWhatsApp}
                iconName="MessageCircle"
                iconPosition="left"
                className="flex-1"
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>GST Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} className="text-primary" />
            <span>Responds in {vendor?.responseTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>{vendor?.completedEvents}+ Events Completed</span>
          </div>
          {vendor?.isVerified && (
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="BadgeCheck" size={16} />
              <span>Verified Vendor</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorHero;