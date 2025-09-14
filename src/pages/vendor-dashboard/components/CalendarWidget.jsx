import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = ({ availability, bookings, onUpdateAvailability, onViewCalendar }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getDayStatus = (date) => {
    if (!date) return null;
    
    const dateStr = date?.toISOString()?.split('T')?.[0];
    const booking = bookings?.find(b => b?.date === dateStr);
    const isAvailable = availability?.includes(dateStr);
    
    if (booking) {
      return {
        type: 'booked',
        color: 'bg-error text-error-foreground',
        tooltip: `Booked: ${booking?.eventType}`
      };
    }
    
    if (isAvailable) {
      return {
        type: 'available',
        color: 'bg-success text-success-foreground',
        tooltip: 'Available for booking'
      };
    }
    
    return {
      type: 'unavailable',
      color: 'bg-muted text-muted-foreground',
      tooltip: 'Not available'
    };
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const upcomingBookings = bookings?.filter(booking => new Date(booking.date) >= new Date())?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Calendar Overview
          </h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            onClick={onViewCalendar}
          >
            Full Calendar
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-heading font-semibold text-foreground">
            {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
          </h4>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames?.map(day => (
              <div key={day} className="p-2 text-center">
                <span className="text-xs font-caption font-medium text-muted-foreground">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days?.map((date, index) => {
              const status = getDayStatus(date);
              const today = isToday(date);
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm font-body rounded-lg transition-smooth cursor-pointer
                    ${date 
                      ? 'hover:bg-muted/50' :''
                    }
                    ${today 
                      ? 'ring-2 ring-primary ring-offset-2' :''
                    }
                    ${status?.color || 'text-muted-foreground'}
                  `}
                  title={status?.tooltip}
                  onClick={() => date && onUpdateAvailability(date)}
                >
                  {date ? date?.getDate() : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mb-6 text-xs font-caption">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Booked</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span className="text-muted-foreground">Unavailable</span>
          </div>
        </div>

        {/* Upcoming Bookings */}
        {upcomingBookings?.length > 0 && (
          <div>
            <h5 className="font-body font-semibold text-foreground mb-3">
              Upcoming Bookings
            </h5>
            <div className="space-y-2">
              {upcomingBookings?.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <Icon name="Calendar" size={16} />
                    </div>
                    <div>
                      <div className="font-body font-medium text-foreground">
                        {booking?.eventType}
                      </div>
                      <div className="text-sm text-muted-foreground font-caption">
                        {new Date(booking.date)?.toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })} • {booking?.time}
                      </div>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingBookings?.length === 0 && (
          <div className="text-center py-6">
            <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-body">
              No upcoming bookings this month
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;