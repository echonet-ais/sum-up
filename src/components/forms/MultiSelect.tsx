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
          <label className="block text-sm font-medium text-[var(--text-strong)] mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <div
            className={cn(
              "flex min-h-10 w-full items-center gap-2 rounded-md border bg-[var(--surface)] px-3 py-2 text-sm transition-colors",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--brand-primary)] focus-within:ring-offset-2",
              error
                ? "border-red-500 focus-within:ring-red-500"
                : "border-[var(--border-subtle)]",
              "text-[var(--text-strong)]"
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
                <span className="text-[var(--text-muted)]">{placeholder}</span>
              )}
            </div>
            <Icon
              name="chevronDown"
              className={cn(
                "h-4 w-4 text-[var(--text-muted)] transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>

          {isOpen && (
            <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
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
                      !isDisabled && "hover:bg-[var(--surface-muted)]"
                    )}
                    onClick={() => !isDisabled && handleToggle(option.value)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-[var(--border-subtle)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
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

