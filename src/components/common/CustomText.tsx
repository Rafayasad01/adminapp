type CustomTextProps = {
  text: string;
  noRoundedBorders?: boolean;
  bg?: string;
};

function CustomText({ text, noRoundedBorders, bg }: CustomTextProps) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        !noRoundedBorders && 'rounded-lg'
      } mt-5 ${bg || 'bg-gray-200'} py-5`}
    >
      <p className="font-open-sans font-semibold text-secondary">{text}</p>
    </div>
  );
}

export default CustomText;
