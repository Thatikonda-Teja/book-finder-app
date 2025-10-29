/**
 * ErrorMessage Component
 * Displays error state with retry functionality
 */

import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <AlertCircle className="w-24 h-24 text-red-400 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
