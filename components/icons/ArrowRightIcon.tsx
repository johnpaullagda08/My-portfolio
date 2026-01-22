import { IconProps } from "./types";

export function ArrowRightIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
