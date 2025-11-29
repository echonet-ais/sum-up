"use client";

import * as React from "react";
import { Input } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showStrength?: boolean;
  label?: string;
  error?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showStrength = false, label, error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      props.onChange?.(e);
    };

    const getPasswordStrength = (pwd: string) => {
      if (!pwd) return { strength: 0, label: "", color: "" };
      let strength = 0;
      if (pwd.length >= 6) strength++;
      if (pwd.length >= 8) strength++;
      if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
      if (/\d/.test(pwd)) strength++;
      if (/[^a-zA-Z\d]/.test(pwd)) strength++;

      const levels = [
        { label: "매우 약함", color: "bg-red-500" },
        { label: "약함", color: "bg-orange-500" },
        { label: "보통", color: "bg-yellow-500" },
        { label: "강함", color: "bg-green-500" },
        { label: "매우 강함", color: "bg-green-600" },
      ];

      return {
        strength: Math.min(strength, 5),
        ...levels[Math.min(strength - 1, 4)],
      };
    };

    const strength = showStrength ? getPasswordStrength(password) : null;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon
              name={showPassword ? "eyeOff" : "eye"}
              className="h-4 w-4"
            />
          </button>
        </div>
        {showStrength && password && strength && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all", strength.color)}
                  style={{ width: `${(strength.strength / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {strength.label}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

