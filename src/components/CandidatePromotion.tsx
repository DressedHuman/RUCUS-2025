import React, { useState, useEffect } from "react";

const CandidatePromotion: React.FC = () => {
  const images = [
    "/assets/candidate1.jpg",
    "/assets/candidate2.jpg",
    "/assets/candidate3.jpg",
    "/assets/candidate4.jpg",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="bg-yellow-50 border border-yellow-200 shadow-md rounded-2xl p-4 w-full">
      {/* Candidate Image */}
      <img
        src={images[index]}
        alt="Candidate"
        className="w-full h-48 object-cover rounded-xl mb-4 transition-all duration-700"
      />

      {/* Name */}
      <h3 className="text-xl font-bold text-gray-900 text-center">
        AL SHAHRIYA SHOVO
      </h3>

      {/* Role Tag */}
      <div className="flex justify-center mt-2 mb-3">
        <span className="bg-blue-100 text-blue-800 text-base font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
          AGS Candidate
        </span>
      </div>

      {/* Ballot Number */}
      <p className="text-center text-blue-700 font-semibold text-sm">
        Ballot No:{" "}
        <span className="text-2xl font-extrabold text-red-600">9</span>
      </p>

      {/* Description */}
      <p className="mt-3 text-center text-gray-700 text-sm">
        A dedicated leader who always stood for the welfare of general students
        and fought against any kind of discrimination.
      </p>
    </div>
  );
};

export default CandidatePromotion;
