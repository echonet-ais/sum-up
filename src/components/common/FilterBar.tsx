"use client";

import * as React from "react";
import { Card, CardContent } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { Select, SelectOption } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface FilterOption<T = string | number> {
  value: T;
  label: string;
}

export interface FilterConfig<T = string | number> {
  type: "select" | "checkbox" | "date";
  label: string;
  value: T;
  options?: FilterOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
}

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: Array<FilterConfig<string | number | boolean>>;
  onReset?: () => void;
  showResetButton?: boolean;
  className?: string;
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      searchPlaceholder = "검색...",
      searchValue,
      onSearchChange,
      filters = [],
      onReset,
      showResetButton = false,
      className,
      ...props
    },
    ref
  ) => {
    const hasActiveFilters = React.useMemo(() => {
      if (searchValue) return true;
      return filters.some((filter) => {
        if (filter.type === "checkbox") {
          return filter.value === true;
        }
        if (filter.type === "select") {
          return filter.value && filter.value !== "ALL";
        }
        return filter.value != null;
      });
    }, [searchValue, filters]);

    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm",
          className
        )}
        {...props}
      >
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full"
              />
            </div>
            {filters.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {filters.map((filter, index) => {
                  if (filter.type === "select" && filter.options) {
                    // Select는 string만 받을 수 있으므로 변환
                    // 타입 단언을 사용하여 타입 에러 해결
                    const selectValue = String(filter.value) as string;
                    return (
                      <Select
                        key={index}
                        value={selectValue}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          // 원래 타입에 맞게 변환
                          if (typeof filter.value === "number") {
                            filter.onChange(Number(newValue) as typeof filter.value);
                          } else if (typeof filter.value === "boolean") {
                            filter.onChange((newValue === "true") as typeof filter.value);
                          } else {
                            filter.onChange(newValue as typeof filter.value);
                          }
                        }}
                        className={cn("w-40", filter.className)}
                      >
                        {filter.options.map((option, optionIndex) => {
                          // option.value도 string으로 변환
                          const optionValue = String(option.value) as string;
                          return (
                            <SelectOption key={`${index}-${optionIndex}`} value={optionValue}>
                              {option.label}
                            </SelectOption>
                          );
                        })}
                      </Select>
                    );
                  }
                  if (filter.type === "checkbox") {
                    return (
                      <label
                        key={index}
                        className={cn(
                          "flex items-center gap-2 text-sm text-[var(--text-muted)] px-3 py-2 rounded-md border border-[var(--border-subtle)] cursor-pointer hover:bg-[var(--surface-muted)]",
                          filter.className
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={filter.value === true}
                          onChange={(e) => filter.onChange(e.target.checked)}
                          className="w-4 h-4"
                        />
                        {filter.label}
                      </label>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            {showResetButton && hasActiveFilters && onReset && (
              <Button variant="outline" onClick={onReset} className="whitespace-nowrap">
                <Icon name="x" size={16} className="mr-2" />
                초기화
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

FilterBar.displayName = "FilterBar";

export { FilterBar };

