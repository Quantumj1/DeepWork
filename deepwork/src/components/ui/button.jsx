import { forwardRef } from "react";

export const Button = forwardRef(function Button(
  { className = "", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-colors " +
        className
      }
      {...props}
    />
  );
});

