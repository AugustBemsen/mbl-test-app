/**
 * Truncate a string to a specified length and append "..." if truncated.
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the truncated string including the ellipsis.
 * @returns The truncated string with "..." appended if it exceeds the specified length, otherwise the original string.
 */
export default function truncateString({
  str,
  maxLength,
}: {
  str: string;
  maxLength: number;
}): string {
  if (str.length <= maxLength) {
    return str;
  }

  const truncatedLength = maxLength - 3;
  if (truncatedLength <= 0) {
    return "...";
  }

  return str.slice(0, truncatedLength) + "...";
}
