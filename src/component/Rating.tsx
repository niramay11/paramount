import React from "react";

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    width="30"
    height="29"
    viewBox="0 0 30 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-200"
  >
    <path
      d="M14.9241 0L18.4157 10.7462H29.7149L20.5737 17.3877L24.0653 28.1338L14.9241 21.4923L5.78283 28.1338L9.27448 17.3877L0.13324 10.7462H11.4324L14.9241 0Z"
      fill={filled ? "#FFDB10" : "#E5E7EB"} // Gray-200 for unfilled stars
    />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} filled={star <= rating} />
      ))}
    </div>
  );
};

export default StarRating;
