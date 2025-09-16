import React from 'react';

const VendorCardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 sm:h-56 bg-muted" />
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Vendor Logo & Name */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-muted flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-muted rounded mb-2 w-3/4" />
            <div className="h-4 bg-muted rounded mb-1 w-1/2" />
            <div className="h-3 bg-muted rounded w-2/3" />
          </div>
        </div>

        {/* Badges Skeleton */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="h-6 bg-muted rounded-full w-16" />
          <div className="h-6 bg-muted rounded-full w-20" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <div key={i} className="w-3 h-3 bg-muted rounded" />
            ))}
          </div>
          <div className="h-4 bg-muted rounded w-8 ml-2" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-4/5" />
        </div>

        {/* Pricing Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>

        {/* Services Skeleton */}
        <div className="flex flex-wrap gap-1 mb-4">
          <div className="h-6 bg-muted rounded w-16" />
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-6 bg-muted rounded w-14" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex space-x-2 mb-3">
          <div className="h-10 bg-muted rounded flex-1" />
          <div className="h-10 bg-muted rounded flex-1" />
        </div>

        {/* Response Time Skeleton */}
        <div className="text-center">
          <div className="h-3 bg-muted rounded w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default VendorCardSkeleton;