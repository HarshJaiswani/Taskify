const getFullDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let filterDate = new Date(date);
  let tarik = filterDate.getDate();
  let mahina = filterDate.getMonth();
  let saal = filterDate.getFullYear();
  return tarik + " " + monthNames[mahina] + " " + saal;
};

export default getFullDate;
