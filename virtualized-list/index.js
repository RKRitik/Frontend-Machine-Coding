window.addEventListener("DOMContentLoaded", setupList);
const listSize = 100000; //10000 a bit slow //100000 too slow

function setupList() {
  const select = document.getElementById("list");
  // const defaultOption = document.createElement("option");
  // defaultOption.value = "";
  // defaultOption.text = "select user";
  // select.appendChild(defaultOption);
  select.addEventListener("change", handleSelect);
  const elements = createElements(listSize);
  createVirtualList(50, 500, 20, elements);
}

function createElements(size) {
  const elements = [];
  Array.from({ length: size }).forEach((_, i) => {
    elements.push({ value: "value" + i, text: "Value " + i });
  });
  return elements;
}

function handleSelect(e) {
  console.log(e.target.value);
}

/**
 *
 * @param {*} elementHeight number
 * @param {*} containerHeight number
 * @param {*} initialItemRenderCount number
 * @param {*} elements any
 */
function createVirtualList(
  elementHeight,
  containerHeight,
  initialItemRenderCount,
  elements
) {
  let startIndex = 0,
    endIndex = initialItemRenderCount - 1;
  const elementShowCount = Math.ceil(containerHeight / elementHeight);

  console.log("elementShowCount", elementShowCount);
  document.getElementById(
    "list-container"
  ).style.height = `${containerHeight}px`;
  const select = document.getElementById("list");
  select.style.maxHeight = `${containerHeight}px`; // Set container height
  select.style.overflowY = "auto";

  // select.style.position = "relative";
  // Create padding divs
  const topPadding = document.createElement("div");
  const bottomPadding = document.createElement("div");
  select.appendChild(topPadding);
  select.appendChild(bottomPadding);
  setElements(); // initial elements
  select.addEventListener("scroll", handleElementRender);

  //keep all elements in array, keep track of startIndex and endIndex; and render only those elements
  //only append thouse elements/remove unused elements on scroll.
  //base case
  function setElements() {
    // Clear existing elements except padding
    while (select.childNodes.length > 2) {
      select.removeChild(select.childNodes[1]);
    }
    console.log({ startIndex, endIndex });
    for (
      let i = startIndex;
      i <= Math.min(endIndex, elements.length - 1);
      i++
    ) {
      const option = document.createElement("div");
      option.value = elements[i].value;
      option.innerHTML = elements[i].text;
      option.style.height = `${elementHeight}px`;
      option.style.position = "relative";
      option.style.textAlign = `center`;
      select.insertBefore(option, bottomPadding); // Insert before bottom padding
    }
    // Adjust padding heights
    topPadding.style.height = `${startIndex * elementHeight}px`;
    bottomPadding.style.height = `${
      (elements.length - endIndex - 1) * elementHeight
    }px`;
  }
  function handleElementRender(e) {
    const scrollTop = e.target.scrollTop;
    // need to check which is last element scrolled
    //number of elements now out of vision ->
    const newStartIndex = Math.floor(scrollTop / elementHeight);
    if (newStartIndex !== startIndex) {
      startIndex = newStartIndex;
      endIndex = startIndex + elementShowCount - 1;
      setElements();
    }
  }
}
