import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function UserProfile() {
  const { name, email } = useAuth();

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 text-white font-bold">
        {name?.charAt(0).toUpperCase() ?? 'U'}
      </div>
      <div className="ml-3">
        <div className="text-white">{name}</div>
        <div className="text-gray-400 text-sm">{email}</div>
      </div>
      <button className="ml-auto text-gray-400 hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>
    </div>
  );
}

