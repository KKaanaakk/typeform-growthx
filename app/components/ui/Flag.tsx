"use client";

interface FlagProps {
  countryCode: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function Flag({ countryCode, size = "md", className = "" }: FlagProps) {
  const flagUrl = `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;

  return (
    <img
      src={flagUrl}
      alt={`${countryCode} flag`}
      className={`rounded-sm object-cover ${sizeMap[size]} ${className}`}
      loading="lazy"
    />
  );
}
