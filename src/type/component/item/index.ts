export interface Item {
    id: string,
    name: string,
}

export interface ItemsStoreInterface {
    getItems: () => Item[];
    addItem: (item: Item) => void;
    getItem: (id: string) => Item;
    removeItem: (item: Item) => void;
}