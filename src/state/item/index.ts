import {Item} from "../../type/component/item";
import {action, computed, makeAutoObservable, observable} from "mobx";
import {MainStore} from "../index";
import IdStore from "../id";
import {IdTypes} from "../../type/common/id/types";
import {isNumeric} from "../../common/isNumeric";

export class ItemsStore
{
    _items: Map<string, Item> = new Map<string, Item>();
    _IdStore: IdStore;
    _newItemName: string = "";
    _canCreateNewItem: boolean = false;
    _createNewItemButtonClicked: boolean = false;
    _amountToCraft: string = "";
    _canCraft: boolean = false;
    _newStack: string = "";

    private save(): void {
        let items = JSON.stringify(Array.from(this._items.values()));
        localStorage.setItem(IdTypes.ITEM, items);
    }

    constructor(globalStore: MainStore) {
        this._IdStore = globalStore.IdStore;

        makeAutoObservable(this, {
            _items: observable,
            _newItemName: observable,
            _createNewItemButtonClicked: observable,
            _newStack: observable,
            _amountToCraft: observable,
            addItem: action,
            createNewItemButtonClicked: action,
            removeItem: action,
            onNewItemNameChange: action,
            onNewStackChanged: action,
            canCreateNewItem: computed,
            getNewItemName: computed,
            getAmountToCraft: computed,
            canCraft: computed,
            getNewStack: computed,
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
            name: newName,
            stack: Number(this._newStack)
        } as Item;
        this.addItem(item);
        this.onNewItemNameChange("");
        this.onNewStackChanged("");
    }

    onNewItemNameChange(newName: string): void {
        this._newItemName = newName;
        this.updateCanCreate();
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

    onAmountToCraftChanged(value: string) {
        if (isNumeric(value) || value === "") {
            this._amountToCraft = value;
            this.updateCanCraftState();
        }
    }

    private updateCanCraftState() {
        this._canCraft = this._amountToCraft !== "";
    }

    get getAmountToCraft()
    {
        return this._amountToCraft;
    }

    get canCraft()
    {
        return !this._canCraft;
    }

    onNewStackChanged(value: string) {
        if (isNumeric(value) || value === "") {
            this._newStack = value;
            this.updateCanCreate();
        }
    }

    get getNewStack()
    {
        return this._newStack;
    }

    private updateCanCreate() {
        this._canCreateNewItem =
            this._newItemName !== "" &&
            this._newStack !== "";
    }

    saveItem(item: Item): void {
        this._items.set(item.id, item);
        this.save();
    }
}

export default ItemsStore;