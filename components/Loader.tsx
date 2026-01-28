interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
}

const Loader = ({
  size = "md",
  fullScreen = false,
  text = "Memuat",
}: LoaderProps) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`${fullScreen ? "min-h-screen" : "py-12"
        } flex flex-col items-center justify-center`}
    >
      <div className="relative">
        <div
          className={`${sizeMap[size]} absolute inset-0 rounded-full blur-xl bg-linear-to-br from-cyan-400/40 to-blue-500/40 animate-pulse`}
        />
        <div
          className={`${sizeMap[size]} relative rounded-full bg-linear-to-br from-cyan-400 to-blue-500 shadow-lg`}
        />
        <div className="absolute inset-[3px] rounded-full bg-white dark:bg-black" />
      </div>
      <p className="mt-4 text-sm tracking-wide text-gray-600 dark:text-gray-300 animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;
