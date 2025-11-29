"use client";

import * as React from "react";
import { Select, SelectOption } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  error?: boolean;
  label?: string;
  maxSelections?: number;
  className?: string;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "선택하세요",
      error,
      label,
      maxSelections,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const handleToggle = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];

      if (maxSelections && newValue.length > maxSelections) {
        return;
      }

      onChange?.(newValue);
    };

    const handleRemove = (optionValue: string) => {
      onChange?.(value.filter((v) => v !== optionValue));
    };

    const selectedOptions = options.filter((opt) => value.includes(opt.value));

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div className={cn("w-full", className)} ref={containerRef} {...props}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <div
            className={cn(
              "flex min-h-10 w-full items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm transition-colors",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
              error
                ? "border-red-500 focus-within:ring-red-500"
                : "border-gray-300 dark:border-gray-600",
              "dark:bg-gray-800 dark:text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-1 flex-wrap gap-1">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="mr-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(option.value);
                    }}
                  >
                    {option.label}
                    <Icon name="x" className="ml-1 h-3 w-3 cursor-pointer" />
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
              )}
            </div>
            <Icon
              name="chevronDown"
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>

          {isOpen && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              {options.map((option) => {
                const isSelected = value.includes(option.value);
                const isDisabled = option.disabled || (maxSelections && !isSelected && value.length >= maxSelections);

                return (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors",
                      isSelected && "bg-blue-50 dark:bg-blue-900/20",
                      isDisabled && "opacity-50 cursor-not-allowed",
                      !isDisabled && "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={() => !isDisabled && handleToggle(option.value)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={!!isDisabled}
                    />
                    <span>{option.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };

