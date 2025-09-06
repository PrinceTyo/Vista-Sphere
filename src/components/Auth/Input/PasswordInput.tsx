import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const PasswordInput = ({ value, onChange, placeholder = "Password" }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
      </button>
    </div>
  );
}