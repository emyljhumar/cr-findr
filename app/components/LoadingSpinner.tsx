export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <div className="text-gray-900 dark:text-white text-xl mt-4">Loading campaigns...</div>
      </div>
    </div>
  );
} 