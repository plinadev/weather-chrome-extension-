import type { OpenWeatherTempScale } from "./weather";

export interface ILocalStorage {
  cities?: string[];
  options?: ILocalStorageOptions;
}
export interface ILocalStorageOptions {
  tempScale: OpenWeatherTempScale;
}
export type LocalStorageKeys = keyof ILocalStorage;
