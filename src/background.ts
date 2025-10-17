import { setStoredOptions } from "./utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredOptions({
    homeCity: "",
    tempScale: "imperial",
  });
});
