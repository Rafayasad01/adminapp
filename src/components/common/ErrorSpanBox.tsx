type Props = {
  error?: string;
};

function ErrorSpanBox({ error }: Props) {
  return (
    <span role="alert" className="error-color">
      {error && `*${error}`}
    </span>
  );
}

export default ErrorSpanBox;
