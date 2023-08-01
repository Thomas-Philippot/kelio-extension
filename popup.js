// Initialize button
let button = document.getElementById("button")
button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: insertDates,
  })
})

chrome.storage.sync.get("dates", ({ dates }) => {
  const div = document.getElementById("dates")
  const list = document.createElement('li')

  for (const date of dates) {
    const item = document.createElement('ul')
    item.textContent = date
    list.appendChild(item)
  }

  div.appendChild(list)

})

// The body of this function will insert dates on Kelio's page
function insertDates() {

  chrome.storage.sync.get("dates", ({ dates }) => {
     // document.body.style.backgroundColor = color;

    let doc = document.querySelector('iframe').contentWindow.document
    const table = doc.querySelector('table.presenceBordered')

    for (let i in table.rows) {
      let row = table.rows[i]
      //iterate through rows

      // select rows that contains input for date
      if (typeof row !== 'object' || row.getAttribute('align') !== 'center') {
        continue
      }

      // ignore already filled fields
      const isFilled = row.cells[0].querySelector('.etatGtp') === null
      if (isFilled) {
        continue
      }

      // ignore weekends
      let day = row.cells[0].querySelector('.etatGtp').textContent.trim()
      if (day === 'Di'|| day === 'Sa') {
        continue
      }

      let index = 0
      for (let j in row.cells) {
        let col = row.cells[j]
        // select col where date inputs are
        if (typeof col !== 'object' || col.getAttribute('width') !== '100px') {
          continue
        }
        let input = col.querySelector('input[type=text]')
        if (input !== null) {
          input.value = dates[index]
          index++
        }
      }
    }
  })
}
