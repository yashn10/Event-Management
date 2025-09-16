import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews = [], overallRating = 0, totalReviews = 0 }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-amber-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[Math.floor(review.rating)]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'verified', label: 'Verified Only' }
  ];

  if (!reviews || reviews?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No reviews available yet</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Customer Reviews
        </h2>
        <p className="text-muted-foreground">
          What our customers say about their experience
        </p>
      </div>
      {/* Rating Overview */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="text-3xl font-bold text-foreground">{overallRating}</span>
              <div className="flex items-center space-x-1">
                {renderRatingStars(overallRating)}
              </div>
            </div>
            <p className="text-muted-foreground">
              Based on {totalReviews} customer reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map(rating => {
              const count = ratingDistribution?.[rating] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground w-8">
                    {rating} ★
                  </span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Filter Options */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map(option => (
            <button
              key={option?.value}
              onClick={() => setSelectedFilter(option?.value)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${selectedFilter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Reviews List */}
      <div className="p-6 space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start space-x-4">
              {/* Customer Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={review?.customerAvatar}
                  alt={review?.customerName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">
                        {review?.customerName}
                      </h4>
                      {review?.isVerified && (
                        <Icon name="BadgeCheck" size={16} className="text-success" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderRatingStars(review?.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                  
                  {review?.eventType && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {review?.eventType}
                    </span>
                  )}
                </div>

                {/* Review Content */}
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {review?.comment}
                </p>

                {/* Review Images */}
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.images?.slice(0, 3)?.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {review?.images?.length > 3 && (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          +{review?.images?.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Helpful Actions */}
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount || 0})</span>
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Reviews */}
      {reviews?.length > 3 && (
        <div className="p-6 border-t border-border text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Show Less Reviews' : `View All ${reviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;