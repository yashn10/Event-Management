import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';

const RequirementsStep = ({ 
  formData, 
  onUpdate, 
  errors = {}, 
  onValidate 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(formData?.inspirationImages || []);
  const [isDragOver, setIsDragOver] = useState(false);

  const serviceAddOns = [
    {
      id: 'decoration',
      name: 'Premium Decoration',
      description: 'Enhanced floral arrangements and themed decorations',
      price: 15000,
      icon: 'Flower'
    },
    {
      id: 'photography',
      name: 'Professional Photography',
      description: 'Complete event coverage with edited photos',
      price: 25000,
      icon: 'Camera'
    },
    {
      id: 'videography',
      name: 'Videography Package',
      description: 'HD video recording with highlight reel',
      price: 30000,
      icon: 'Video'
    },
    {
      id: 'catering',
      name: 'Premium Catering',
      description: 'Multi-cuisine buffet with live counters',
      price: 800,
      priceUnit: 'per person',
      icon: 'ChefHat'
    },
    {
      id: 'music',
      name: 'Live Music Band',
      description: 'Professional musicians for entertainment',
      price: 20000,
      icon: 'Music'
    },
    {
      id: 'lighting',
      name: 'Special Lighting',
      description: 'Ambient and decorative lighting setup',
      price: 12000,
      icon: 'Lightbulb'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    onUpdate(updatedData);
    
    if (onValidate) {
      onValidate(updatedData);
    }
  };

  const handleAddOnToggle = (addOnId) => {
    const currentAddOns = formData?.selectedAddOns || [];
    const updatedAddOns = currentAddOns?.includes(addOnId)
      ? currentAddOns?.filter(id => id !== addOnId)
      : [...currentAddOns, addOnId];
    
    handleInputChange('selectedAddOns', updatedAddOns);
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files)?.slice(0, 5 - uploadedFiles?.length);
    const fileObjects = newFiles?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      url: URL.createObjectURL(file)
    }));
    
    const updatedFiles = [...uploadedFiles, ...fileObjects];
    setUploadedFiles(updatedFiles);
    handleInputChange('inspirationImages', updatedFiles);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = e?.dataTransfer?.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles?.filter(file => file?.id !== fileId);
    setUploadedFiles(updatedFiles);
    handleInputChange('inspirationImages', updatedFiles);
  };

  const calculateTotalAddOnCost = () => {
    const selectedAddOns = formData?.selectedAddOns || [];
    return selectedAddOns?.reduce((total, addOnId) => {
      const addOn = serviceAddOns?.find(service => service?.id === addOnId);
      if (addOn) {
        if (addOn?.priceUnit === 'per person') {
          return total + (addOn?.price * (parseInt(formData?.guestCount) || 0));
        }
        return total + addOn?.price;
      }
      return total;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ClipboardList" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Event Requirements
        </h2>
        <p className="text-muted-foreground font-body">
          Tell us about your specific needs and preferences
        </p>
      </div>
      {/* Detailed Requirements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Detailed Requirements
        </h3>
        <textarea
          placeholder="Describe your event requirements in detail. Include themes, color preferences, special arrangements, dietary restrictions, accessibility needs, or any other specific requirements..."
          value={formData?.detailedRequirements || ''}
          onChange={(e) => handleInputChange('detailedRequirements', e?.target?.value)}
          rows={6}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body text-foreground placeholder-muted-foreground bg-input"
        />
        <p className="text-xs text-muted-foreground font-caption mt-2">
          The more details you provide, the better we can match you with suitable vendors
        </p>
        {errors?.detailedRequirements && (
          <p className="text-sm text-error font-caption mt-1">{errors?.detailedRequirements}</p>
        )}
      </div>
      {/* Service Add-ons */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Service Add-ons
        </h3>
        <p className="text-sm text-muted-foreground font-body mb-6">
          Select additional services to enhance your event experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceAddOns?.map(addOn => {
            const isSelected = (formData?.selectedAddOns || [])?.includes(addOn?.id);
            return (
              <div
                key={addOn?.id}
                className={`
                  border-2 rounded-lg p-4 transition-smooth cursor-pointer
                  ${isSelected 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                `}
                onClick={() => handleAddOnToggle(addOn?.id)}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleAddOnToggle(addOn?.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={addOn?.icon} size={20} className="text-primary" />
                      <h4 className="font-body font-semibold text-foreground">
                        {addOn?.name}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground font-caption mb-2">
                      {addOn?.description}
                    </p>
                    <p className="text-sm font-body font-semibold text-primary">
                      {formatCurrency(addOn?.price)}
                      {addOn?.priceUnit && (
                        <span className="text-xs text-muted-foreground ml-1">
                          {addOn?.priceUnit}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-on Total */}
        {(formData?.selectedAddOns || [])?.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="font-body font-semibold text-foreground">
                Add-ons Total:
              </span>
              <span className="text-lg font-heading font-bold text-primary">
                {formatCurrency(calculateTotalAddOnCost())}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Inspiration Images */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Inspiration Images
        </h3>
        <p className="text-sm text-muted-foreground font-body mb-4">
          Upload images that inspire your event vision (Max 5 images, 10MB each)
        </p>

        {/* Upload Area */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer
            ${isDragOver 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-body font-medium mb-2">
            Drag and drop images here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground font-caption">
            Supported formats: JPG, PNG, GIF (Max 10MB each)
          </p>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e?.target?.files)}
            className="hidden"
          />
        </div>

        {/* Uploaded Files */}
        {uploadedFiles?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-body font-semibold text-foreground mb-3">
              Uploaded Images ({uploadedFiles?.length}/5)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {uploadedFiles?.map(file => (
                <div key={file?.id} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={file?.url}
                      alt={file?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      removeFile(file?.id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                  >
                    <Icon name="X" size={12} />
                  </button>
                  <p className="text-xs text-muted-foreground font-caption mt-1 truncate">
                    {file?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Special Requests */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Special Requests
        </h3>
        <textarea
          placeholder="Any special requests, accessibility needs, dietary restrictions, or other important considerations..."
          value={formData?.specialRequests || ''}
          onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none font-body text-foreground placeholder-muted-foreground bg-input"
        />
        <p className="text-xs text-muted-foreground font-caption mt-2">
          Help vendors prepare for any special accommodations needed
        </p>
      </div>
      {/* Requirements Summary */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} className="text-success-foreground" />
          </div>
          <div>
            <p className="text-sm font-body font-semibold text-foreground">
              Requirements captured successfully
            </p>
            <p className="text-xs text-muted-foreground font-caption">
              {(formData?.selectedAddOns || [])?.length} add-ons selected • {uploadedFiles?.length} images uploaded
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsStep;