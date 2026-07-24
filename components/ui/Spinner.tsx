const Spinner = ({ content }: { content: string }) => {
  return (
    <div className="rounded-full h-5 w-5 flex items-center justify-center">
      <p className="text-body-MD font-semibold text-white">{content}</p>
      <div className="animate-spin rounded-full h-5 w-5"></div>
    </div>
  );
};

export default Spinner;
