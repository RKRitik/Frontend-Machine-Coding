let currentDraggingElement = null;

document.addEventListener("DOMContentLoaded", () => {
  setupBoard("container", 5, ["todo", "inprogress", "qa", "uat", "live"]);
});

/**
 *
 * @param {string} containerId
 * @param {number} sectionCount
 * @param {Array<string>} sectionNames
 */
function setupBoard(containerId, sectionCount, sectionNames) {
  const container = document.getElementById(containerId);
  container.className = "board";
  const header = setupHeader();
  container.appendChild(header);
  const sectionContainer = setupSections(sectionCount, sectionNames);
  container.appendChild(sectionContainer);
}

function setupHeader() {
  const header = document.createElement("div");
  header.className = "board-header";
  header.innerHTML = "Kanban Board";
  return header;
}

/**
 *
 * @param {number} sectionCount
 * @param {Array<string>} sectionNames
 */
function setupSections(sectionCount, sectionNames) {
  const container = document.createElement("div");
  container.className = "sections-container";
  //sections
  Array.from({ length: sectionCount }).forEach((_, index) => {
    const section = document.createElement("div"); //this is parent container
    section.addEventListener("drop", handleDrop);
    section.addEventListener("dragover", handleAllowDrop);
    section.className = "section";
    const sectionName = document.createElement("div"); //this will show section name
    sectionName.className = "section-header";
    sectionName.innerHTML = sectionNames[index];
    const sectionItems = document.createElement("div"); //this will hold the tasks
    sectionItems.className = "tasks-container";
    const task = createTask("task " + (index + 1)); //temp
    sectionItems.appendChild(task);
    section.appendChild(sectionName);
    section.appendChild(sectionItems);
    container.appendChild(section);
  });
  return container;
}

function createTask(name = "") {
  const task = document.createElement("div");
  task.innerHTML = name;
  task.className = "task";
  task.draggable = true;
  task.addEventListener("dragstart", handleTaskDrag);
  return task;
}

function handleTaskDrag(e) {
  currentDraggingElement = e.target;
}
function handleAllowDrop(e) {
  e.preventDefault();
}

function handleDrop(e) {
  const section = e.target;
  const taskContainer = section.children[1];
  const newTask = createTask(currentDraggingElement.innerHTML);
  taskContainer.appendChild(newTask);
  currentDraggingElement.parentElement.removeChild(currentDraggingElement);
}
//from -> remove.
//to -> add
