import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfirmationStep = ({ 
  formData, 
  onUpdate, 
  errors = {}, 
  onSubmit,
  isSubmitting = false 
}) => {
  const [paymentMethod, setPaymentMethod] = useState(formData?.paymentMethod || 'online');
  const [acceptedTerms, setAcceptedTerms] = useState(formData?.acceptedTerms || false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(formData?.acceptedPrivacy || false);

  const serviceAddOns = [
    { id: 'decoration', name: 'Premium Decoration', price: 15000 },
    { id: 'photography', name: 'Professional Photography', price: 25000 },
    { id: 'videography', name: 'Videography Package', price: 30000 },
    { id: 'catering', name: 'Premium Catering', price: 800, priceUnit: 'per person' },
    { id: 'music', name: 'Live Music Band', price: 20000 },
    { id: 'lighting', name: 'Special Lighting', price: 12000 }
  ];

  const paymentMethods = [
    {
      id: 'online',
      name: 'Online Payment',
      description: 'Pay securely with UPI, Cards, or Net Banking',
      icon: 'CreditCard',
      discount: 2
    },
    {
      id: 'partial',
      name: 'Partial Payment',
      description: 'Pay 30% now, rest before event',
      icon: 'Wallet',
      discount: 0
    },
    {
      id: 'cash',
      name: 'Cash on Event',
      description: 'Pay directly to vendor on event day',
      icon: 'Banknote',
      discount: 0
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeSlotLabel = (timeSlot) => {
    const timeSlots = {
      'morning': 'Morning (9:00 AM - 12:00 PM)',
      'afternoon': 'Afternoon (12:00 PM - 4:00 PM)',
      'evening': 'Evening (4:00 PM - 8:00 PM)',
      'night': 'Night (8:00 PM - 12:00 AM)',
      'full-day': 'Full Day (9:00 AM - 10:00 PM)'
    };
    return timeSlots?.[timeSlot] || timeSlot;
  };

  const calculateAddOnCost = () => {
    const selectedAddOns = formData?.selectedAddOns || [];
    return selectedAddOns?.reduce((total, addOnId) => {
      const addOn = serviceAddOns?.find(service => service?.id === addOnId);
      if (addOn) {
        if (addOn?.priceUnit === 'per person') {
          return total + (addOn?.price * (parseInt(formData?.guestCount) || 0));
        }
        return total + addOn?.price;
      }
      return total;
    }, 0);
  };

  const calculateEstimatedTotal = () => {
    const baseAmount = formData?.budgetRange ? formData?.budgetRange?.[0] : 0;
    const addOnCost = calculateAddOnCost();
    const subtotal = baseAmount + addOnCost;
    const gst = subtotal * 0.18;
    const platformFee = subtotal * 0.02;
    const selectedPayment = paymentMethods?.find(method => method?.id === paymentMethod);
    const discount = selectedPayment ? (subtotal * selectedPayment?.discount / 100) : 0;
    
    return {
      baseAmount,
      addOnCost,
      subtotal,
      gst,
      platformFee,
      discount,
      total: subtotal + gst + platformFee - discount
    };
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    const updatedData = { ...formData, paymentMethod: method };
    onUpdate(updatedData);
  };

  const handleTermsChange = (checked) => {
    setAcceptedTerms(checked);
    const updatedData = { ...formData, acceptedTerms: checked };
    onUpdate(updatedData);
  };

  const handlePrivacyChange = (checked) => {
    setAcceptedPrivacy(checked);
    const updatedData = { ...formData, acceptedPrivacy: checked };
    onUpdate(updatedData);
  };

  const handleSubmit = () => {
    if (onSubmit && acceptedTerms && acceptedPrivacy) {
      const finalData = {
        ...formData,
        paymentMethod,
        acceptedTerms,
        acceptedPrivacy,
        estimatedCost: calculateEstimatedTotal()
      };
      onSubmit(finalData);
    }
  };

  const pricing = calculateEstimatedTotal();
  const canSubmit = acceptedTerms && acceptedPrivacy && !isSubmitting;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Review & Confirm
        </h2>
        <p className="text-muted-foreground font-body">
          Please review your event details before submitting your quote request
        </p>
      </div>
      {/* Event Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Event Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                Event Type
              </label>
              <p className="text-foreground font-body font-medium capitalize">
                {formData?.eventType?.replace('-', ' ')}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                Date & Time
              </label>
              <p className="text-foreground font-body font-medium">
                {formData?.eventDate && formatDate(formData?.eventDate)}
              </p>
              <p className="text-sm text-muted-foreground font-caption">
                {formData?.timeSlot && getTimeSlotLabel(formData?.timeSlot)}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                Guest Count
              </label>
              <p className="text-foreground font-body font-medium">
                {formData?.guestCount} guests
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                Budget Range
              </label>
              <p className="text-foreground font-body font-medium">
                {formData?.budgetRange && formatCurrency(formData?.budgetRange?.[0])} - {formData?.budgetRange && formatCurrency(formData?.budgetRange?.[1])}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                Location
              </label>
              <p className="text-foreground font-body font-medium capitalize">
                {formData?.location?.replace('-', ' ')}
              </p>
              {formData?.venueAddress && (
                <p className="text-sm text-muted-foreground font-caption">
                  {formData?.venueAddress}
                </p>
              )}
            </div>
            
            <div>
              <label className="text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                Add-ons Selected
              </label>
              <p className="text-foreground font-body font-medium">
                {(formData?.selectedAddOns || [])?.length} services
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Selected Add-ons */}
      {(formData?.selectedAddOns || [])?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Selected Add-ons
          </h3>
          <div className="space-y-3">
            {(formData?.selectedAddOns || [])?.map(addOnId => {
              const addOn = serviceAddOns?.find(service => service?.id === addOnId);
              if (!addOn) return null;
              
              const cost = addOn?.priceUnit === 'per person' 
                ? addOn?.price * (parseInt(formData?.guestCount) || 0)
                : addOn?.price;
              
              return (
                <div key={addOnId} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <span className="font-body text-foreground">{addOn?.name}</span>
                  <span className="font-body font-semibold text-primary">
                    {formatCurrency(cost)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Pricing Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Estimated Pricing
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-foreground">Base Event Cost</span>
            <span className="font-body text-foreground">{formatCurrency(pricing?.baseAmount)}</span>
          </div>
          
          {pricing?.addOnCost > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-body text-foreground">Add-ons</span>
              <span className="font-body text-foreground">{formatCurrency(pricing?.addOnCost)}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="font-body text-foreground">GST (18%)</span>
            <span className="font-body text-foreground">{formatCurrency(pricing?.gst)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-body text-foreground">Platform Fee (2%)</span>
            <span className="font-body text-foreground">{formatCurrency(pricing?.platformFee)}</span>
          </div>
          
          {pricing?.discount > 0 && (
            <div className="flex items-center justify-between text-success">
              <span className="font-body">Online Payment Discount (2%)</span>
              <span className="font-body">-{formatCurrency(pricing?.discount)}</span>
            </div>
          )}
          
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-heading font-bold text-foreground">Total Estimated Cost</span>
              <span className="text-xl font-heading font-bold text-primary">{formatCurrency(pricing?.total)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-warning-foreground font-caption">
            <Icon name="Info" size={16} className="inline mr-1" />
            This is an estimated cost. Final pricing will be provided by vendors in their quotes.
          </p>
        </div>
      </div>
      {/* Payment Method */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Preferred Payment Method
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods?.map(method => (
            <button
              key={method?.id}
              onClick={() => handlePaymentMethodChange(method?.id)}
              className={`
                p-4 rounded-lg border-2 transition-smooth text-left
                ${paymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={method?.icon} size={20} className="text-primary" />
                <span className="font-body font-semibold text-foreground">
                  {method?.name}
                </span>
                {method?.discount > 0 && (
                  <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                    {method?.discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-caption">
                {method?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Terms & Conditions
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => handleTermsChange(e?.target?.checked)}
              className="mt-1"
            />
            <div>
              <p className="text-sm font-body text-foreground">
                I agree to the{' '}
                <button className="text-primary hover:underline font-medium">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:underline font-medium">
                  Booking Policy
                </button>
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={acceptedPrivacy}
              onChange={(e) => handlePrivacyChange(e?.target?.checked)}
              className="mt-1"
            />
            <div>
              <p className="text-sm font-body text-foreground">
                I acknowledge that I have read and understood the{' '}
                <button className="text-primary hover:underline font-medium">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
        
        {(errors?.acceptedTerms || errors?.acceptedPrivacy) && (
          <p className="text-sm text-error font-caption mt-2">
            Please accept all terms and conditions to proceed
          </p>
        )}
      </div>
      {/* Submit Button */}
      <div className="bg-card border border-border rounded-lg p-6">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          disabled={!canSubmit}
          onClick={handleSubmit}
          iconName="Send"
          iconPosition="right"
        >
          {isSubmitting ? 'Submitting Request...' : 'Submit Quote Request'}
        </Button>
        
        <p className="text-xs text-muted-foreground font-caption text-center mt-3">
          You will receive quotes from verified vendors within 24 hours
        </p>
      </div>
    </div>
  );
};

export default ConfirmationStep;