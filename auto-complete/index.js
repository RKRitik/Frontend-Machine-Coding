document.addEventListener("DOMContentLoaded", setupSearch);
const debounceSearch = debounce(handleSearch);

function setupSearch() {
  const input = document.getElementById("search");
  input.addEventListener("input", debounceSearch);
  document.addEventListener("click", checkCloseDropdown);
}

function debounce(fn) {
  const delay = 1000;
  let timer;
  return function (...params) {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...params), delay);
      return;
    }
    timer = setTimeout(() => fn(...params), delay);
  };
}

function handleSearch(e) {
  if (e.target?.value?.trim().length) mockApi().then(renderOptions);
}

function renderOptions(response) {
  const searchText = document.getElementById("search").value;
  const { products: options } = response;
  const searchDropdown = document.getElementById("search-results");
  searchDropdown.style.display = "block"; //remove display none property
  document.getElementById("search").className += " search-box-open";
  searchDropdown.innerHTML = ""; //clear
  options.forEach((option) => {
    if (option.title.toLowerCase().includes(searchText)) {
      const optionElement = document.createElement("div");
      optionElement.innerText = option.title;
      optionElement.id = option.id;
      optionElement.onclick = handleSelect;
      searchDropdown.appendChild(optionElement);
    }
  });
  if (!searchDropdown.children.length) {
    const optionElement = document.createElement("div");
    optionElement.innerText = "No results found";
    optionElement.id = "";
    searchDropdown.appendChild(optionElement);
  }
}

function checkCloseDropdown(clickElement) {
  const container = document.getElementById("inner-container");
  if (container.contains(clickElement.target)) {
    return;
  }
  handleCloseDropdown();
}

function handleCloseDropdown() {
  const searchDropdown = document.getElementById("search-results");
  searchDropdown.style.display = "none";
  document.getElementById("search").classList.remove("search-box-open");
}

function handleSelect(e) {
  console.log("e.target.innerText", e.target.innerText);
  document.getElementById("search").value = e.target.innerText;
  handleCloseDropdown();
  // alert("select", e.target.innerText);
}

async function mockApi() {
  const res = await fetch("https://dummyjson.com/products");
  const products = await res.json();
  return products;
}
