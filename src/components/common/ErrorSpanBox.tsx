type ErrorSpanBoxProps = {
  error?: string | any;
};

function ErrorSpanBox({ error }: ErrorSpanBoxProps) {
  return (
    <span role="alert" className="error-color">
      {error && `*${error}`}
    </span>
  );
}

export default ErrorSpanBox;
