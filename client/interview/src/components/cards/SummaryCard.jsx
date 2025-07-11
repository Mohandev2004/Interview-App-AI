import React from "react";
import { LuTrash2  } from "react-icons/lu";

// Random pastel backgrounds
const cardColors = [
  "#fef3c7", // yellow-100
  "#e0f2fe", // blue-100
  "#dcfce7", // green-100
  "#fae8ff", // pink-100
  "#ede9fe", // purple-100
  "#f0fdf4", // emerald-50
];

// Helper function to get initials from a role name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const SummaryCard = ({
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastUpdate,
  onSelect,
  onDelete,
}) => {
  const bgColor = cardColors[Math.floor(Math.random() * cardColors.length)];

  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{
          background: bgColor,
        }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {getInitials(role)}
            </span>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-medium">{role}</h2>
                <p className="text-xs text-medium text-gray-900">
                  {topicToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
              className="flex sm:hidden sm:group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0"
               onClick={(e) => {
               e.stopPropagation();
                onDelete();
                 }}
                 >
            <LuTrash2 />
         </button>

      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4">
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            Experience: {experience} {experience == 1 ? "year" : "years"}
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            {questions} Q&A
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full">
            Last Updated: {lastUpdate}
          </div>
        </div>

        <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
