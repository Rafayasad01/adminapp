import _ from 'lodash';
import { memo } from 'react';

type ColorRowWithTooltipsProps = {
  type?: string;
  colors?: any;
  productcolor?: string;
  onclick?: any;
};

function ColorRowWithTooltips({
  colors,
  type,
  productcolor,
  onclick,
}: ColorRowWithTooltipsProps) {
  return (
    <div className="flex max-w-[240px] flex-wrap items-center">
      {type === 'object' ? (
        <div className="">
          <div
            style={{ backgroundColor: _.toString(productcolor) }}
            className="mr-2 h-5 w-5 cursor-pointer rounded-full border border-gray-300 shadow-md"
            title={productcolor} // Use the title attribute for the tooltip
          />
        </div>
      ) : type === 'array' ? (
        colors?.map((color: any, index: number) => {
          return (
            <div
              onClick={() =>
                onclick({
                  price:
                    Number(parseFloat(color.price)) +
                    (Number(parseFloat(color.price)) *
                      Number(parseFloat(color.tax))) /
                      100,
                  color: color.color,
                })
              }
              key={index}
              style={{ backgroundColor: _.toString(color.color) }}
              className="mr-2 h-5 w-5 cursor-pointer rounded-full border border-gray-300 shadow-md"
              title={color?.color} // Use the title attribute for the tooltip
            />
          );
        })
      ) : (
        Object.entries(colors)?.map(([key, color], index) => (
          <div
            key={index}
            style={{ backgroundColor: _.toString(color) }}
            className="relative mb-2 mr-2 h-[30px] w-[30px] cursor-pointer rounded-full border border-gray-300 shadow-md"
            title={key} // Use the title attribute for the tooltip
          />
        ))
      )}
    </div>
  );
}

export default memo(ColorRowWithTooltips);
