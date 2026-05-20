import type { ButtonHTMLAttributes, ReactNode } from "react";

type HoverButtonProps = {
  children: ReactNode;
  variant?: "mint" | "primary";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function HoverButton({
  children,
  variant = "mint",
  className = "",
  type = "button",
  ...rest
}: HoverButtonProps) {
  return (
    <button
      type={type}
      className={`hover-btn ${className}`.trim()}
      data-variant={variant}
      {...rest}
    >
      <span className="hover-btn__bg" aria-hidden="true" />
      <span className="hover-btn__bg-hover is--first" aria-hidden="true" />
      <span className="hover-btn__bg-hover is--second" aria-hidden="true" />
      <span className="hover-btn__text">{children}</span>
    </button>
  );
}
