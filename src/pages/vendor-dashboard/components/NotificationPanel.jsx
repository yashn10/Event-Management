import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    const icons = {
      booking: 'Calendar',
      message: 'MessageSquare',
      payment: 'CreditCard',
      review: 'Star',
      system: 'Bell'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    
    const colors = {
      booking: 'text-primary',
      message: 'text-secondary',
      payment: 'text-success',
      review: 'text-warning',
      system: 'text-muted-foreground'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-muted text-muted-foreground border-border'
    };
    return badges?.[priority] || badges?.low;
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="CheckCheck"
              onClick={onMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === 'booking' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('booking')}
          >
            Bookings
          </Button>
          <Button
            variant={filter === 'message' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('message')}
          >
            Messages
          </Button>
          <Button
            variant={filter === 'payment' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('payment')}
          >
            Payments
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/30 transition-smooth cursor-pointer ${
                  !notification?.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => onMarkAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getNotificationColor(notification?.type, notification?.priority)}`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-body font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification?.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {notification?.priority !== 'low' && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(notification?.priority)}`}>
                            {notification?.priority}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground font-caption">
                          {formatTimeAgo(notification?.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm font-body ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification?.message}
                    </p>
                    
                    {notification?.actionRequired && (
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          {notification?.actionText || 'Take Action'}
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
              No notifications
            </h4>
            <p className="text-muted-foreground font-body">
              {filter === 'unread' ? "You're all caught up! No unread notifications." :"New notifications will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;