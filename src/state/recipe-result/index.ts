import {RecipeResult} from "../../type/component/recipe-result";
import {action, computed, makeAutoObservable, observable, reaction, trace} from "mobx";
import {MainStore} from "../index";
import IdStore from "../id";
import {IdTypes} from "../../type/common/id/types";

export class RecipeResultsStore
{
    _items: Map<string, RecipeResult> = new Map<string, RecipeResult>();
    _IdStore: IdStore;

    _selectedResultItemId: string = "";
    _selectedMachineId: string = "";
    _newRecipeAmount: string = "";
    _createNewItemButtonClicked: boolean = false;
    _canCreateNewItem: boolean = false;

    private save(): void {
        let items = JSON.stringify(Array.from(this._items.values()));
        localStorage.setItem(IdTypes.RECIPE_RESULT, items);
    }

    constructor(globalStore: MainStore) {
        this._IdStore = globalStore.IdStore;
        reaction(
            () => this._selectedResultItemId,
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
                    this.createNewRecipeResult();
                }
            }
        )
        makeAutoObservable(this, {
            _items: observable,
            _selectedResultItemId: observable,
            _selectedMachineId: observable,
            _newRecipeAmount: observable,
            _createNewItemButtonClicked: observable,
            addRecipeResult: action,
            createNewItemButtonClicked: action,
            removeRecipeResult: action,
            onSelectResultItem: action,
            onSelectMachine: action,
            onAmountChange: action,
            canCreateNewItem: computed,
            getSelectedResultItemId: computed,
            getSelectedMachineId: computed,
            getAmount: computed,
        });
    }

    addRecipeResult(recipeResult: RecipeResult): void {
        this._items.set(recipeResult.id, recipeResult);
        this._IdStore.updateNextId(IdTypes.RECIPE_RESULT);
        this.save();
    }

    getRecipeResult(id: string): RecipeResult {
        return this._items.get(id) ?? {} as RecipeResult;
    }

    getRecipeResults(): RecipeResult[] {
        let recipeResults: RecipeResult[] = [];
        this._items.forEach(function (value: RecipeResult) {
            recipeResults.push(value);
        });
        return recipeResults;
    }

    removeRecipeResult(recipeResult: RecipeResult): void {
        this._items.delete(recipeResult.id);
    }

    private createNewRecipeResult(): void {
        let id: string = String(this._IdStore.getNextId(IdTypes.RECIPE_RESULT));
        let recipeResult = {
            id: id,
            resultId: this._selectedResultItemId,
            machineId: this._selectedMachineId,
            amount: Number(this._newRecipeAmount),
        } as RecipeResult;
        this.addRecipeResult(recipeResult);
        this.onSelectResultItem("");
        this.onSelectMachine("");
        this.onAmountChange("");
    }

    createNewItemButtonClicked(): void {
        this._createNewItemButtonClicked = true;
        this.createNewRecipeResult();
    }

    onSelectResultItem(itemId: string): void {
        this._selectedResultItemId = itemId;
        this.updateCreateButtonAvailability();
    }

    onSelectMachine(machined: string): void {
        this._selectedMachineId = machined;
        this.updateCreateButtonAvailability();
    }

    onAmountChange(newAmount: string): void {
        if (this.isNumeric(newAmount) || newAmount === ""){
            this._newRecipeAmount = newAmount;
            this.updateCreateButtonAvailability();
        }
    }

    get getSelectedResultItemId() {
        return this._selectedResultItemId;
    }

    get getSelectedMachineId() {
        return this._selectedMachineId;
    }

    get getAmount() {
        return this._newRecipeAmount;
    }

    get canCreateNewItem() {
        return !this._canCreateNewItem;
    }

    private updateCreateButtonAvailability() {
        this._canCreateNewItem =
            this._selectedResultItemId !== ""
            && this._selectedMachineId !== ""
            && this._newRecipeAmount !== "";
    }

    private isNumeric(str: string): boolean {
        return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
}

export default RecipeResultsStore;