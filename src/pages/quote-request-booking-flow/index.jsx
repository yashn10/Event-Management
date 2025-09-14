import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import BookingFlowNavigation from '../../components/ui/BookingFlowNavigation';
import EventDetailsStep from './components/EventDetailsStep';
import DateSelectionStep from './components/DateSelectionStep';
import RequirementsStep from './components/RequirementsStep';
import ConfirmationStep from './components/ConfirmationStep';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';

const QuoteRequestBookingFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [canNavigateForward, setCanNavigateForward] = useState(false);

  const totalSteps = 4;
  const stepTitles = [
    'Event Details',
    'Date Selection', 
    'Requirements',
    'Confirmation'
  ];

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('eventBookingFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        validateCurrentStep(parsedData, currentStep);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(formData)?.length > 0) {
      localStorage.setItem('eventBookingFormData', JSON.stringify(formData));
    }
  }, [formData]);

  // Validate current step and update navigation state
  useEffect(() => {
    validateCurrentStep(formData, currentStep);
  }, [formData, currentStep]);

  const validateCurrentStep = (data, step) => {
    let stepErrors = {};
    let isValid = false;

    switch (step) {
      case 1: // Event Details
        if (!data?.eventType) stepErrors.eventType = 'Please select an event type';
        if (!data?.guestCount || data?.guestCount < 1) stepErrors.guestCount = 'Please enter a valid guest count';
        if (!data?.budgetRange || data?.budgetRange?.[0] < 10000) stepErrors.budgetRange = 'Please set a minimum budget';
        if (!data?.location) stepErrors.location = 'Please select a location';
        
        isValid = !stepErrors?.eventType && !stepErrors?.guestCount && !stepErrors?.budgetRange && !stepErrors?.location;
        break;

      case 2: // Date Selection
        if (!data?.eventDate) stepErrors.eventDate = 'Please select an event date';
        if (!data?.timeSlot) stepErrors.timeSlot = 'Please select a time slot';
        
        isValid = !stepErrors?.eventDate && !stepErrors?.timeSlot;
        break;

      case 3: // Requirements
        if (!data?.detailedRequirements || data?.detailedRequirements?.trim()?.length < 20) {
          stepErrors.detailedRequirements = 'Please provide detailed requirements (minimum 20 characters)';
        }
        
        isValid = !stepErrors?.detailedRequirements;
        break;

      case 4: // Confirmation
        if (!data?.acceptedTerms) stepErrors.acceptedTerms = 'Please accept the terms and conditions';
        if (!data?.acceptedPrivacy) stepErrors.acceptedPrivacy = 'Please accept the privacy policy';
        
        isValid = !stepErrors?.acceptedTerms && !stepErrors?.acceptedPrivacy;
        break;

      default:
        isValid = false;
    }

    setErrors(stepErrors);
    setCanNavigateForward(isValid);
    return isValid;
  };

  const handleFormUpdate = (updatedData) => {
    setFormData(updatedData);
  };

  const handleStepValidation = (data) => {
    validateCurrentStep(data, currentStep);
  };

  const handleNext = () => {
    if (canNavigateForward && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
      setErrors({});
    }
  };

  const handleClose = () => {
    const confirmClose = window.confirm(
      'Are you sure you want to close? Your progress will be saved and you can continue later.'
    );
    if (confirmClose) {
      navigate('/vendor-search-discovery');
    }
  };

  const handleSubmit = async (finalData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate booking reference
      const reference = `EC${Date.now()?.toString()?.slice(-8)}`;
      setBookingReference(reference);
      
      // Clear saved form data
      localStorage.removeItem('eventBookingFormData');
      
      // Show success modal
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setErrors({ submit: 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/customer-booking-management');
  };

  const handleNavigateToBookings = () => {
    setShowSuccessModal(false);
    navigate('/customer-booking-management');
  };

  const handleNavigateHome = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EventDetailsStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
            onValidate={handleStepValidation}
          />
        );
      case 2:
        return (
          <DateSelectionStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
            onValidate={handleStepValidation}
          />
        );
      case 3:
        return (
          <RequirementsStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
            onValidate={handleStepValidation}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            formData={formData}
            onUpdate={handleFormUpdate}
            errors={errors}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <RoleBasedNavigation
        userRole="customer"
        isAuthenticated={true}
        activeRoute="/quote-request-booking-flow"
        onNavigate={handleNavigation}
      />
      {/* Booking Flow Navigation */}
      <BookingFlowNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
        onClose={handleClose}
        isDesktop={true}
        canNavigateBack={currentStep > 1}
        canNavigateForward={canNavigateForward}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      {/* Main Content */}
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Step Indicator */}
          <div className="lg:hidden mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-caption text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-caption text-muted-foreground">
                  {Math.round((currentStep / totalSteps) * 100)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
              <p className="text-sm font-body font-semibold text-foreground">
                {stepTitles?.[currentStep - 1]}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-card border border-border rounded-lg shadow-card">
            <div className="p-6 lg:p-8">
              {renderCurrentStep()}
            </div>
          </div>

          {/* Error Display */}
          {errors?.submit && (
            <div className="mt-6 bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-error" />
                <p className="text-sm font-body text-error">{errors?.submit}</p>
              </div>
            </div>
          )}

          {/* Progress Summary for Desktop */}
          <div className="hidden lg:block mt-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Progress Summary
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {stepTitles?.map((title, index) => {
                  const stepNumber = index + 1;
                  const isCompleted = stepNumber < currentStep;
                  const isCurrent = stepNumber === currentStep;
                  
                  return (
                    <div
                      key={stepNumber}
                      className={`
                        p-3 rounded-lg border transition-smooth
                        ${isCurrent
                          ? 'border-primary bg-primary/5'
                          : isCompleted
                            ? 'border-success bg-success/5' :'border-border bg-muted/30'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div
                          className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                            ${isCurrent
                              ? 'bg-primary text-primary-foreground'
                              : isCompleted
                                ? 'bg-success text-success-foreground'
                                : 'bg-muted text-muted-foreground'
                            }
                          `}
                        >
                          {isCompleted ? (
                            <Icon name="Check" size={12} />
                          ) : (
                            stepNumber
                          )}
                        </div>
                        <span
                          className={`
                            text-sm font-body font-medium
                            ${isCurrent
                              ? 'text-primary'
                              : isCompleted
                                ? 'text-success' :'text-muted-foreground'
                            }
                          `}
                        >
                          {title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        bookingReference={bookingReference}
        estimatedQuotes={5}
        onNavigateToBookings={handleNavigateToBookings}
        onNavigateHome={handleNavigateHome}
      />
    </div>
  );
};

export default QuoteRequestBookingFlow;