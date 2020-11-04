import {Item, ItemsStoreInterface} from "../../type/component/item";
import {action} from "mobx";
import {MainStore} from "../index";
import IdStore from "../id";
import {IdTypes} from "../../type/common/id/types";

class ItemsStore implements ItemsStoreInterface
{
    private _items: Map<string, Item> = new Map<string, Item>();
    private _IdStore: IdStore;

    constructor(globalStore: MainStore) {
        this._IdStore = globalStore.IdStore;
        this._items.set("1", {id: "1", name: "name"});
    }

    @action
    addItem(item: Item): void {
        this._items.set(item.id, item);
        this._IdStore.updateNextId(IdTypes.ITEM);
    }

    getItem(id: string): Item {
        return this._items.get(id) ?? {} as Item;
    }

    getItems(): Item[] {
        let items: Item[] = [];
        this._items.forEach(function (value, key) {
            items.push(value);
        });
        return items;
    }

    removeItem(item: Item): void {
        this._items.delete(item.id);
    }
}

export default ItemsStore;