export interface ILocalStorage {
  cities?: string[];
}

export type LocalStorageKeys = keyof ILocalStorage;
