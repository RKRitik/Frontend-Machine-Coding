fetch("./structure.json")
  .then((response) => response.json())
  .then((structure) => handleStructure(structure, "list-root", 0));

const levelMargin = 40;
function handleStructure(structure, listId, level) {
  if (!listId) return;
  const currentUl = document.getElementById(listId);
  structure.files.forEach((file, index) => {
    const isFolder = file.hasOwnProperty("files");
    const listItem = document.createElement("li"); //create parent list eleen
    const listItemIcon = document.createElement("i"); //create icon
    const listItemName = document.createElement("span"); //create text
    listItemIcon.className = isFolder ? "fa fa-folder" : "fa fa-file"; //update icon
    listItemIcon.style.cursor = isFolder ? "pointer" : ""; //pointer if folder
    listItem.style.marginLeft = `${(level * levelMargin).toString()}px`;
    listItem.style.listStyleType = "none";
    listItemName.innerHTML = file.name;
    listItemName.style.marginLeft = "10px";
    listItem.appendChild(listItemIcon);
    listItem.appendChild(listItemName);
    currentUl.appendChild(listItem);
    if (isFolder) {
      const nestedUl = document.createElement("ul");
      nestedUl.id = `listId-${listId}-${index}`;
      nestedUl.style.display = "none"; // Initially hidden
      currentUl.appendChild(nestedUl);
      listItemIcon.addEventListener("click", () => {
        nestedUl.style.display =
          nestedUl.style.display === "none" ? "block" : "none";
      });
      handleStructure(file, nestedUl.id, level + 1); // Call recursively for nested structure
    }
  });
}

function toggleFolder(listItem) {
  console.log("listItem", listItem);
}
