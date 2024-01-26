import _ from 'lodash';
import { memo } from 'react';

type Props = {
  type?: string;
  colors: any;
};

function ColorRowWithTooltips({ colors, type }: Props) {
  return (
    <div className="flex max-w-[240px] flex-wrap items-center">
      {type === 'array'
        ? colors?.map((color: any, index: number) => {
            return (
              <div
                key={index}
                style={{ backgroundColor: _.toString(color.value) }}
                className="mr-2 h-10 w-10 cursor-pointer rounded-full border border-gray-300 shadow-md"
                title={color?.name} // Use the title attribute for the tooltip
              />
            );
          })
        : Object.entries(colors)?.map(([key, color], index) => (
            <div
              key={index}
              style={{ backgroundColor: _.toString(color) }}
              className="relative mr-2 mb-2 h-[30px] w-[30px] cursor-pointer rounded-full border border-gray-300 shadow-md"
              title={key} // Use the title attribute for the tooltip
            />
          ))}
    </div>
  );
}

export default memo(ColorRowWithTooltips);
