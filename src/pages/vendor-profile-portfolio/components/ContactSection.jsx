import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSection = ({ vendor, onCall, onWhatsApp, onSubmitInquiry }) => {
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitInquiry = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onSubmitInquiry) {
        onSubmitInquiry(inquiryForm);
      }
      setIsSubmitting(false);
      setShowForm(false);
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        guestCount: '',
        message: ''
      });
    }, 1000);
  };

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Get in Touch
        </h2>
        <p className="text-muted-foreground">
          Contact us directly or send an inquiry for your event
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Phone</h4>
                <p className="text-sm text-muted-foreground">{vendor?.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={20} className="text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">WhatsApp</h4>
                <p className="text-sm text-muted-foreground">Quick responses</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Email</h4>
                <p className="text-sm text-muted-foreground">{vendor?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Location</h4>
                <p className="text-sm text-muted-foreground">{vendor?.address}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  Usually responds within {vendor?.responseTime}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Working Hours</h4>
                <p className="text-sm text-muted-foreground">{vendor?.workingHours}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Languages" size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Languages</h4>
                <p className="text-sm text-muted-foreground">
                  {vendor?.languages?.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="default"
            onClick={onCall}
            iconName="Phone"
            iconPosition="left"
            className="w-full"
          >
            Call Now
          </Button>
          <Button
            variant="success"
            onClick={onWhatsApp}
            iconName="MessageCircle"
            iconPosition="left"
            className="w-full"
          >
            WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
            iconName="MessageSquare"
            iconPosition="left"
            className="w-full"
          >
            Send Inquiry
          </Button>
        </div>

        {/* Inquiry Form */}
        {showForm && (
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Send us an Inquiry
            </h3>
            
            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={inquiryForm?.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={inquiryForm?.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={inquiryForm?.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
                <Input
                  label="Event Date"
                  type="date"
                  name="eventDate"
                  value={inquiryForm?.eventDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={inquiryForm?.eventType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">Select event type</option>
                    {eventTypes?.map(type => (
                      <option key={type?.value} value={type?.value}>
                        {type?.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Expected Guests"
                  type="number"
                  name="guestCount"
                  value={inquiryForm?.guestCount}
                  onChange={handleInputChange}
                  placeholder="Number of guests"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={inquiryForm?.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your event requirements..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="left"
                  className="flex-1"
                >
                  Send Inquiry
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Map Section */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-heading font-medium text-foreground mb-4">
            Our Location
          </h3>
          <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={vendor?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${vendor?.coordinates?.lat},${vendor?.coordinates?.lng}&z=14&output=embed`}
              className="border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;