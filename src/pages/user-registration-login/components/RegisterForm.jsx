import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import UserTypeToggle from './UserTypeToggle';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[91]?[6-9]\d{9}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <UserTypeToggle
        selectedType={formData?.userType}
        onTypeChange={(type) => handleChange('userType', type)}
      />
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={(e) => handleChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={(e) => handleChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91 98765 43210"
        value={formData?.phone}
        onChange={(e) => handleChange('phone', e?.target?.value)}
        error={errors?.phone}
        description="We'll use this for booking confirmations"
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => handleChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
        <PasswordStrengthIndicator password={formData?.password} />
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>
      <div className="pt-2">
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium"
                onClick={() => window.open('/terms', '_blank')}
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium"
                onClick={() => window.open('/privacy', '_blank')}
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={formData?.acceptTerms}
          onChange={(e) => handleChange('acceptTerms', e?.target?.checked)}
          error={errors?.acceptTerms}
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        className="mt-6"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;