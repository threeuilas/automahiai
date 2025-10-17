import * as React from 'react';

import { cn } from '@/lib/utils';

export interface NumberInputProps
  extends Omit<React.ComponentProps<'input'>, 'type' | 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

function NumberInput({
  className,
  value,
  onChange,
  min,
  max,
  step = 1,
  ...props
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = React.useState<string>(
    value?.toString() ?? '',
  );
  const [isFocused, setIsFocused] = React.useState(false);

  // Update display value when external value changes
  React.useEffect(() => {
    if (!isFocused) {
      setDisplayValue(value?.toString() ?? '');
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty string while typing
    if (inputValue === '') {
      setDisplayValue('');
      return;
    }

    // Only allow numeric characters and basic number format
    const numericRegex = /^-?\d*\.?\d*$/;
    if (!numericRegex.test(inputValue)) {
      return; // Don't update if invalid characters
    }

    setDisplayValue(inputValue);

    // Convert to number and call onChange
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      onChange?.(numericValue);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    // If field is empty on blur, reset to 0
    if (displayValue === '') {
      setDisplayValue('0');
      onChange?.(0);
    }

    props.onBlur?.(e);
  };

  return (
    <input
      type="text"
      data-slot="number-input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      min={min}
      max={max}
      step={step}
      {...props}
    />
  );
}

export { NumberInput };
