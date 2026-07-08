const counterButton = document.querySelector("#counterButton");
const counterValue = document.querySelector("#counterValue");
const noteInput = document.querySelector("#noteInput");
const statusText = document.querySelector("#statusText");

const counterKey = "mini-pwa-counter";
const noteKey = "mini-pwa-note";

let count = Number(localStorage.getItem(counterKey) || 0);
counterValue.textContent = String(count);
noteInput.value = localStorage.getItem(noteKey) || "";

counterButton.addEventListener("click", () => {
  count += 1;
  counterValue.textContent = String(count);
  localStorage.setItem(counterKey, String(count));
});

noteInput.addEventListener("input", () => {
  localStorage.setItem(noteKey, noteInput.value);
});

function updateOnlineStatus() {
  statusText.textContent = navigator.onLine ? "Online, данные сохранены локально" : "Offline, приложение продолжает работать";
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (error) {
      statusText.textContent = "Service worker не зарегистрирован";
      console.error(error);
    }
  });
}
