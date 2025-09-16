import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: 'Calendar',
      count: counts?.upcoming
    },
    {
      id: 'past',
      label: 'Past',
      icon: 'History',
      count: counts?.past
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      icon: 'XCircle',
      count: counts?.cancelled
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="flex overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex items-center space-x-2 px-6 py-4 font-body font-medium transition-smooth whitespace-nowrap
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${activeTab === tab?.id
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingTabs;