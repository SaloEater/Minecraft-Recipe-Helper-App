import {Item} from "../../type/component/item";
import {action, computed, makeAutoObservable, observable, reaction, trace} from "mobx";
import {MainStore} from "../index";
import IdStore from "../id";
import {IdTypes} from "../../type/common/id/types";

export class ItemsStore
{
    _items: Map<string, Item> = new Map<string, Item>();
    _IdStore: IdStore;
    _newItemName: string = "";
    _canCreateNewItem: boolean = false;
    _createNewItemButtonClicked: boolean = false;

    private save(): void {
        let items = JSON.stringify(Array.from(this._items.values()));
        localStorage.setItem(IdTypes.ITEM, items);
    }

    constructor(globalStore: MainStore) {
        this._IdStore = globalStore.IdStore;
        reaction(
            () => this._newItemName,
            (result: string) => {
                trace(true)
                console.log(result);
                this._canCreateNewItem = result !== "";
            }
        )
        reaction(
            () => this._createNewItemButtonClicked,
            (clicked: boolean) => {
                trace(true)
                console.log("Clicked: " + clicked);
                if (clicked) {
                    this.createNewItem();
                }
            }
        )
        makeAutoObservable(this, {
            _items: observable,
            _newItemName: observable,
            _createNewItemButtonClicked: observable,
            addItem: action,
            createNewItemButtonClicked: action,
            removeItem: action,
            onNewItemNameChange: action,
            canCreateNewItem: computed,
            getNewItemName: computed
        });
    }

    addItem(item: Item): void {
        this._items.set(item.id, item);
        this._IdStore.updateNextId(IdTypes.ITEM);
        this.save();
    }

    getItem(id: string): Item {
        return this._items.get(id) ?? {} as Item;
    }

    getItems(): Item[] {
        let items: Item[] = [];
        this._items.forEach(function (value: Item) {
            items.push(value);
        });
        return items;
    }

    removeItem(item: Item): void {
        this._items.delete(item.id);
    }

    createNewItem(): void {
        let id: string = String(this._IdStore.getNextId(IdTypes.ITEM));
        let newName: string = this._newItemName;
        let item = {
            id: id,
            name: newName
        } as Item;
        this.addItem(item);
        this.onNewItemNameChange("");
    }

    onNewItemNameChange(newName: string): void {
        this._newItemName = newName;
        this._canCreateNewItem = this._newItemName !== "";
    }

    createNewItemButtonClicked(): void {
        this._createNewItemButtonClicked = true;
        this.createNewItem();
    }

    get getNewItemName() {
        return this._newItemName;
    }

    get canCreateNewItem() {
        return !this._canCreateNewItem;
    }
}

export default ItemsStore;