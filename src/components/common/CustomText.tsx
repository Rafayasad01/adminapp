type Props = {
  text: string;
  noroundedborders?: boolean;
};

function CustomText({ text, noroundedborders }: Props) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        !noroundedborders && 'rounded-lg'
      } mt-5 bg-gray-200 py-5`}
    >
      <p className="font-open-sans font-semibold text-secondary">{text}</p>
    </div>
  );
}

export default CustomText;
