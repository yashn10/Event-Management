import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const ResultsHeader = ({ 
  totalResults, 
  currentFilters, 
  sortBy, 
  onSortChange, 
  onClearFilters,
  isMapView,
  onMapToggle 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'newest', label: 'Newest First' }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilters?.priceRange) count++;
    if (currentFilters?.rating) count++;
    if (currentFilters?.availability) count++;
    if (currentFilters?.ecoFriendly) count++;
    if (currentFilters?.verified) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Results Info & Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                {totalResults?.toLocaleString('en-IN')} vendors found
              </h2>
              <p className="text-sm text-muted-foreground font-caption">
                Showing results for your search criteria
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="hidden sm:block w-48">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={onSortChange}
                placeholder="Sort by"
              />
            </div>

            {/* Map Toggle */}
            <button
              onClick={onMapToggle}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-smooth
                ${isMapView 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }
              `}
            >
              <Icon name={isMapView ? "List" : "Map"} size={16} />
              <span className="hidden sm:inline">
                {isMapView ? "List View" : "Map View"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sort */}
        <div className="sm:hidden mb-4">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-full"
          />
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-body font-medium text-foreground">
              Active filters:
            </span>
            <div className="flex items-center space-x-2 flex-wrap">
              {currentFilters?.priceRange && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-primary/10 text-primary">
                  Price: {currentFilters?.priceRange?.replace('-', ' - ₹')?.replace('+', '+')}
                  {currentFilters?.priceRange !== '100000+' && currentFilters?.priceRange?.includes('-') && ''}
                </span>
              )}
              {currentFilters?.rating && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-primary/10 text-primary">
                  {currentFilters?.rating}+ stars
                </span>
              )}
              {currentFilters?.availability && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-primary/10 text-primary">
                  {currentFilters?.availability === 'today' ? 'Available Today' :
                   currentFilters?.availability === 'tomorrow' ? 'Available Tomorrow' :
                   currentFilters?.availability === 'this-week' ? 'This Week' :
                   currentFilters?.availability === 'this-month'? 'This Month' : 'Custom Date'}
                </span>
              )}
              {currentFilters?.ecoFriendly && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-green-100 text-green-800">
                  <Icon name="Leaf" size={12} className="mr-1" />
                  Eco-Friendly
                </span>
              )}
              {currentFilters?.verified && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-success/10 text-success">
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Verified Only
                </span>
              )}
              <button
                onClick={onClearFilters}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="X" size={12} className="mr-1" />
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-heading font-bold text-foreground">
              {Math.floor(totalResults * 0.85)}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Available Today
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-heading font-bold text-foreground">
              {Math.floor(totalResults * 0.72)}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Verified Vendors
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-heading font-bold text-foreground">
              4.2
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Avg Rating
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-heading font-bold text-foreground">
              2h
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Avg Response
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;