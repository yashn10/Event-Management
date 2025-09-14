import React from 'react';
import VendorCard from './VendorCard';
import VendorCardSkeleton from './VendorCardSkeleton';

const VendorGrid = ({ 
  vendors, 
  loading, 
  onGetQuote, 
  onViewProfile,
  hasMore,
  onLoadMore 
}) => {
  const handleGetQuote = (vendorId) => {
    if (onGetQuote) {
      onGetQuote(vendorId);
    }
  };

  const handleViewProfile = (vendorId) => {
    if (onViewProfile) {
      onViewProfile(vendorId);
    }
  };

  if (loading && vendors?.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)]?.map((_, index) => (
          <VendorCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (vendors?.length === 0 && !loading) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          No vendors found
        </h3>
        <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
          We couldn't find any vendors matching your criteria. Try adjusting your filters or search terms.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground font-caption">
          <p>• Try different keywords or categories</p>
          <p>• Expand your location radius</p>
          <p>• Remove some filters to see more results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors?.map((vendor) => (
          <VendorCard
            key={vendor?.id}
            vendor={vendor}
            onGetQuote={handleGetQuote}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>
      {/* Loading More */}
      {loading && vendors?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)]?.map((_, index) => (
            <VendorCardSkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}
      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center py-8">
          <button
            onClick={onLoadMore}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:bg-primary/90 transition-smooth"
          >
            Load More Vendors
          </button>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && vendors?.length > 0 && (
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground font-caption">
            You've seen all available vendors for your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default VendorGrid;