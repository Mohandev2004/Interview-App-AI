import React from 'react';

const SpinnerLoader = () => {
  return (
    <div role="status" className="flex justify-center items-center">
      <svg
        className="w-6 h-6 animate-spin text-cyan-900"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M25 5a20 20 0 0120 20h-5a15 15 0 00-15-15V5z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
