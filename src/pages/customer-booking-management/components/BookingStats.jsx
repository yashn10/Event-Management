import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Bookings',
      value: stats?.total,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Upcoming',
      value: stats?.upcoming,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Completed',
      value: stats?.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pending',
      value: stats?.pending,
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{item?.value}</p>
              <p className="text-sm text-muted-foreground font-body">{item?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingStats;