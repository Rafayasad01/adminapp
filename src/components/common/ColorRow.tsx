import { memo } from "react";

const ColorRow = ({ colors = [] }) => {
  return (
    <div className="flex items-center">
      {colors.map((color: string, index: number) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className="relative mr-4 h-10 w-10 rounded-full border border-gray-300 shadow-md"
          title={color} // Use the title attribute for the tooltip
        ></div>
      ))}
    </div>
  );
};


export default memo(ColorRow);