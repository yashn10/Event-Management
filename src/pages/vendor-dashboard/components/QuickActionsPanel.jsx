import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onAction }) => {
  const quickActions = [
    {
      id: 'update-availability',
      title: 'Update Availability',
      description: 'Manage your calendar and availability slots',
      icon: 'Calendar',
      color: 'primary',
      action: () => onAction('calendar')
    },
    {
      id: 'create-quote',
      title: 'Create Quote',
      description: 'Send custom quotes to potential customers',
      icon: 'FileText',
      color: 'secondary',
      action: () => onAction('quote')
    },
    {
      id: 'update-portfolio',
      title: 'Update Portfolio',
      description: 'Add new work samples and images',
      icon: 'Image',
      color: 'success',
      action: () => onAction('portfolio')
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Check your business performance metrics',
      icon: 'BarChart3',
      color: 'warning',
      action: () => onAction('analytics')
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      description: 'Access help and support resources',
      icon: 'HelpCircle',
      color: 'muted',
      action: () => onAction('support')
    },
    {
      id: 'payment-settings',
      title: 'Payment Settings',
      description: 'Manage payment methods and GST details',
      icon: 'CreditCard',
      color: 'accent',
      action: () => onAction('payments')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20',
      muted: 'bg-muted text-muted-foreground hover:bg-muted/80'
    };
    return colors?.[color] || colors?.muted;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Quick Actions
        </h3>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Manage your business operations efficiently
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="group p-4 rounded-lg border border-border hover:border-primary/20 transition-smooth text-left bg-card hover:bg-muted/30"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${getColorClasses(action?.color)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {action?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-caption mt-1">
                    {action?.description}
                  </p>
                </div>
                
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-smooth" 
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-body font-semibold text-foreground">Need Help?</h4>
            <p className="text-sm text-muted-foreground font-caption">
              Contact our support team for assistance
            </p>
          </div>
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => onAction('contact-support')}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;