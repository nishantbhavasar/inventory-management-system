import { RootState } from "../store/store"

export function getLocalStrorageItem() {
    const item = JSON.parse(localStorage.getItem('persist:root') ?? '{}')
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        item[key] = JSON.parse(item[key])
      }
    }
    return item as RootState
  }