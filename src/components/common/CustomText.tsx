type CustomTextProps = {
  text: string;
  noRoundedBorders?: boolean;
};

function CustomText({ text, noRoundedBorders }: CustomTextProps) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        !noRoundedBorders && 'rounded-lg'
      } mt-5 bg-foreground py-5`}
    >
      <p className="font-an-gurmukhi font-semibold text-secondary2">{text}</p>
    </div>
  );
}

export default CustomText;
