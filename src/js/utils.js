export function toggleClassNotAvailable(data) {
  const dataElement = document.querySelector(`.${data}-box`);
  const textContent = document.querySelector(
    `.${data}-box #${data}`
  ).textContent;

  if (textContent === "Not Available") {
    dataElement.classList.add("not-available");
  } else {
    dataElement.classList.remove("not-available");
  }
}

export function creationDayTreatment(createDate) {
  const [day, month, year] = new Date(createDate)
    .toLocaleDateString("pt-br")
    .split("/");
  const monthsIndex = Number(month);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `Joined ${day} ${months[monthsIndex]} ${year}`;
}
