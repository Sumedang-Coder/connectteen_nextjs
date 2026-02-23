import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  fullScreen = false,
  text = "Memuat",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`
        ${fullScreen ? "min-h-screen" : "py-12"}
        flex flex-col items-center justify-center
        ${className}
      `}
      role="status"
      aria-label={text}
    >
      <div className="relative flex items-center justify-center">
        
        <div
          className={`
            absolute rounded-full blur-xl
            bg-linear-to-br from-cyan-400/50 to-blue-500/50
            ${sizeClasses[size]}
            animate-pulse
          `}
        />
        <div
          className={`
            relative rounded-full
            bg-linear-to-tr from-cyan-400 via-blue-500 to-cyan-400
            shadow-lg shadow-blue-500/30
            ${sizeClasses[size]}
            animate-spin
          `
          }
        >
          {/* 3. Lingkaran Dalam (Transparent Hole) */}
          <div 
            className={`
              absolute inset-[3px] rounded-full 
              bg-white dark:bg-gray-900 
            `} 
          />
        </div>
      </div>

      {text && (
        <p className="mt-6 text-sm font-medium tracking-widest text-gray-500 dark:text-gray-400 uppercase animate-pulse">
          {text}
        </p>
      )}

      <span className="sr-only">Memuat...</span>
    </div>
  );
};

export default Loader;