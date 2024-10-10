const API_URL = `https://dummyjson.com/products?`;
const MAX_LIMIT = 20;
let CURRENT_PAGE = 1;
let TOTAL_PAGES = 1;
const observer = new IntersectionObserver(intersetionCallback, {
  root: document.querySelector("null"), //null means viewport
  threshold: 1,
});

function intersetionCallback(entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    loadMoreProducts();
  }
}

function loadMoreProducts() {
  //increment page count
  CURRENT_PAGE = CURRENT_PAGE + 1;
  fetchProducts();
}

function setLoading(toggle) {
  const loader = document.getElementById("loading");
  if (!loader) return;
  loader.style.visibility = toggle ? "visible" : "hidden";
}

function setShowMore(toggle) {
  const showMore = document.getElementById("load-more");
  if (!showMore) return;
  showMore.style.visibility = toggle ? "visible" : "hidden";
  if (toggle) {
    observer.observe(showMore);
  } else {
    observer.unobserve(showMore);
  }
}

function getSearchQuery() {
  return document.getElementById("search-input")?.value || "";
}

function fetchProducts(search = "") {
  if (search.length) {
    //reset current page
    CURRENT_PAGE = 1;
  }
  search = getSearchQuery();
  setLoading(true);
  const url = `https://dummyjson.com/products/search?q=${search}&limit=${MAX_LIMIT}&skip=${
    (CURRENT_PAGE - 1) * MAX_LIMIT
  }`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      renderProducts(response); // Call renderProducts
    })
    .catch((e) => console.log(e));
}

function renderProducts({ products, total }) {
  setLoading(false);
  //check if more products are present
  TOTAL_PAGES = Math.ceil(total / MAX_LIMIT);
  const moreProducts = total !== 0 && CURRENT_PAGE !== TOTAL_PAGES;
  const parentElement = document.getElementById("products");
  if (observer.lastObservedElement) {
    observer.unobserve(observer.lastObservedElement);
  }
  products.forEach((product, index) => {
    const productEntry = document.createElement("li");
    productEntry.innerHTML = `${product.title} - Rs${product.price}`;
    parentElement.appendChild(productEntry);
    if (index === products.length - 1 && moreProducts) {
      observer.observe(productEntry);
      observer.lastObservedElement = productEntry; // Store the last observed element
    }
  });
}

function debounce(fn, delay) {
  //return a debounced version of the passed function
  let timerId = null;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

const debouncedSearch = debounce(fetchProducts, 500);

fetchProducts();
