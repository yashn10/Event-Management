import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingPackages = ({ packages = [] }) => {
  const [expandedPackage, setExpandedPackage] = useState(null);

  const togglePackage = (packageId) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  if (!packages || packages?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No pricing packages available</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Service Packages
        </h2>
        <p className="text-muted-foreground">
          Choose from our carefully crafted service packages
        </p>
      </div>
      <div className="p-6 space-y-4">
        {packages?.map((pkg) => (
          <div
            key={pkg?.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-card transition-shadow"
          >
            {/* Package Header */}
            <div className="p-4 bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {pkg?.name}
                    </h3>
                    {pkg?.isPopular && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-2xl font-bold text-foreground">
                      {formatPrice(pkg?.startingPrice)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      starting from
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {pkg?.description}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePackage(pkg?.id)}
                  iconName={expandedPackage === pkg?.id ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  {expandedPackage === pkg?.id ? 'Hide Details' : 'View Details'}
                </Button>
              </div>
            </div>

            {/* Package Details */}
            {expandedPackage === pkg?.id && (
              <div className="p-4 border-t border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Inclusions */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span>What's Included</span>
                    </h4>
                    <ul className="space-y-2">
                      {pkg?.inclusions?.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-4">
                    {/* Duration */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span>Duration</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{pkg?.duration}</p>
                    </div>

                    {/* Guest Capacity */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span>Guest Capacity</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{pkg?.guestCapacity}</p>
                    </div>

                    {/* Customization */}
                    {pkg?.customizable && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                          <Icon name="Settings" size={16} className="text-accent" />
                          <span>Customization</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          This package can be customized to your specific needs
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exclusions */}
                {pkg?.exclusions && pkg?.exclusions?.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                      <Icon name="XCircle" size={16} className="text-error" />
                      <span>Not Included</span>
                    </h4>
                    <ul className="space-y-2">
                      {pkg?.exclusions?.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Icon name="X" size={14} className="text-error mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    className="flex-1"
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Get Custom Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Check Availability
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Custom Package Option */}
      <div className="p-6 border-t border-border bg-muted/20">
        <div className="text-center">
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">
            Need Something Different?
          </h3>
          <p className="text-muted-foreground mb-4">
            We can create a custom package tailored to your specific requirements
          </p>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
          >
            Request Custom Package
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPackages;