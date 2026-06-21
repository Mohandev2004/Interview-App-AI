"use client";

import { useState, type ChangeEvent } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type: string;
}

export default function Input({
  value,
  onChange,
  label,
  placeholder,
  type,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-2 flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors focus-within:border-foreground/30 focus-within:ring-2 focus-within:ring-ring/20">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
