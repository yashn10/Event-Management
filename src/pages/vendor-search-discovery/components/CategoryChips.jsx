import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryChips = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'All Services', icon: 'Grid3X3' },
    { id: 'photography', label: 'Photography', icon: 'Camera' },
    { id: 'decoration', label: 'Decoration', icon: 'Palette' },
    { id: 'catering', label: 'Catering', icon: 'ChefHat' },
    { id: 'music', label: 'Music & DJ', icon: 'Music' },
    { id: 'venue', label: 'Venues', icon: 'Building' },
    { id: 'transport', label: 'Transport', icon: 'Car' },
    { id: 'lighting', label: 'Lighting', icon: 'Lightbulb' },
    { id: 'makeup', label: 'Makeup', icon: 'Sparkles' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-body font-medium transition-smooth
                ${selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }
              `}
            >
              <Icon name={category?.icon} size={16} />
              <span className="text-sm">{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChips;