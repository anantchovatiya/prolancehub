import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 >= 0.5; // Half star check
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Empty stars

  return (
    <div className="flex items-center text-yellow-500 text-lg justify-center">

      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} />
      ))}

      {hasHalfStar && <FaStarHalfAlt />}


      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
};

export default RatingStars;
