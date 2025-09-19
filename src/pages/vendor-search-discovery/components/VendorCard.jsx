import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorCard = ({ vendor, onGetQuote, onViewProfile, isDesktop = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === vendor?.portfolio?.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? vendor?.portfolio?.length - 1 : prev - 1
      );
    }
  };

  const renderRating = () => (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {[...Array(5)]?.map((_, i) => (
          <Icon
            key={i}
            name="Star"
            size={14}
            className={
              i < Math.floor(vendor?.rating) 
                ? 'text-amber-400 fill-current' :'text-muted-foreground'
            }
          />
        ))}
      </div>
      <span className="text-sm font-body text-foreground font-medium">
        {vendor?.rating}
      </span>
      <span className="text-sm text-muted-foreground font-caption">
        ({vendor?.reviewCount})
      </span>
    </div>
  );

  const renderBadges = () => (
    <div className="flex items-center space-x-2 mb-3">
      {vendor?.isVerified && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium bg-success/10 text-success">
          <Icon name="CheckCircle" size={12} className="mr-1" />
          Verified
        </span>
      )}
      {vendor?.isEcoFriendly && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium bg-green-100 text-green-800">
          <Icon name="Leaf" size={12} className="mr-1" />
          Eco-Friendly
        </span>
      )}
      {vendor?.isPremium && (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium bg-amber-100 text-amber-800">
          <Icon name="Crown" size={12} className="mr-1" />
          Premium
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover:shadow-modal transition-smooth overflow-hidden group">
      {/* Image Gallery */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={vendor?.portfolio?.[currentImageIndex]}
          alt={`${vendor?.name} portfolio ${currentImageIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation */}
        {vendor?.portfolio?.length > 1 && (
          <>
            <button
              onClick={() => handleImageNavigation('prev')}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={() => handleImageNavigation('next')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {vendor?.portfolio?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={() => onViewProfile(vendor?.id)}
            className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            title="View Profile"
          >
            <Icon name="Eye" size={14} />
          </button>
          {/* <button
            className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            title="Add to Favorites"
          >
            <Icon name="Heart" size={14} />
          </button> */}
        </div>

        {/* Availability Status */}
        <div className="absolute top-2 left-2">
          <span className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium
            ${vendor?.isAvailable 
              ? 'bg-success/90 text-white' :'bg-error/90 text-white'
            }
          `}>
            <div className={`w-2 h-2 rounded-full mr-1 ${
              vendor?.isAvailable ? 'bg-white' : 'bg-white'
            }`} />
            {vendor?.isAvailable ? 'Available' : 'Busy'}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Vendor Logo & Name */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <Image
              src={vendor?.logo}
              alt={`${vendor?.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground text-lg leading-tight mb-1 truncate">
              {vendor?.name}
            </h3>
            <p className="text-sm text-muted-foreground font-caption mb-1">
              {vendor?.category}
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground font-caption">
              <Icon name="MapPin" size={12} />
              <span>{vendor?.location}</span>
              <span>•</span>
              <span>{vendor?.distance} km away</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        {renderBadges()}

        {/* Rating */}
        <div className="mb-3">
          {renderRating()}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">
          {vendor?.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-heading font-bold text-foreground">
              ₹{vendor?.startingPrice?.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-muted-foreground font-caption ml-1">
              onwards
            </span>
          </div>
          {vendor?.originalPrice && vendor?.originalPrice > vendor?.startingPrice && (
            <div className="text-right">
              <span className="text-sm text-muted-foreground font-caption line-through">
                ₹{vendor?.originalPrice?.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-success font-caption ml-1">
                {Math.round(((vendor?.originalPrice - vendor?.startingPrice) / vendor?.originalPrice) * 100)}% off
              </span>
            </div>
          )}
        </div>

        {/* Services Preview */}
        {vendor?.services && vendor?.services?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {vendor?.services?.slice(0, 3)?.map((service, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded"
                >
                  {service}
                </span>
              ))}
              {vendor?.services?.length > 3 && (
                <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded">
                  +{vendor?.services?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onViewProfile(vendor?.id)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Profile
          </Button>
          <Button
            onClick={() => onGetQuote(vendor?.id)}
            className="flex-1"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Get Quote
          </Button>
        </div>

        {/* Response Time */}
        <div className="mt-3 text-center">
          <span className="text-xs text-muted-foreground font-caption">
            <Icon name="Clock" size={12} className="inline mr-1" />
            Responds in {vendor?.responseTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;