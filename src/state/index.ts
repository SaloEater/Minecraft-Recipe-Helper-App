import ItemsStore from "./item";
import IdStore from "./id";
import {IdTypes} from "../type/common/id/types";
import {Item} from "../type/component/item";
import MachinesStore from "./machine";
import {Machine} from "../type/component/machine";
import RecipeResultsStore from "./recipe-result";
import {RecipeResult} from "../type/component/recipe-result";

export class MainStore {
    ItemsStore: ItemsStore;
    IdStore: IdStore;
    MachinesStore: MachinesStore;
    RecipeResultsStore: RecipeResultsStore;

    constructor() {
        this.IdStore = new IdStore();
        this.ItemsStore = new ItemsStore(this);
        this.MachinesStore = new MachinesStore(this);
        this.RecipeResultsStore = new RecipeResultsStore(this);
    }
}
const mainStore = new MainStore();

let getStoreFromStorage = (key: string) => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : [];

getStoreFromStorage(IdTypes.ITEM).forEach(function (entry: Item) {
    mainStore.ItemsStore._items.set(entry.id, entry);
})

getStoreFromStorage(IdTypes.MACHINE).forEach(function (entry: Machine) {
    mainStore.MachinesStore._items.set(entry.id, entry);
})
getStoreFromStorage(IdTypes.RECIPE_RESULT).forEach(function (entry: RecipeResult) {
    mainStore.RecipeResultsStore._items.set(entry.id, entry);
})

getStoreFromStorage(IdTypes.ID).forEach(function (entry: string[] | number []) {
    mainStore.IdStore._ids.set(entry[0] as string, entry[1] as number);
})

export default mainStore;