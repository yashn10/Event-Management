import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const BookingCalendarView = ({ bookings, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getBookingsForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return bookings?.filter(booking => 
      booking?.eventDate?.split('T')?.[0] === dateStr
    );
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(
        <div key={`empty-${i}`} className="h-10 sm:h-12"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayBookings = getBookingsForDate(date);
      const isSelected = selectedDate && 
        selectedDate?.toDateString() === date?.toDateString();
      const isToday = new Date()?.toDateString() === date?.toDateString();

      days?.push(
        <div
          key={day}
          onClick={() => onDateSelect(date)}
          className={`
            h-10 sm:h-12 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-smooth
            ${isSelected 
              ? 'bg-primary text-primary-foreground' 
              : isToday
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-muted'
            }
          `}
        >
          <span className="text-sm font-medium">{day}</span>
          {dayBookings?.length > 0 && (
            <div className="flex space-x-1 mt-1">
              {dayBookings?.slice(0, 3)?.map((booking, index) => (
                <div
                  key={index}
                  className={`
                    w-1.5 h-1.5 rounded-full
                    ${booking?.status === 'confirmed' ? 'bg-success' :
                      booking?.status === 'pending' ? 'bg-warning' :
                      booking?.status === 'completed'? 'bg-primary' : 'bg-error'
                    }
                  `}
                />
              ))}
              {dayBookings?.length > 3 && (
                <span className="text-xs">+</span>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateMonth(-1)}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateMonth(1)}
          />
        </div>
      </div>
      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
          <div key={day} className="h-8 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">{day}</span>
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span className="text-muted-foreground">Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-warning"></div>
            <span className="text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-error"></div>
            <span className="text-muted-foreground">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarView;