import React from 'react';
import Icon from '../../../components/AppIcon';

const UserTypeToggle = ({ selectedType, onTypeChange }) => {
  const userTypes = [
    {
      id: 'customer',
      label: 'Customer',
      description: 'Book event services',
      icon: 'User'
    },
    {
      id: 'vendor',
      label: 'Vendor',
      description: 'Provide event services',
      icon: 'Store'
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-body font-medium text-foreground mb-3">
        I am a
      </label>
      <div className="grid grid-cols-2 gap-3">
        {userTypes?.map((type) => (
          <button
            key={type?.id}
            type="button"
            onClick={() => onTypeChange(type?.id)}
            className={`
              p-4 rounded-lg border-2 transition-smooth text-left
              ${selectedType === type?.id
                ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={type?.icon} 
                size={20} 
                className={selectedType === type?.id ? 'text-primary' : 'text-muted-foreground'} 
              />
              <div>
                <div className="font-body font-semibold text-sm">
                  {type?.label}
                </div>
                <div className="text-xs font-caption opacity-80">
                  {type?.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTypeToggle;