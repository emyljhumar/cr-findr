export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center">
        <div 
          className="animate-spin rounded-full h-16 w-16 border-b-2"
          style={{ borderColor: '#f97316' }}
        ></div>
        <div className="text-xl mt-4" style={{ color: '#e5e1df' }}>Loading Content Rewards campaigns...</div>
      </div>
    </div>
  );
} 