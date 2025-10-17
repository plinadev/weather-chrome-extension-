import { setStoredOptions } from "./utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredOptions({
    tempScale: "imperial",
  });
});
