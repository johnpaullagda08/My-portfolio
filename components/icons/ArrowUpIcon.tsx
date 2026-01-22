import { IconProps } from "./types";

export function ArrowUpIcon({ size = 24, className, ...props }: IconProps) {
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
      <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  );
}
