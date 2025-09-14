import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onViewDetails, onModifyRequest, onContactVendor, onWriteReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      case 'in-progress':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCountdownText = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffTime = event - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Event passed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days to go`;
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover:shadow-modal transition-smooth">
      {/* Main Card Content */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Event Image */}
          <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={booking?.eventImage}
              alt={booking?.eventType}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Booking Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                  {booking?.eventType}
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  by {booking?.vendorName}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)} whitespace-nowrap`}>
                {booking?.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} className="mr-2" />
                {formatDate(booking?.eventDate)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Clock" size={16} className="mr-2" />
                {formatTime(booking?.eventTime)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} className="mr-2" />
                {booking?.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Users" size={16} className="mr-2" />
                {booking?.guestCount} guests
              </div>
            </div>

            {/* Countdown for upcoming events */}
            {booking?.status === 'Confirmed' && new Date(booking.eventDate) > new Date() && (
              <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium mb-4">
                <Icon name="Timer" size={16} className="inline mr-2" />
                {getCountdownText(booking?.eventDate)}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(booking?.id)}
              >
                View Details
              </Button>

              {booking?.status === 'Confirmed' && new Date(booking.eventDate) > new Date() && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={() => onModifyRequest(booking?.id)}
                >
                  Modify Request
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => onContactVendor(booking?.vendorId)}
              >
                Contact Vendor
              </Button>

              {booking?.status === 'Completed' && !booking?.hasReview && (
                <Button
                  variant="default"
                  size="sm"
                  iconName="Star"
                  iconPosition="left"
                  onClick={() => onWriteReview(booking?.id)}
                >
                  Write Review
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={toggleExpanded}
            className="w-full justify-center"
          >
            {isExpanded ? 'Show Less' : 'Show More Details'}
          </Button>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border p-4 sm:p-6 bg-muted/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Event Information */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-3">Event Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="font-mono text-foreground">{booking?.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event Duration:</span>
                  <span className="text-foreground">{booking?.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Special Requirements:</span>
                  <span className="text-foreground">{booking?.specialRequirements || 'None'}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-3">Payment Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-semibold text-foreground">₹{booking?.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advance Paid:</span>
                  <span className="text-success">₹{booking?.advancePaid?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance Due:</span>
                  <span className="text-warning">₹{(booking?.totalAmount - booking?.advancePaid)?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className={`font-medium ${booking?.paymentStatus === 'Paid' ? 'text-success' : 'text-warning'}`}>
                    {booking?.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Communication History */}
          {booking?.communications && booking?.communications?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-heading font-semibold text-foreground mb-3">Recent Communications</h4>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {booking?.communications?.slice(0, 3)?.map((comm, index) => (
                  <div key={index} className="bg-card p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{comm?.from}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(comm?.date)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comm?.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCard;