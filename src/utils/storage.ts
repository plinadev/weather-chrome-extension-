import type { ILocalStorage, LocalStorageKeys } from "../types/storage";

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: ILocalStorage = {
    cities,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ILocalStorage) => {
      resolve(res.cities ?? []);
    });
  });
}
