let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
      `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("dates", (data) => {
    let currentDates = data.dates;

    for (let i = 0; i <= 3; i++) {
      let input = document.getElementById(i.toString())
      input.value = currentDates[i]
    }

    let submitButton = document.getElementById("submit")
    submitButton.addEventListener("click", handleSubmit)
  });
}

function handleSubmit() {
  let dates = []

  for (let i = 0; i <= 3; i++) {
    let input = document.getElementById(i.toString())
    dates[i] = input.value
  }

  chrome.storage.sync.set({ dates });
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);
