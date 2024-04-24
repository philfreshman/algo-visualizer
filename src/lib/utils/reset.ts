const clearVisitedAndWalls = () => {
  document.querySelectorAll("td").forEach((el) => {
    el.classList.remove("toggled", "visited", "start-box", "end-box")
  })
}

const clearVisited = () => {
  console.log("clearVisited")
  document.querySelectorAll("td").forEach((el) => {
    el.classList.remove("visited", "start-box", "end-box")
  })
}

const clearToggled = () => {
  document.querySelectorAll("td").forEach((el) => {
    el.classList.remove("toggled")
  })
}

const markEndAsVisited = () => {
  console.log("markEndAsVisited")
  document.getElementById("end")?.classList.add("end-box")
}

const markStartAsVisited = () => {
  document.getElementById("start")?.classList.add("start-box")
}

export { clearToggled, clearVisited, clearVisitedAndWalls, markEndAsVisited, markStartAsVisited }
