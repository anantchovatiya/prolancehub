'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

const Rating = ({ totalStars = 5, onRatingSelect }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (star) => {
    setRating(star);
    if (onRatingSelect) onRatingSelect(star);
  };

  return (
    <div className="flex space-x-2">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            className={`h-5 w-5 mt-3 cursor-pointer transition-all ${
              starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(starValue)}
            fill={starValue <= (hover || rating) ? 'currentColor' : 'none'}
          />
        );
      })}
    </div>
  );

};

export default Rating;
