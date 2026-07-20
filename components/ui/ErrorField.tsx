interface ErrorFieldProps {
  message?: string;
}

const ErrorField = ({ message }: ErrorFieldProps) => {
  return (
    message && (
      <p className="ps-1 pt-1 text-label-SM font-normal text-error">
        {message}
      </p>
    )
  );
};

export default ErrorField;
