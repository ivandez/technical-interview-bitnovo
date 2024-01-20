const humanReadableDate = (date: Date): string => {
  const formatedDate = new Date(date);

  return `${formatedDate.toLocaleDateString()} ${formatedDate.toLocaleTimeString()}`;
};

export default humanReadableDate;
