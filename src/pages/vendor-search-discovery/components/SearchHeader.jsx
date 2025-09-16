import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  selectedLocation, 
  onLocationChange, 
  onFilterToggle,
  isMapView,
  onMapToggle 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const locationOptions = [
    { value: 'pune', label: 'Pune' },
    { value: 'koregaon-park', label: 'Koregaon Park, Pune' },
    { value: 'baner', label: 'Baner, Pune' },
    { value: 'kothrud', label: 'Kothrud, Pune' },
    { value: 'viman-nagar', label: 'Viman Nagar, Pune' },
    { value: 'hadapsar', label: 'Hadapsar, Pune' },
    { value: 'wakad', label: 'Wakad, Pune' },
    { value: 'hinjewadi', label: 'Hinjewadi, Pune' }
  ];

  return (
    <div className="bg-card border-b border-border sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Search Row */}
        <div className="flex items-center space-x-3 mb-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search for photographers, decorators, caterers..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`
                  w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg
                  font-body text-foreground placeholder-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-smooth
                  ${isSearchFocused ? 'shadow-md' : 'shadow-sm'}
                `}
              />
            </div>
          </div>

          {/* Location Selector - Desktop */}
          <div className="hidden sm:block w-48">
            <Select
              options={locationOptions}
              value={selectedLocation}
              onChange={onLocationChange}
              placeholder="Select location"
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onFilterToggle}
              className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              title="Filters"
            >
              <Icon name="Filter" size={20} />
            </button>
            
            <button
              onClick={onMapToggle}
              className={`
                flex items-center justify-center w-10 h-10 border border-border rounded-lg transition-smooth
                ${isMapView 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={isMapView ? "List View" : "Map View"}
            >
              <Icon name={isMapView ? "List" : "Map"} size={20} />
            </button>
          </div>
        </div>

        {/* Location Selector - Mobile */}
        <div className="sm:hidden mb-4">
          <Select
            options={locationOptions}
            value={selectedLocation}
            onChange={onLocationChange}
            placeholder="Select location"
            className="w-full"
          />
        </div>

        {/* Search Suggestions - Show when focused */}
        {isSearchFocused && searchQuery?.length > 0 && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-popover border border-border rounded-lg shadow-modal z-50">
            <div className="p-2 space-y-1">
              <div className="px-3 py-2 text-sm text-muted-foreground font-caption">
                Popular searches
              </div>
              {[
                'Wedding photographers in Pune',
                'Birthday decorators near me',
                'Catering services under ₹500 per plate',
                'Banquet halls in Koregaon Park'
              ]?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSearchChange(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm font-body text-popover-foreground hover:bg-muted rounded-md transition-smooth"
                >
                  <Icon name="Search" size={14} className="inline mr-2 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;