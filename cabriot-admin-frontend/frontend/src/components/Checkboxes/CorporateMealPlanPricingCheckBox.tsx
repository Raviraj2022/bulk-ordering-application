import React, { useState, useEffect } from 'react';

interface MealPlanPriceCheckboxProps {
  name: string;
  checkBoxId: string;
  onChange: (id: string, checked: boolean) => void;
  DaysDishValue: boolean;
}

const CorporateMealPlanPricingCheckBox: React.FC<
  MealPlanPriceCheckboxProps
> = ({ name, checkBoxId, onChange, DaysDishValue }) => {
  const [isChecked, setIsChecked] = useState<boolean>(DaysDishValue);
  // console.log('isChecked', isChecked);
  // console.log('checkboxDisabled', DaysDishValue);

  const handleMondayCheckboxChange = () => {
    const newCheckedState = !isChecked; // Toggle the state
    setIsChecked(newCheckedState);
    onChange(checkBoxId, newCheckedState); // Pass the updated state to onChange
  };

  useEffect(() => {
    setIsChecked(DaysDishValue);
  }, [DaysDishValue]);

  return (
    <div>
      <label
        htmlFor={checkBoxId}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={checkBoxId}
            className="sr-only"
            onChange={handleMondayCheckboxChange}
          />
          <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked && 'border-primary'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                isChecked && '!bg-primary'
              }`}
            >
              {' '}
            </span>
          </div>
        </div>
        {name}
      </label>
    </div>
  );
};

export default CorporateMealPlanPricingCheckBox;
