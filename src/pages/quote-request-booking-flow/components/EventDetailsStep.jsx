import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventDetailsStep = ({ 
  formData, 
  onUpdate, 
  errors = {}, 
  onValidate 
}) => {
  const [budgetRange, setBudgetRange] = useState(formData?.budgetRange || [50000, 200000]);

  const eventTypeOptions = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'surprise', label: 'Surprise Party' },
    { value: 'conference', label: 'Conference' },
    { value: 'other', label: 'Other' }
  ];

  const locationOptions = [
    { value: 'pune-city', label: 'Pune City' },
    { value: 'pcmc', label: 'Pimpri-Chinchwad' },
    { value: 'wakad', label: 'Wakad' },
    { value: 'hinjewadi', label: 'Hinjewadi' },
    { value: 'kothrud', label: 'Kothrud' },
    { value: 'baner', label: 'Baner' },
    { value: 'aundh', label: 'Aundh' },
    { value: 'viman-nagar', label: 'Viman Nagar' },
    { value: 'koregaon-park', label: 'Koregaon Park' },
    { value: 'hadapsar', label: 'Hadapsar' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    onUpdate(updatedData);
    
    if (onValidate) {
      onValidate(updatedData);
    }
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e?.target?.value);
    const newRange = [value, budgetRange?.[1]];
    setBudgetRange(newRange);
    handleInputChange('budgetRange', newRange);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calendar" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Tell us about your event
        </h2>
        <p className="text-muted-foreground font-body">
          Provide basic details to help us find the perfect vendors for you
        </p>
      </div>
      {/* Event Type */}
      <div>
        <Select
          label="Event Type"
          placeholder="Select your event type"
          options={eventTypeOptions}
          value={formData?.eventType}
          onChange={(value) => handleInputChange('eventType', value)}
          error={errors?.eventType}
          required
          className="mb-4"
        />
      </div>
      {/* Guest Count */}
      <div>
        <Input
          label="Expected Guest Count"
          type="number"
          placeholder="e.g., 100"
          value={formData?.guestCount}
          onChange={(e) => handleInputChange('guestCount', e?.target?.value)}
          error={errors?.guestCount}
          description="Approximate number of guests attending"
          min="1"
          max="10000"
          required
          className="mb-4"
        />
      </div>
      {/* Budget Range */}
      <div className="space-y-4">
        <label className="block text-sm font-body font-semibold text-foreground">
          Budget Range <span className="text-error">*</span>
        </label>
        <div className="px-4 py-6 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-caption text-muted-foreground">Minimum</span>
            <span className="text-lg font-heading font-bold text-primary">
              {formatCurrency(budgetRange?.[0])}
            </span>
          </div>
          
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={budgetRange?.[0]}
            onChange={handleBudgetChange}
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>₹10K</span>
            <span>₹1L</span>
            <span>₹5L</span>
            <span>₹10L+</span>
          </div>
        </div>
        {errors?.budgetRange && (
          <p className="text-sm text-error font-caption">{errors?.budgetRange}</p>
        )}
      </div>
      {/* Location */}
      <div>
        <Select
          label="Event Location"
          placeholder="Select location in Maharashtra"
          options={locationOptions}
          value={formData?.location}
          onChange={(value) => handleInputChange('location', value)}
          error={errors?.location}
          searchable
          required
          className="mb-4"
        />
      </div>
      {/* Venue Address */}
      <div>
        <Input
          label="Venue Address (Optional)"
          type="text"
          placeholder="Enter specific venue address if known"
          value={formData?.venueAddress}
          onChange={(e) => handleInputChange('venueAddress', e?.target?.value)}
          description="Help vendors understand the exact location"
          className="mb-4"
        />
      </div>
      {/* Event Description */}
      <div>
        <label className="block text-sm font-body font-semibold text-foreground mb-2">
          Event Description (Optional)
        </label>
        <textarea
          placeholder="Tell us more about your event vision, theme, or special requirements..."
          value={formData?.eventDescription}
          onChange={(e) => handleInputChange('eventDescription', e?.target?.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body text-foreground placeholder-muted-foreground bg-input"
        />
        <p className="text-xs text-muted-foreground font-caption mt-1">
          This helps vendors provide more accurate quotes
        </p>
      </div>
      {/* Progress Indicator */}
      <div className="bg-card border border-border rounded-lg p-4 mt-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} className="text-success-foreground" />
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-foreground">
              Great! Your event details look good
            </p>
            <p className="text-xs text-muted-foreground font-caption">
              Next, we'll help you select the perfect date and time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsStep;