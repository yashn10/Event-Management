import React from 'react';
import Icon from '../../../components/AppIcon';

const VendorAbout = ({ vendor }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          About {vendor?.name}
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Business Description */}
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-3">
            Our Story
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {vendor?.description}
          </p>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Experience</h4>
                <p className="text-sm text-muted-foreground">
                  {vendor?.experience} years in the industry
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Service Areas</h4>
                <div className="text-sm text-muted-foreground">
                  {vendor?.serviceAreas?.map((area, index) => (
                    <span key={index}>
                      {area}
                      {index < vendor?.serviceAreas?.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Team Size</h4>
                <p className="text-sm text-muted-foreground">
                  {vendor?.teamSize} professional team members
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircle" size={20} className="text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Events Completed</h4>
                <p className="text-sm text-muted-foreground">
                  {vendor?.completedEvents}+ successful events
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  Typically responds within {vendor?.responseTime}
                </p>
              </div>
            </div>

            {vendor?.isEcoFriendly && (
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Leaf" size={20} className="text-success" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Eco-Friendly</h4>
                  <p className="text-sm text-muted-foreground">
                    Committed to sustainable event practices
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specializations */}
        {vendor?.specializations && vendor?.specializations?.length > 0 && (
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-3">
              Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {vendor?.specializations?.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {vendor?.certifications && vendor?.certifications?.length > 0 && (
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-3">
              Certifications & Awards
            </h3>
            <div className="space-y-2">
              {vendor?.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorAbout;