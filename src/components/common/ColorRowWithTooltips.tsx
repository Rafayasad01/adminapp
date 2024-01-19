import _ from "lodash";
import { memo } from "react";

const ColorRowWithTooltips = ({ colors = {} }) => {
    return (
      <div className="flex items-center">
        {Object.entries(colors).map(([key, color], index) => (
          <div
            key={index}
            style={{ backgroundColor:  _.toString( color ) }}
            className="relative mr-4 h-10 w-10 rounded-full border border-gray-300 shadow-md"
            title={key} // Use the title attribute for the tooltip
          ></div>
        ))}
      </div>
    );
  };

  export default memo(ColorRowWithTooltips);