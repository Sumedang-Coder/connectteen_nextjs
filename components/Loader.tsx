interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const Loader = ({ size = "sm", fullScreen = false }: LoaderProps) => {
  // Mapping ukuran untuk container luar dan dalam
  const sizeClasses = {
    sm: {
      outer: "h-8 w-8 border-[3px]",
      inner: "h-5 w-5 border-[3px]",
      text: "text-sm mt-2",
    },
    md: {
      outer: "h-16 w-16 border-4",
      inner: "h-10 w-10 border-4",
      text: "text-lg mt-4",
    },
    lg: {
      outer: "h-24 w-24 border-[6px]",
      inner: "h-14 w-14 border-[6px]",
      text: "text-xl mt-6",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`${
        fullScreen ? "h-screen w-full" : "w-full py-10"
      } flex flex-col items-center justify-center bg-transparent`}
    >
      <div className="relative flex items-center justify-center">
        {/* Lingkaran Luar */}
        <div
          className={`${currentSize.outer} animate-spin rounded-full border-solid border-primary border-t-transparent`}
        ></div>

        {/* Lingkaran Dalam */}
        <div
          className={`absolute ${currentSize.inner} animate-spin rounded-full border-dotted border-primary/30 border-t-transparent [animation-duration:1.5s]`}
        ></div>
      </div>

      <h2
        className={`${currentSize.text} font-medium text-dark dark:text-white animate-pulse`}
      >
        Memuat data...
      </h2>
    </div>
  );
};

export default Loader;