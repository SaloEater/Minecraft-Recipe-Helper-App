import ItemsStore from "./item";
import IdStore from "./id";
import {IdTypes} from "../type/common/id/types";
import {Item} from "../type/component/item";
import MachinesStore from "./machine";
import {Machine} from "../type/component/machine";
import RecipeResultsStore from "./recipe-result";
import {RecipeResult} from "../type/component/recipe-result";
import RecipesStore from "./recipe";
import {Recipe} from "../type/component/recipe";
import {getKeyFromStorage} from "../common/localStorage";

export class MainStore {
    ItemsStore: ItemsStore;
    IdStore: IdStore;
    MachinesStore: MachinesStore;
    RecipeResultsStore: RecipeResultsStore;
    RecipesStore: RecipesStore;

    constructor() {
        this.IdStore = new IdStore();
        this.ItemsStore = new ItemsStore(this);
        this.MachinesStore = new MachinesStore(this);
        this.RecipeResultsStore = new RecipeResultsStore(this);
        this.RecipesStore = new RecipesStore(this);

        this.fillStores();
    }

    private fillStores() {
        getKeyFromStorage(IdTypes.ITEM).forEach((entry: Item) => {
            this.ItemsStore._items.set(entry.id, entry);
        })
        if (this.ItemsStore._items.size == 0) {
            const initial = '[{"id":"0","name":"Iron Tank Wall","stack":64},{"id":"1","name":"Iron Plate","stack":64},{"id":"2","name":"Iron Ingot","stack":64},{"id":"3","name":"Large Bronze Fluid Pipe","stack":64},{"id":"4","name":"Bronze Plate","stack":64},{"id":"5","name":"Bronze Ingot","stack":64}]';
            JSON.parse(initial).forEach((entry: Item) => {
                this.ItemsStore._items.set(entry.id, entry);
            });
        }

        getKeyFromStorage(IdTypes.MACHINE).forEach((entry: Machine) => {
            this.MachinesStore._items.set(entry.id, entry);
        })
        if (this.MachinesStore._items.size === 0) {
            const initial = '[{"id":"0","name":"Workbench"},{"id":"1","name":"Hammer"}]';
            JSON.parse(initial).forEach((entry: Machine) => {
                this.MachinesStore._items.set(entry.id, entry);
            });
        }

        getKeyFromStorage(IdTypes.RECIPE_RESULT).forEach((entry: RecipeResult) => {
            this.RecipeResultsStore._items.set(entry.id, entry);
        })
        if (this.RecipeResultsStore._items.size === 0) {
            const initial = '[{"id":"0","resultItemId":"0","machineId":"0","amount":8,"name":"Iron Tank Wall - Workbench"},{"id":"1","resultItemId":"1","machineId":"1","amount":2,"name":"Iron Plate - Hammer"},{"id":"2","resultItemId":"3","machineId":"0","amount":1,"name":"Large Bronze Fluid Pipe - Workbench"},{"id":"3","resultItemId":"4","machineId":"1","amount":2,"name":"Bronze Plate - Hammer"}]';
            JSON.parse(initial).forEach((entry: RecipeResult) => {
                this.RecipeResultsStore._items.set(entry.id, entry);
            });
        }

        getKeyFromStorage(IdTypes.RECIPE).forEach((entry: Recipe) => {
            this.RecipesStore._items.set(entry.id, entry);
        })
        if (this.RecipesStore._items.size === 0) {
            const initial = '[{"id":"0","itemId":"1","recipeResultId":"0","amount":4},{"id":"1","itemId":"2","recipeResultId":"1","amount":3},{"id":"2","itemId":"4","recipeResultId":"2","amount":6},{"id":"3","itemId":"5","recipeResultId":"3","amount":3}]';
            JSON.parse(initial).forEach((entry: Recipe) => {
                this.RecipesStore._items.set(entry.id, entry);
            });
        }

        getKeyFromStorage(IdTypes.ID).forEach((entry: string[] | number []) => {
            this.IdStore._ids.set(entry[0] as string, entry[1] as number);
        })
        if (this.IdStore._ids.size === 0) {
            const initial = '[["ITEM",6],["MACHINE",2],["RECIPE-RESULT",4],["RECIPE",4]]';
            JSON.parse(initial).forEach((entry: string[] | number []) => {
                this.IdStore._ids.set(entry[0] as string, entry[1] as number);
            });
        }
    }
}

export default MainStore;