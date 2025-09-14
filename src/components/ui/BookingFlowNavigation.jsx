import React from 'react';
import Icon from '../AppIcon';

const BookingFlowNavigation = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  onStepClick, 
  onClose,
  isDesktop = true,
  canNavigateBack = true,
  canNavigateForward = false,
  onNext,
  onPrevious
}) => {
  const steps = [
    {
      number: 1,
      label: 'Vendor Selection',
      description: 'Choose your preferred vendor',
      icon: 'Users'
    },
    {
      number: 2,
      label: 'Event Details',
      description: 'Provide event information',
      icon: 'Calendar'
    },
    {
      number: 3,
      label: 'Quote Review',
      description: 'Review pricing and terms',
      icon: 'FileText'
    },
    {
      number: 4,
      label: 'Confirmation',
      description: 'Finalize your booking',
      icon: 'CheckCircle'
    }
  ];

  const handleStepClick = (stepNumber) => {
    if (onStepClick && stepNumber <= currentStep) {
      onStepClick(stepNumber);
    }
  };

  const handleNext = () => {
    if (onNext && canNavigateForward) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious && canNavigateBack && currentStep > 1) {
      onPrevious();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const renderStepIndicator = (step) => {
    const isActive = step?.number === currentStep;
    const isCompleted = step?.number < currentStep;
    const isClickable = step?.number <= currentStep;

    return (
      <div
        key={step?.number}
        className={`
          flex items-center cursor-pointer transition-smooth
          ${isClickable ? 'hover:opacity-80' : 'cursor-not-allowed opacity-50'}
        `}
        onClick={() => handleStepClick(step?.number)}
      >
        <div className="flex items-center">
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth
              ${isActive 
                ? 'bg-primary border-primary text-primary-foreground' 
                : isCompleted
                  ? 'bg-success border-success text-success-foreground'
                  : 'bg-muted border-border text-muted-foreground'
              }
            `}
          >
            {isCompleted ? (
              <Icon name="Check" size={16} />
            ) : (
              <Icon name={step?.icon} size={16} />
            )}
          </div>
          
          {isDesktop && (
            <div className="ml-3">
              <div
                className={`
                  font-body font-semibold text-sm
                  ${isActive 
                    ? 'text-foreground' 
                    : isCompleted
                      ? 'text-success' :'text-muted-foreground'
                  }
                `}
              >
                {step?.label}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                {step?.description}
              </div>
            </div>
          )}
        </div>
        {step?.number < totalSteps && isDesktop && (
          <div className="flex-1 h-px bg-border mx-4" />
        )}
      </div>
    );
  };

  if (isDesktop) {
    return (
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Book Your Event Service
              </h2>
              <p className="text-sm text-muted-foreground font-caption">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-smooth p-2 rounded-lg hover:bg-muted"
              title="Close booking flow"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {steps?.map(renderStepIndicator)}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={!canNavigateBack || currentStep === 1}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-smooth
                ${canNavigateBack && currentStep > 1
                  ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  : 'text-muted-foreground/50 cursor-not-allowed'
                }
              `}
            >
              <Icon name="ChevronLeft" size={16} />
              <span>Previous</span>
            </button>

            <div className="text-sm text-muted-foreground font-caption">
              Progress: {Math.round((currentStep / totalSteps) * 100)}%
            </div>

            <button
              onClick={handleNext}
              disabled={!canNavigateForward}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-smooth
                ${canNavigateForward
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              <span>{currentStep === totalSteps ? 'Complete' : 'Next'}</span>
              <Icon name={currentStep === totalSteps ? "Check" : "ChevronRight"} size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile version
  return (
    <div className="bg-card border-b border-border sticky top-16 z-40">
      <div className="px-4 py-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-heading font-semibold text-foreground">
              Book Service
            </h2>
            <p className="text-xs text-muted-foreground font-caption">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-smooth p-1"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Mobile Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-caption text-muted-foreground">
              {steps?.[currentStep - 1]?.label}
            </span>
            <span className="text-xs font-caption text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Mobile Step Indicators */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {steps?.map(step => (
            <div
              key={step?.number}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-smooth
                ${step?.number === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step?.number < currentStep
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }
              `}
            >
              {step?.number < currentStep ? (
                <Icon name="Check" size={12} />
              ) : (
                step?.number
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={!canNavigateBack || currentStep === 1}
            className={`
              flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-body font-medium transition-smooth
              ${canNavigateBack && currentStep > 1
                ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                : 'text-muted-foreground/50 cursor-not-allowed'
              }
            `}
          >
            <Icon name="ChevronLeft" size={14} />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canNavigateForward}
            className={`
              flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-body font-medium transition-smooth
              ${canNavigateForward
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
            `}
          >
            <span>{currentStep === totalSteps ? 'Complete' : 'Next'}</span>
            <Icon name={currentStep === totalSteps ? "Check" : "ChevronRight"} size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFlowNavigation;