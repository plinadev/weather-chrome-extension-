import type {
  ILocalStorage,
  ILocalStorageOptions,
  LocalStorageKeys,
} from "../types/storage";

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

export function setStoredOptions(options: ILocalStorageOptions): Promise<void> {
  const vals: ILocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<ILocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ILocalStorage) => {
      resolve(
        res.options ?? {
          tempScale: "imperial",
          homeCity: "",
        }
      );
    });
  });
}
