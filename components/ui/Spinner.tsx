const Spinner = ({ content }: { content: string }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-body-MD font-semibold text-white">{content}</p>
      <div className="animate-spin rounded-full h-4 w-4 border-white border-t-transparent border-2"></div>
    </div>
  );
};

export default Spinner;
