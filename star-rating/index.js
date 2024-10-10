/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
  const starEl = document.getElementById(el);
  //depending on count, append <i> elements
  for (let i = 0; i < count; i++) {
    const star = document.createElement("i");
    star.className = "fa fa-star-o";
    star.addEventListener("mouseover", () => handleHover(i, true));
    star.addEventListener("mouseout", () => handleHover(i, false));
    star.addEventListener("click", handleClick.bind(null, i));
    starEl.appendChild(star);
  }

  function handleClick(count) {
    const totalChildren = starEl.children.length;
    for (let i = 0; i < totalChildren; i++) {
      starEl.children[i].className = i <= count ? "fa fa-star" : "fa fa-star-o";
    }
    callback(count + 1);
  }

  function handleHover(count, toggle) {
    const currentValue = document.getElementById("display-star").innerHTML;
    const updatedCount = toggle ? count : currentValue - 1; // on mouse out ,reset to currentValue
    for (let i = 0; i < starEl.children.length; i++) {
      starEl.children[i].className =
        i <= updatedCount ? "fa fa-star" : "fa fa-star-o";
    }
  }
}

function getStar(value) {
  document.getElementById("display-star").innerHTML = value;
}
Star("star", 10, getStar);
