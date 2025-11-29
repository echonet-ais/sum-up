"use client";

import * as React from "react";
import ReactDatePicker, { DatePickerProps as ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface DatePickerProps extends Omit<ReactDatePickerProps, "customInput" | "onChange"> {
  className?: string;
  error?: boolean;
  label?: string;
  onChange?: (date: Date | null) => void;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <ReactDatePicker
          {...(props as any)}
          onChange={(date: Date | Date[] | null) => {
            if (Array.isArray(date)) {
              props.onChange?.(date[0] || null);
            } else {
              props.onChange?.(date);
            }
          }}
          customInput={
            <Input
              ref={ref}
              className={cn(
                error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                className
              )}
            />
          }
          className={cn("w-full", className)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };

