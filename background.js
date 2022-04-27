let color = '#3aa757';

let dates = [
  '09:00',
  '12:30',
  '13:30',
  '17:00'
]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color, dates });
  console.log('Default values set to', `color: ${color} ${dates}`);
});
