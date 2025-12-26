import { ReactNode } from "react";

export const Button = ({
  title,
  children,
  className,
  bgFill = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  bgFill?: boolean;
}) => {
  return (
    <button
      title={title}
      className={`p-1.5 ${
        bgFill ? "bg-gray-400/40" : ""
      } rounded-full transition-colors hidden sm:block ${className}`}
    >
      {children}
    </button>
  );
};
