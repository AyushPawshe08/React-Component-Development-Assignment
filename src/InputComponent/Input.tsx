import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff, X } from "lucide-react";

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email";
  clearable?: boolean; // new
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Size styles
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  // Variant styles
  const variantClasses = {
    filled: "bg-gray-100 border border-transparent focus:border-blue-500",
    outlined: "border border-gray-300 focus:border-blue-500",
    ghost: "border-b border-gray-300 focus:border-blue-500 rounded-none",
  };

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "w-full pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses[size],
            variantClasses[variant],
            invalid && "border-red-500 focus:ring-red-500"
          )}
        />

        {/* Password toggle (👁️ / 👁️‍🗨️) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Clear button (❌) */}
        {clearable && value && value.length > 0 && (
          <button
            type="button"
            onClick={() =>
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className={clsx(
              "absolute top-1/2 -translate-y-1/2",
              isPassword ? "right-8" : "right-2", // shift if password toggle exists
              "text-gray-500 hover:text-gray-700"
            )}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {invalid && errorMessage ? (
        <span className="text-xs text-red-500">{errorMessage}</span>
      ) : helperText ? (
        <span className="text-xs text-gray-500">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
