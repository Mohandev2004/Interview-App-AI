const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const formatDate = (dateInput: string | Date): string => {
  const date =
    typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const dayWithOrdinal = getOrdinalSuffix(date.getDate());
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${dayWithOrdinal} ${month} ${year}`;
};
