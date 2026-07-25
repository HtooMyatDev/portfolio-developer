// getFormattedDate.ts
export default function getFormattedDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString || "";
  }
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
}
