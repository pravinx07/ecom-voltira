const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-dots loading-lg"></div>
        <p className="mt-2 text-gray-400">Loading products...</p>
      </div>
    </div>
  );
};

export default Loading;
