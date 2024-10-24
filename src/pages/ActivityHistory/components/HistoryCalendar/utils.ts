export const updateSelectedClass = (newSelectedDate: string) => {
  document.querySelector(".fc-day-selected")?.classList.remove("fc-day-selected")

  const dateEl = document.querySelector(`[data-date="${newSelectedDate}"]`)
  if (dateEl) {
    dateEl.classList.add("fc-day-selected")
  }
}
