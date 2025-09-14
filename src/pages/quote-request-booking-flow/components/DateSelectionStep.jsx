import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateSelectionStep = ({ 
  formData, 
  onUpdate, 
  errors = {}, 
  onValidate 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formData?.eventDate ? new Date(formData.eventDate) : null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(formData?.timeSlot || '');
  const [vendorAvailability, setVendorAvailability] = useState({});

  // Mock vendor availability data
  const mockAvailability = {
    '2025-01-15': { available: 8, booked: 2, status: 'high' },
    '2025-01-16': { available: 5, booked: 5, status: 'medium' },
    '2025-01-17': { available: 2, booked: 8, status: 'low' },
    '2025-01-18': { available: 0, booked: 10, status: 'unavailable' },
    '2025-01-20': { available: 9, booked: 1, status: 'high' },
    '2025-01-22': { available: 6, booked: 4, status: 'medium' },
    '2025-01-25': { available: 3, booked: 7, status: 'low' },
    '2025-01-28': { available: 7, booked: 3, status: 'high' },
    '2025-02-01': { available: 4, booked: 6, status: 'medium' },
    '2025-02-05': { available: 8, booked: 2, status: 'high' },
    '2025-02-10': { available: 1, booked: 9, status: 'low' },
    '2025-02-14': { available: 0, booked: 10, status: 'unavailable' },
    '2025-02-15': { available: 9, booked: 1, status: 'high' }
  };

  const timeSlots = [
    { value: 'morning', label: 'Morning (9:00 AM - 12:00 PM)', icon: 'Sunrise' },
    { value: 'afternoon', label: 'Afternoon (12:00 PM - 4:00 PM)', icon: 'Sun' },
    { value: 'evening', label: 'Evening (4:00 PM - 8:00 PM)', icon: 'Sunset' },
    { value: 'night', label: 'Night (8:00 PM - 12:00 AM)', icon: 'Moon' },
    { value: 'full-day', label: 'Full Day (9:00 AM - 10:00 PM)', icon: 'Clock' }
  ];

  useEffect(() => {
    setVendorAvailability(mockAvailability);
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const formatDate = (date) => {
    return date?.toISOString()?.split('T')?.[0];
  };

  const getAvailabilityStatus = (date) => {
    const dateStr = formatDate(date);
    return vendorAvailability?.[dateStr] || { available: 0, booked: 0, status: 'unavailable' };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-error/70 text-white';
      case 'unavailable': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleDateSelect = (date) => {
    const availability = getAvailabilityStatus(date);
    if (availability?.status === 'unavailable') return;
    
    setSelectedDate(date);
    const updatedData = { ...formData, eventDate: date?.toISOString() };
    onUpdate(updatedData);
    
    if (onValidate) {
      onValidate(updatedData);
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    const updatedData = { ...formData, timeSlot };
    onUpdate(updatedData);
    
    if (onValidate) {
      onValidate(updatedData);
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = date?.toDateString() === today?.toDateString();
      const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();
      const isPast = date < today;
      const availability = getAvailabilityStatus(date);
      
      days?.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateSelect(date)}
          disabled={isPast || availability?.status === 'unavailable'}
          className={`
            h-12 w-full rounded-lg text-sm font-body font-medium transition-smooth relative
            ${isPast 
              ? 'text-muted-foreground cursor-not-allowed opacity-50'
              : isSelected
                ? 'bg-primary text-primary-foreground ring-2 ring-primary/20'
                : availability?.status === 'unavailable' ?'text-muted-foreground cursor-not-allowed' :'hover:bg-muted text-foreground'
            }
            ${isToday && !isSelected ? 'ring-1 ring-primary' : ''}
          `}
        >
          <span className="relative z-10">{day}</span>
          {!isPast && availability?.status !== 'unavailable' && (
            <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${getStatusColor(availability?.status)}`} />
          )}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calendar" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Choose your event date
        </h2>
        <p className="text-muted-foreground font-body">
          Select a date and time that works best for your event
        </p>
      </div>
      {/* Calendar */}
      <div className="bg-card border border-border rounded-lg p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateMonth(-1)}
          >
            Previous
          </Button>
          
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {currentMonth?.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </h3>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateMonth(1)}
          >
            Next
          </Button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-sm font-caption font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs font-caption text-muted-foreground">High Availability</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-xs font-caption text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error/70"></div>
            <span className="text-xs font-caption text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-muted"></div>
            <span className="text-xs font-caption text-muted-foreground">Unavailable</span>
          </div>
        </div>
      </div>
      {/* Time Slot Selection */}
      {selectedDate && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Select Time Slot
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timeSlots?.map(slot => (
              <button
                key={slot?.value}
                onClick={() => handleTimeSlotSelect(slot?.value)}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border-2 transition-smooth text-left
                  ${selectedTimeSlot === slot?.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                  }
                `}
              >
                <Icon name={slot?.icon} size={20} />
                <span className="font-body font-medium">{slot?.label}</span>
              </button>
            ))}
          </div>
          {errors?.timeSlot && (
            <p className="text-sm text-error font-caption mt-2">{errors?.timeSlot}</p>
          )}
        </div>
      )}
      {/* Selected Date Summary */}
      {selectedDate && selectedTimeSlot && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} className="text-success-foreground" />
            </div>
            <div>
              <p className="text-sm font-body font-semibold text-foreground">
                Event scheduled for {selectedDate?.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                Time: {timeSlots?.find(slot => slot?.value === selectedTimeSlot)?.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelectionStep;