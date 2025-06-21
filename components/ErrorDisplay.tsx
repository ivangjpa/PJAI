
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-700 border border-red-900 text-red-100 px-4 py-3 rounded-lg relative shadow-md" role="alert">
      <strong className="font-bold">¡Error!</strong>
      <span className="block sm:inline ml-2">{message}</span>
    </div>
  );
};

export default ErrorDisplay;
