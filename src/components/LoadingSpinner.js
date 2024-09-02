import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div
        className="spinner-border w-4 h-4"
        role="status"
        
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default LoadingSpinner;