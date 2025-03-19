// Chrome Extension API TypeScript definitions
// This is a simplified version for our needs

declare namespace chrome {
  namespace tabs {
    function query(queryInfo: object, callback: (tabs: any[]) => void): void;
    function create(createProperties: { url: string }, callback?: () => void): void;
    function sendMessage(tabId: number, message: any, callback?: (response: any) => void): void;
    function get(tabId: number, callback: (tab: any) => void): void;
    const onUpdated: {
      addListener(callback: (tabId: number, changeInfo: any, tab: any) => void): void;
    };
  }

  namespace runtime {
    function getURL(path: string): string;
    function sendMessage(message: any, callback?: (response: any) => void): void;
    const onMessage: {
      addListener(callback: (message: any, sender: any, sendResponse: (response: any) => void) => void | boolean): void;
    };
    const onInstalled: {
      addListener(callback: (details: any) => void): void;
    };
  }

  namespace storage {
    const local: {
      get(keys: string | string[] | object | null, callback: (items: { [key: string]: any }) => void): void;
      set(items: { [key: string]: any }, callback?: () => void): void;
      remove(keys: string | string[], callback?: () => void): void;
      clear(callback?: () => void): void;
    };
    const sync: {
      get(keys: string | string[] | object | null, callback: (items: { [key: string]: any }) => void): void;
      set(items: { [key: string]: any }, callback?: () => void): void;
      remove(keys: string | string[], callback?: () => void): void;
      clear(callback?: () => void): void;
    };
  }
} 