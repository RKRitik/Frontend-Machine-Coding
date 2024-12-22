// This was for a front end position.
// Prompt was deceptively simple. They set you up in a code sandbox environment using Code Signal. They give you a html button and when a user clicks a button, it continually adds a progress bar onto the page. The progress bar would then have to load in a given amount of time (think 3 to 5 seconds). Learn your easy math to make sure the progress bar moves smoothly. There are many tutorials online about how to 'animate' this with CSS transition if the progress bar is already on the page. I had seen this via normal front end prep, but didn't know the variation of using the button to add it.
// If you get past the first part, then they ask you to do by throttling how many progress bars can be running at once. For example, if the limit is 3 progress bars, and the user clicks on the button 4 times, the fourth progress bar only starts after the very first one finishes. You need proper scoping on this.
// I didn't know this at the time since I failed pretty miserably, but if one gets past that part, then the interviewer apparently will ask you to do it without setTimeout() , which is a popular way to do it. I only found that out after searching for it after the fact.

const progressQueue = [];
const activeQueue = [];

const timerDuration = 5; //seconds
const maxProgressBars = 3;
const animationUpdateRate = 20; // updates in ms
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add-progress-btn")
    .addEventListener("click", handleAddProgressJs);
  document
    .getElementById("add-progress-btn-css")
    .addEventListener("click", handleAddProgressCSS);
  document
    .getElementById("add-progress-btn-animation")
    .addEventListener("click", handleAddProgressRequestAnimation);
});

function handleAddProgressJs() {
  //add directly to progressQueue.
  //if active que.length < 3, remove from progress and add to active. and start.
  //else do ntohing
  //when a task from active que fishses, check and start a task from progressQueue.
  const parentContainer = document.getElementById("list-container");
  const newProgressBar = document.createElement("progress");
  newProgressBar.value = 0;
  parentContainer.appendChild(newProgressBar);
  progressQueue.push(newProgressBar);
  if (activeQueue.length < maxProgressBars) {
    const current = progressQueue.pop();
    handleAnimateProgress(current);
  }
}

function handleAnimateProgress(newProgressBar) {
  let timerId;
  activeQueue.push(newProgressBar);
  //timerDuration * 1000 ms -> 1.0 percent
  timerId = setInterval(() => {
    newProgressBar.value += animationUpdateRate / (timerDuration * 1000);
    if (newProgressBar.value >= 1) {
      clearInterval(timerId);
      timerId = null;
      activeQueue.pop();
      //check and start from progress queue
      const nextProgressBar = progressQueue.shift();
      if (nextProgressBar) handleAnimateProgress(nextProgressBar);
    }
  }, animationUpdateRate);
}

function handleAddProgressRequestAnimation() {
  const parentContainer = document.getElementById("list-container");
  const newProgressBar = document.createElement("progress");
  newProgressBar.value = 0;
  newProgressBar.max = 100;
  parentContainer.appendChild(newProgressBar);
  progressQueue.push(newProgressBar);
  if (activeQueue.length < maxProgressBars) {
    const newProggress = progressQueue.pop();
    handleAnimationMethod(newProggress, newProggress); //requestAnimationFrame calls updateProgressBar with a timestamp value when it's time to update the frame.
  }
}

function handleAnimationMethod(progressToUpdate) {
  activeQueue.push(progressToUpdate); // Add to the active progress bars list
  let startTime = null;
  let lastUpdateTime = 0;
  const animationUpdateRate = 10; //
  function updateProgressBar(timestamp) {
    //timestamp automatically passed to callback in requestAnimationFrame
    if (!startTime) startTime = timestamp;
    const elapsedTime = (timestamp - startTime) / 1000; // in seconds
    // Only update if enough time has passed (based on animationUpdateRate)
    if (timestamp - lastUpdateTime >= animationUpdateRate) {
      const progress = (elapsedTime / timerDuration) * 100;
      progressToUpdate.value = Math.min(progress, 100);
      lastUpdateTime = timestamp; // Record the last update time
    }
    if (elapsedTime < timerDuration) {
      requestAnimationFrame(updateProgressBar);
    } else {
      progressToUpdate.value = 100;
      const nextProgressBar = progressQueue.shift(); // Get the next progress bar
      if (nextProgressBar) handleAnimationMethod(nextProgressBar);
    }
  }
  requestAnimationFrame(updateProgressBar);
}

function handleAddProgressCSS() {
  const parentContainer = document.getElementById("list-container");
  const progressContainer = document.createElement("div");
  const progressInner = document.createElement("div");
  progressInner.className = "progress-bar-inner";
  progressContainer.className = "progress-bar-container";
  progressInner.innerText = "";
  progressContainer.appendChild(progressInner);
  parentContainer.appendChild(progressContainer);
}
