// useAllStorageValueが返す型を定義
export type StorageValue = {
  key: string;
  value: string;
}

export const useAllStorageValue = () => { 
  // localStorageに保存されている全ての値を取得する
  const getAllStorageValue = () => {
    const storage = localStorage;
    const storageKey = Object.keys(storage);
    const storageValue = storageKey.map((key:string):StorageValue => {
      return {
        key,
        value: storage.getItem(key) || ''
      }
    });
    return storageValue;
  }

  return {
    getAllStorageValue
  }
}
