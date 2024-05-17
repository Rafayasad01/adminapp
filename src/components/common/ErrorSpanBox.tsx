type ErrorSpanBoxProps = {
  error?: string | any;
};

function ErrorSpanBox({ error }: ErrorSpanBoxProps) {
  return (
    <span role="alert" className="error-color text-[11px]">
      {error && `*${error}`}
    </span>
  );
}

export default ErrorSpanBox;
