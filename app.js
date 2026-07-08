const counterButton = document.querySelector("#counterButton");
const counterValue = document.querySelector("#counterValue");
const noteInput = document.querySelector("#noteInput");
const saveNoteButton = document.querySelector("#saveNoteButton");
const clearNoteButton = document.querySelector("#clearNoteButton");
const savedNoteText = document.querySelector("#savedNoteText");
const savedNoteMeta = document.querySelector("#savedNoteMeta");
const statusText = document.querySelector("#statusText");

const counterKey = "mini-pwa-counter";
const noteKey = "mini-pwa-note";
const noteSavedAtKey = "mini-pwa-note-saved-at";

let count = Number(localStorage.getItem(counterKey) || 0);
counterValue.textContent = String(count);
noteInput.value = localStorage.getItem(noteKey) || "";

function showSavedNote() {
  const savedNote = localStorage.getItem(noteKey) || "";
  const savedAt = localStorage.getItem(noteSavedAtKey);

  savedNoteText.textContent = savedNote || "Nothing saved yet.";
  savedNoteMeta.textContent = savedAt ? `Last saved: ${savedAt}` : "Save a note to see it here.";
}

function saveNote() {
  const note = noteInput.value.trim();
  const savedAt = new Date().toLocaleString();

  localStorage.setItem(noteKey, note);
  localStorage.setItem(noteSavedAtKey, savedAt);
  showSavedNote();
  statusText.textContent = "Note saved on this device";
}

function clearNote() {
  noteInput.value = "";
  localStorage.removeItem(noteKey);
  localStorage.removeItem(noteSavedAtKey);
  showSavedNote();
  statusText.textContent = "Note cleared";
}

counterButton.addEventListener("click", () => {
  count += 1;
  counterValue.textContent = String(count);
  localStorage.setItem(counterKey, String(count));
});

saveNoteButton.addEventListener("click", saveNote);
clearNoteButton.addEventListener("click", clearNote);

function updateOnlineStatus() {
  statusText.textContent = navigator.onLine ? "Online, local storage is available" : "Offline, the app still works";
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();
showSavedNote();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (error) {
      statusText.textContent = "Service worker registration failed";
      console.error(error);
    }
  });
}
