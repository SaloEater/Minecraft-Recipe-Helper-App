export const getKeyFromStorage =
    (key: string) => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : [];