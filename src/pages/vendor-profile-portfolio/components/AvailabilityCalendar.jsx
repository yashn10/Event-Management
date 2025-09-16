import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityCalendar = ({ availability = {}, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getDateStatus = (date) => {
    if (!date) return null;
    
    const dateKey = date?.toISOString()?.split('T')?.[0];
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    
    if (date < today) {
      return 'past';
    }
    
    return availability?.[dateKey] || 'available';
  };

  const handleDateClick = async (date) => {
    if (!date) return;
    
    const status = getDateStatus(date);
    if (status === 'past' || status === 'booked') return;
    
    setIsLoading(true);
    
    // Simulate API call to check real-time availability
    setTimeout(() => {
      if (onDateSelect) {
        onDateSelect(date);
      }
      setIsLoading(false);
    }, 500);
  };

  const getDateClassName = (date) => {
    if (!date) return '';
    
    const status = getDateStatus(date);
    const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();
    
    let baseClasses = 'w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors cursor-pointer';
    
    if (isSelected) {
      return `${baseClasses} bg-primary text-primary-foreground`;
    }
    
    switch (status) {
      case 'past':
        return `${baseClasses} text-muted-foreground/50 cursor-not-allowed`;
      case 'available':
        return `${baseClasses} text-foreground hover:bg-muted border border-transparent hover:border-border`;
      case 'limited':
        return `${baseClasses} text-warning bg-warning/10 hover:bg-warning/20 border border-warning/20`;
      case 'booked':
        return `${baseClasses} text-error bg-error/10 cursor-not-allowed border border-error/20`;
      default:
        return `${baseClasses} text-foreground hover:bg-muted`;
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Check Availability
        </h2>
        <p className="text-muted-foreground">
          Select a date to check real-time availability and pricing
        </p>
      </div>
      <div className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            disabled={isLoading}
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            disabled={isLoading}
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames?.map(day => (
            <div key={day} className="h-10 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {days?.map((date, index) => (
            <div key={index} className="relative">
              {date && (
                <button
                  onClick={() => handleDateClick(date)}
                  className={getDateClassName(date)}
                  disabled={isLoading || getDateStatus(date) === 'past' || getDateStatus(date) === 'booked'}
                >
                  {date?.getDate()}
                  
                  {/* Status Indicator */}
                  {getDateStatus(date) === 'limited' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full" />
                  )}
                  {getDateStatus(date) === 'booked' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted border border-border rounded" />
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning/20 border border-warning/20 rounded relative">
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-warning rounded-full" />
            </div>
            <span className="text-sm text-muted-foreground">Limited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error/20 border border-error/20 rounded relative">
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-error rounded-full" />
            </div>
            <span className="text-sm text-muted-foreground">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded" />
            <span className="text-sm text-muted-foreground">Selected</span>
          </div>
        </div>

        {/* Selected Date Info */}
        {selectedDate && (
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Selected Date
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedDate?.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-success font-medium">Available</p>
                <p className="text-xs text-muted-foreground">Instant confirmation</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            className="flex-1"
            disabled={!selectedDate || isLoading}
            loading={isLoading}
            iconName="Calendar"
            iconPosition="left"
          >
            {selectedDate ? 'Book This Date' : 'Select a Date'}
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Get Quote
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            Need help choosing a date?
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground text-sm rounded-full transition-colors">
              Next Weekend
            </button>
            <button className="px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground text-sm rounded-full transition-colors">
              Next Month
            </button>
            <button className="px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground text-sm rounded-full transition-colors">
              Flexible Dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;