

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-gray-800 rounded-lg shadow-md p-5 ${className}`}>
    {children}
  </div>
);