import { memo } from 'react';

function ColorRow({ colors = [] }) {
  return (
    <div className="flex max-w-[240px] flex-wrap  items-center">
      {colors.map((color: string, index: number) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className="relative mb-2 mr-2 h-[30px] w-[30px] cursor-pointer rounded-full border border-gray-300 shadow-md"
          title={color} // Use the title attribute for the tooltip
        />
      ))}
    </div>
  );
}

export default memo(ColorRow);
