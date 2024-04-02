type CustomErrorMessageProps = {
  text: string;
};

function CustomErrorMessage({ text }: CustomErrorMessageProps) {
  return (
    <span style={{ fontSize: '14px', color: 'red' }} role="alert">
      {text}
    </span>
  );
}

export default CustomErrorMessage;
