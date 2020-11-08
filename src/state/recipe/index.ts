import {action, computed, makeAutoObservable, observable} from "mobx";
import {MainStore} from "../index";
import IdStore from "../id";
import {IdTypes} from "../../type/common/id/types";
import {Recipe} from "../../type/component/recipe";

export class RecipesStore
{
    _items: Map<string, Recipe> = new Map<string, Recipe>();
    _IdStore: IdStore;

    _selectedItemId: string = "";
    _selectedRecipeResultId: string = "";
    _recipeAmount: string = "";
    _createNewItemButtonClicked: boolean = false;
    _canCreateNewItem: boolean = false;

    private save(): void {
        let items = JSON.stringify(Array.from(this._items.values()));
        localStorage.setItem(IdTypes.RECIPE, items);
    }

    constructor(globalStore: MainStore) {
        this._IdStore = globalStore.IdStore;

        makeAutoObservable(this, {
            _items: observable,
            _selectedItemId: observable,
            _selectedRecipeResultId: observable,
            _recipeAmount: observable,
            _createNewItemButtonClicked: observable,
            addRecipeResult: action,
            createNewItemButtonClicked: action,
            removeRecipe: action,
            onSelectItem: action,
            onSelectRecipeResult: action,
            onAmountChange: action,
            canCreateNewItem: computed,
            getSelectedItemId: computed,
            getSelectedRecipeResultId: computed,
            getAmount: computed,
        });
    }

    addRecipeResult(recipe: Recipe): void {
        this._items.set(recipe.id, recipe);
        this._IdStore.updateNextId(IdTypes.RECIPE);
        this.save();
    }

    getRecipe(id: string): Recipe {
        return this._items.get(id) ?? {} as Recipe;
    }

    getRecipes(): Recipe[] {
        let recipe: Recipe[] = [];
        this._items.forEach(function (value: Recipe) {
            recipe.push(value);
        });
        return recipe;
    }

    removeRecipe(recipe: Recipe): void {
        this._items.delete(recipe.id);
    }

    private createNewRecipe(): void {
        let id: string = String(this._IdStore.getNextId(IdTypes.RECIPE));
        let recipe = {
            id: id,
            itemId: this._selectedItemId,
            recipeResultId: this._selectedRecipeResultId,
            amount: Number(this._recipeAmount),
        } as Recipe;
        this.addRecipeResult(recipe);
        this.onSelectItem("");
        this.onSelectRecipeResult("");
        this.onAmountChange("");
    }

    createNewItemButtonClicked(): void {
        this._createNewItemButtonClicked = true;
        this.createNewRecipe();
    }

    onSelectItem(itemId: string): void {
        this._selectedItemId = itemId;
        this.updateCreateButtonAvailability();
    }

    onSelectRecipeResult(machined: string): void {
        this._selectedRecipeResultId = machined;
        this.updateCreateButtonAvailability();
    }

    onAmountChange(newAmount: string): void {
        if (this.isNumeric(newAmount) || newAmount === ""){
            this._recipeAmount = newAmount;
            this.updateCreateButtonAvailability();
        }
    }

    get getSelectedItemId() {
        return this._selectedItemId;
    }

    get getSelectedRecipeResultId() {
        return this._selectedRecipeResultId;
    }

    get getAmount() {
        return this._recipeAmount;
    }

    get canCreateNewItem() {
        return !this._canCreateNewItem;
    }

    private updateCreateButtonAvailability() {
        this._canCreateNewItem =
            this._selectedItemId !== ""
            && this._selectedRecipeResultId !== ""
            && this._recipeAmount !== "";
    }

    private isNumeric(str: string): boolean {
        return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
}

export default RecipesStore;