import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  const getHeaderContent = () => {
    if (activeTab === 'login') {
      return {
        title: 'Welcome Back!',
        subtitle: 'Sign in to access your EventConnect dashboard and manage your bookings.'
      };
    }
    return {
      title: 'Join EventConnect',
      subtitle: 'Create your account to discover amazing event services in Pune and Maharashtra.'
    };
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
          <Icon name="Calendar" size={32} color="white" />
        </div>
      </div>
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground font-body text-sm leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;