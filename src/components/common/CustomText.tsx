type CustomTextProps = {
  text: string;
  noRoundedBorders?: boolean;
};

function CustomText({ text, noRoundedBorders }: CustomTextProps) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        !noRoundedBorders && 'rounded-lg'
      } mt-5 bg-gray-200 py-5`}
    >
      <p className="font-open-sans font-semibold text-secondary">{text}</p>
    </div>
  );
}

export default CustomText;
