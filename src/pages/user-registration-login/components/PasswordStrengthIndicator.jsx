import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: pwd?.length >= 8,
      lowercase: /[a-z]/?.test(pwd),
      uppercase: /[A-Z]/?.test(pwd),
      number: /\d/?.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(pwd)
    };

    score = Object.values(checks)?.filter(Boolean)?.length;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-error' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-warning' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-accent' };
    return { score, label: 'Strong', color: 'bg-success' };
  };

  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-caption text-muted-foreground">
          Password strength
        </span>
        <span className={`text-xs font-caption font-medium ${
          strength?.label === 'Weak' ? 'text-error' :
          strength?.label === 'Fair' ? 'text-warning' :
          strength?.label === 'Good'? 'text-accent' : 'text-success'
        }`}>
          {strength?.label}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-smooth ${
              level <= strength?.score ? strength?.color : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;