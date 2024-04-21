const clearAll = () => {
  document.querySelectorAll("td").forEach((el) => {
    el.classList.remove("toggled", "visited")
  })
}

const clearVisited = () => {
  document.querySelectorAll("td").forEach((el) => {
    el.classList.remove("visited")
  })
}

const clearToggled = () => {
  document.querySelectorAll("td").forEach((el) => {
    el.classList.remove("toggled")
  })
}

export { clearAll, clearToggled, clearVisited }
