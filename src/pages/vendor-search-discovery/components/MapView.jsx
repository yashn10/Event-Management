import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MapView = ({ vendors, selectedVendor, onVendorSelect, onGetQuote }) => {
  const [mapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune coordinates

  const handleVendorClick = (vendor) => {
    if (onVendorSelect) {
      onVendorSelect(vendor);
    }
  };

  const handleGetQuote = (vendorId) => {
    if (onGetQuote) {
      onGetQuote(vendorId);
    }
  };

  const renderVendorPopup = (vendor) => {
    if (!vendor) return null;

    return (
      <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-modal p-4 z-10">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
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
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
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
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-heading font-bold text-foreground">
                  ₹{vendor?.startingPrice?.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-muted-foreground font-caption ml-1">
                  onwards
                </span>
              </div>
              <button
                onClick={() => handleGetQuote(vendor?.id)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body font-medium hover:bg-primary/90 transition-smooth"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-full bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Vendor Locations in Pune"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
        className="border-0"
      />
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth shadow-sm">
          <Icon name="Plus" size={16} />
        </button>
        <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth shadow-sm">
          <Icon name="Minus" size={16} />
        </button>
        <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth shadow-sm">
          <Icon name="Navigation" size={16} />
        </button>
      </div>
      {/* Vendor Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {vendors?.map((vendor, index) => (
          <div
            key={vendor?.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${20 + (index % 5) * 15}%`,
              top: `${20 + Math.floor(index / 5) * 15}%`,
            }}
            onClick={() => handleVendorClick(vendor)}
          >
            <div className={`
              relative w-8 h-8 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110
              ${selectedVendor?.id === vendor?.id 
                ? 'bg-primary border-primary' 
                : vendor?.isAvailable 
                  ? 'bg-success' :'bg-error'
              }
            `}>
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <Icon 
                  name={vendor?.category === 'photography' ? 'Camera' : 
                        vendor?.category === 'catering' ? 'ChefHat' :
                        vendor?.category === 'decoration' ? 'Palette' :
                        vendor?.category === 'music' ? 'Music' :
                        vendor?.category === 'venue'? 'Building' : 'MapPin'} 
                  size={14} 
                  className="text-white" 
                />
              </div>
              
              {/* Price Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 shadow-sm whitespace-nowrap">
                <span className="text-xs font-caption font-medium text-foreground">
                  ₹{vendor?.startingPrice?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-sm">
        <h4 className="text-sm font-body font-semibold text-foreground mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs font-caption text-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-xs font-caption text-foreground">Busy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs font-caption text-foreground">Selected</span>
          </div>
        </div>
      </div>
      {/* Selected Vendor Popup */}
      {selectedVendor && renderVendorPopup(selectedVendor)}
      {/* Map Loading Overlay */}
      <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground font-caption">Loading map...</p>
        </div>
      </div>
    </div>
  );
};

export default MapView;