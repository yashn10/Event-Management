import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingFilters = ({ onFilterChange, onClearFilters, totalBookings }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: '',
    eventType: '',
    status: '',
    vendor: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const eventTypeOptions = [
    { value: '', label: 'All Event Types' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'in-progress', label: 'In Progress' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'next-month', label: 'Next Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      searchQuery: '',
      dateRange: '',
      eventType: '',
      status: '',
      vendor: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <h3 className="font-heading font-semibold text-foreground">Filters</h3>
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {totalBookings} bookings
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block p-4`}>
        <div className="space-y-4">
          {/* Search Query */}
          <Input
            type="search"
            placeholder="Search by event name, vendor, or location..."
            value={filters?.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
            className="w-full"
          />

          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Date Range */}
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Select date range"
            />

            {/* Event Type */}
            <Select
              label="Event Type"
              options={eventTypeOptions}
              value={filters?.eventType}
              onChange={(value) => handleFilterChange('eventType', value)}
              placeholder="Select event type"
            />

            {/* Status */}
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Select status"
            />

            {/* Vendor Search */}
            <Input
              label="Vendor Name"
              type="text"
              placeholder="Search by vendor name..."
              value={filters?.vendor}
              onChange={(e) => handleFilterChange('vendor', e?.target?.value)}
            />
          </div>

          {/* Filter Actions */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={handleClearFilters}
                fullWidth
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;