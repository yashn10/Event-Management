import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onAction }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'upcoming':
        return {
          icon: 'Calendar',
          title: 'No Upcoming Bookings',
          description: 'You don\'t have any upcoming events scheduled. Start planning your next celebration!',
          actionText: 'Browse Vendors',
          actionIcon: 'Search'
        };
      case 'past':
        return {
          icon: 'History',
          title: 'No Past Bookings',
          description: 'Your completed events will appear here once you start booking with vendors.',
          actionText: 'Make Your First Booking',
          actionIcon: 'Plus'
        };
      case 'cancelled':
        return {
          icon: 'XCircle',
          title: 'No Cancelled Bookings',
          description: 'Great! You haven\'t cancelled any bookings. Keep up the good planning!',
          actionText: 'View Upcoming Events',
          actionIcon: 'Calendar'
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: 'We couldn\'t find any bookings matching your search criteria. Try adjusting your filters.',
          actionText: 'Clear Filters',
          actionIcon: 'X'
        };
      default:
        return {
          icon: 'Calendar',
          title: 'No Bookings Yet',
          description: 'Start your event planning journey by browsing our amazing vendors.',
          actionText: 'Explore Vendors',
          actionIcon: 'Search'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name={content?.icon} size={32} className="text-muted-foreground" />
        </div>
        
        <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
          {content?.title}
        </h3>
        
        <p className="text-muted-foreground font-body mb-6">
          {content?.description}
        </p>
        
        <Button
          variant="default"
          iconName={content?.actionIcon}
          iconPosition="left"
          onClick={onAction}
        >
          {content?.actionText}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;