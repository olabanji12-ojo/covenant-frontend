import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

interface RangeSliderProps {
  label: React.ReactNode;
  min: number;
  max: number;
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  className?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  defaultValue = [22, 25],
  onChange,
  className = ''
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: number[]) => {
    // Radix returns an array of numbers, we safely type it as a tuple
    const updatedValue: [number, number] = [newValue[0], newValue[1]];
    setValue(updatedValue);
    if (onChange) onChange(updatedValue);
  };

  return (
    <div className={`flex flex-col space-y-4 w-full ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-[15px] font-medium text-gray-900">{label}</label>
        <span className="text-sm font-medium text-gray-500">
          {value[0]}-{value[1]}
        </span>
      </div>
      
      {/* 
        We use Radix UI Slider for perfectly accessible, touch-friendly 
        dual-thumb sliders on mobile devices.
      */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={1}
        minStepsBetweenThumbs={1}
        onValueChange={handleValueChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-primary shadow-sm rounded-full cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
          aria-label="Minimum value"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-primary shadow-sm rounded-full cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
          aria-label="Maximum value"
        />
      </Slider.Root>
    </div>
  );
};
