import React from 'react';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ breadcrumbs, onNavigate }) => {
  const handleBreadcrumbClick = (path) => {
    if (onNavigate && path) {
      onNavigate(path);
    }
  };

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs?.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              )}
              {crumb?.path ? (
                <button
                  onClick={() => handleBreadcrumbClick(crumb?.path)}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  {crumb?.label}
                </button>
              ) : (
                <span className="text-muted-foreground font-medium">
                  {crumb?.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;