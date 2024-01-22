const humanReadableDate = (date: string): string => {
  const formatedDate = new Date(date);

  return `${formatedDate.toLocaleDateString()} ${formatedDate.toLocaleTimeString()}`;
};

export default humanReadableDate;
