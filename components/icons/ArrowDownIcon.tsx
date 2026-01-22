import { IconProps } from "./types";

export function ArrowDownIcon({ size = 24, className, ...props }: IconProps) {
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
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}
