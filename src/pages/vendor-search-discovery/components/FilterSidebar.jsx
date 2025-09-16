import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onClearFilters,
  onApplyFilters,
  isMobile = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const priceRanges = [
    { value: '0-10000', label: 'Under ₹10,000' },
    { value: '10000-25000', label: '₹10,000 - ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000+', label: 'Above ₹1,00,000' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'newest', label: 'Newest First' }
  ];

  const availabilityOptions = [
    { value: 'today', label: 'Available Today' },
    { value: 'tomorrow', label: 'Available Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    if (isMobile) onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      priceRange: '',
      rating: '',
      availability: '',
      ecoFriendly: false,
      verified: false,
      sortBy: 'relevance',
      radius: '10'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
      <div className="border-b border-border last:border-b-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between py-4 px-6 text-left font-body font-semibold text-foreground hover:bg-muted/50 transition-smooth"
        >
          <span>{title}</span>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>
        {isExpanded && (
          <div className="px-6 pb-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Filters
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sort By */}
        <FilterSection title="Sort By">
          <Select
            options={sortOptions}
            value={localFilters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            placeholder="Select sorting"
          />
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-3">
            {priceRanges?.map((range) => (
              <label key={range?.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value={range?.value}
                  checked={localFilters?.priceRange === range?.value}
                  onChange={(e) => handleFilterChange('priceRange', e?.target?.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm font-body text-foreground">{range?.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Minimum Rating">
          <div className="space-y-3">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={localFilters?.rating === rating}
                  onChange={(e) => handleFilterChange('rating', parseInt(e?.target?.value))}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < rating ? 'text-amber-400 fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                  <span className="text-sm font-body text-foreground ml-2">& above</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability">
          <div className="space-y-3">
            {availabilityOptions?.map((option) => (
              <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value={option?.value}
                  checked={localFilters?.availability === option?.value}
                  onChange={(e) => handleFilterChange('availability', e?.target?.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-sm font-body text-foreground">{option?.label}</span>
              </label>
            ))}
          </div>
          
          {localFilters?.availability === 'custom' && (
            <div className="mt-4 space-y-3">
              <Input
                type="date"
                label="From Date"
                value={localFilters?.fromDate || ''}
                onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
              />
              <Input
                type="date"
                label="To Date"
                value={localFilters?.toDate || ''}
                onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
              />
            </div>
          )}
        </FilterSection>

        {/* Distance */}
        <FilterSection title="Distance">
          <div className="space-y-3">
            <label className="block text-sm font-body text-foreground">
              Within {localFilters?.radius} km
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={localFilters?.radius}
              onChange={(e) => handleFilterChange('radius', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground font-caption">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>
        </FilterSection>

        {/* Special Features */}
        <FilterSection title="Special Features">
          <div className="space-y-4">
            <Checkbox
              label="Eco-Friendly Options"
              checked={localFilters?.ecoFriendly}
              onChange={(e) => handleFilterChange('ecoFriendly', e?.target?.checked)}
            />
            <Checkbox
              label="Verified Vendors Only"
              checked={localFilters?.verified}
              onChange={(e) => handleFilterChange('verified', e?.target?.checked)}
            />
          </div>
        </FilterSection>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-border bg-card">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 w-full max-w-sm">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className={`
      w-80 bg-card border-r border-border transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;