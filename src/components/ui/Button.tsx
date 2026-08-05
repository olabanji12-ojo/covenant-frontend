import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, // Defaulting to true since mobile buttons usually span the width
  className = '', 
  ...props 
}) => {
  // The base styles ensure it's flexed, centered, and has the pill shape from your screenshot
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors rounded-full";
  
  // The padding gives it that nice, tall, clickable area shown in the Figma design
  const sizeStyles = "px-6 py-4 text-lg"; 
  
  // We map the variant prop to our Tailwind colors
  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-white text-primary hover:bg-gray-50",
    outline: "border-2 border-primary text-primary hover:bg-primary/5"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${sizeStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
