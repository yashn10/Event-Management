import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  bookingReference, 
  estimatedQuotes = 3,
  onNavigateToBookings,
  onNavigateHome 
}) => {
  if (!isOpen) return null;

  const formatBookingReference = (ref) => {
    return ref || `EC${Date.now()?.toString()?.slice(-8)}`;
  };

  const mockContactInfo = {
    phone: "+91 98765 43210",
    email: "support@eventconnect.in",
    whatsapp: "+91 98765 43210"
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 text-center border-b border-border">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={48} className="text-success" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Request Submitted Successfully!
          </h2>
          <p className="text-muted-foreground font-body">
            Your quote request has been sent to verified vendors
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Reference */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Booking Reference
              </p>
              <p className="text-2xl font-heading font-bold text-primary">
                {formatBookingReference(bookingReference)}
              </p>
              <p className="text-xs text-muted-foreground font-caption mt-1">
                Save this reference for future communication
              </p>
            </div>
          </div>

          {/* What Happens Next */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-heading font-bold text-primary-foreground">1</span>
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground">
                    Vendor Matching
                  </p>
                  <p className="text-sm text-muted-foreground font-caption">
                    We're matching you with {estimatedQuotes}+ verified vendors based on your requirements
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-heading font-bold text-warning-foreground">2</span>
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground">
                    Receive Quotes
                  </p>
                  <p className="text-sm text-muted-foreground font-caption">
                    You'll receive detailed quotes within 24 hours via SMS and email
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-heading font-bold text-success-foreground">3</span>
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground">
                    Compare & Book
                  </p>
                  <p className="text-sm text-muted-foreground font-caption">
                    Review quotes, chat with vendors, and book your preferred service
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-body font-semibold text-foreground mb-3">
              Confirmation sent to:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-sm font-body text-foreground">
                  customer@example.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-sm font-body text-foreground">
                  +91 98765 43210
                </span>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-body font-semibold text-foreground mb-3">
              Need Help?
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-sm font-body text-foreground">Call Support</span>
                </div>
                <a 
                  href={`tel:${mockContactInfo?.phone}`}
                  className="text-sm font-body font-medium text-primary hover:underline"
                >
                  {mockContactInfo?.phone}
                </a>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                  <span className="text-sm font-body text-foreground">WhatsApp</span>
                </div>
                <a 
                  href={`https://wa.me/${mockContactInfo?.whatsapp?.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body font-medium text-primary hover:underline"
                >
                  Chat Now
                </a>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-sm font-body text-foreground">Email</span>
                </div>
                <a 
                  href={`mailto:${mockContactInfo?.email}`}
                  className="text-sm font-body font-medium text-primary hover:underline"
                >
                  {mockContactInfo?.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onNavigateToBookings}
            iconName="Calendar"
            iconPosition="left"
          >
            View My Bookings
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onNavigateHome}
            iconName="Home"
            iconPosition="left"
          >
            Back to Home
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onClose}
            className="text-muted-foreground"
          >
            Close
          </Button>
        </div>

        {/* Footer Note */}
        <div className="px-6 pb-6">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-warning-foreground font-caption">
                Keep your booking reference safe. You'll need it for all future communications regarding this event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;