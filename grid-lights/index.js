const GRID_SIZE = 3;
const delay_time = 0.5;

const on_grids = [];

function setupGrid() {
  const container = document.getElementById("grid-container");
  container.addEventListener("click", handleGridToggle);
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const new_element = document.createElement("div");
    new_element.classList.add("item");
    // new_element.addEventListener("click", handleGridToggle);
    container.appendChild(new_element);
  }
  container.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;
}

function handleGridToggle(e) {
  //set class
  const element = e.target;
  element.classList.add("on");
  on_grids.push(element);
  if (on_grids.length === GRID_SIZE * GRID_SIZE) {
    //remove event listender
    e.currentTarget.removeEventListener("click", handleGridToggle);
    handleGridReset();
  }
}

async function handleGridReset() {
  await delay(delay_time * 1000);
  const element = on_grids.pop();
  element.classList.remove("on");
  if (on_grids.length) await handleGridReset();
  else {
    //add event listener again
    const container = document.getElementById("grid-container");
    container.addEventListener("click", handleGridToggle);
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

document.addEventListener("DOMContentLoaded", setupGrid);
