import { writable, type Writable } from "svelte/store";

// IndexedDB Utility Functions
export function openDB(dbName: string, storeName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: "id" });
    };

    request.onsuccess = (event: any) => {
      resolve(event.target.result);
    };

    request.onerror = (event: any) => {
      reject(event.target.error);
    };
  });
}

export function putItem(db: IDBDatabase, storeName: string, item: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event: any) => {
      reject(event.target.error);
    };
  });
}

export function getItem(db: IDBDatabase, storeName: string, id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = (event: any) => {
      resolve(event.target.result);
    };

    request.onerror = (event: any) => {
      reject(event.target.error);
    };
  });
}

// Helper function to create a writable store with IndexedDB support
export function persistentStore<T>(key: string, initialValue: T): Writable<T> {
  const { subscribe, set, update } = writable<T>(initialValue);

  async function init() {
    try {
      const db = await openDB("TracesDB", "tracesStore");
      const item = await getItem(db, "tracesStore", key);
      if (item) {
        set(item.value);
      }
    } catch (error) {
      console.error("Error initializing persistent store:", error);
    }
  }

  init();

  return {
    subscribe,
    set: (value: T) => {
      set(value);
      openDB("TracesDB", "tracesStore").then(db => {
        putItem(db, "tracesStore", { id: key, value });
      });
    },
    update: (updater: (value: T) => T) => {
      update(currentValue => {
        const newValue = updater(currentValue);
        openDB("TracesDB", "tracesStore").then(db => {
          putItem(db, "tracesStore", { id: key, value: newValue });
        });
        return newValue;
      });
    }
  };
}
