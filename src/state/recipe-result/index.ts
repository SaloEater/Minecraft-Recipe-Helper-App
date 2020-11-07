import {RecipeResult} from "../../type/component/recipe-result";
import {action, computed, makeAutoObservable, observable} from "mobx";
import {MainStore} from "../index";
import IdStore from "../id";
import {IdTypes} from "../../type/common/id/types";
import ItemsStore from "../item";
import MachinesStore from "../machine";

export class RecipeResultsStore
{
    _items: Map<string, RecipeResult> = new Map<string, RecipeResult>();
    _IdStore: IdStore;
    _ItemsStore: ItemsStore;
    _MachinesStore: MachinesStore;

    _selectedResultItemId: string = "";
    _selectedMachineId: string = "";
    _newRecipeAmount: string = "";
    _createNewItemButtonClicked: boolean = false;
    _canCreateNewItem: boolean = false;
    _newName: string = "";


    private save(): void {
        let items = JSON.stringify(Array.from(this._items.values()));
        localStorage.setItem(IdTypes.RECIPE_RESULT, items);
    }

    constructor(globalStore: MainStore) {
        this._IdStore = globalStore.IdStore;
        this._MachinesStore = globalStore.MachinesStore;
        this._ItemsStore = globalStore.ItemsStore;

        makeAutoObservable(this, {
            _items: observable,
            _selectedResultItemId: observable,
            _selectedMachineId: observable,
            _newRecipeAmount: observable,
            _createNewItemButtonClicked: observable,
            _newName: observable,
            addRecipeResult: action,
            createNewItemButtonClicked: action,
            removeRecipeResult: action,
            onSelectResultItem: action,
            onSelectMachine: action,
            onAmountChange: action,
            onNewNameChange: action,
            canCreateNewItem: computed,
            getSelectedResultItemId: computed,
            getSelectedMachineId: computed,
            getNewName: computed,
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
            resultItemId: this._selectedResultItemId,
            machineId: this._selectedMachineId,
            amount: Number(this._newRecipeAmount),
            name: this._newName
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
        this.updateNameAccordingly();
    }

    onSelectMachine(machined: string): void {
        this._selectedMachineId = machined;
        this.updateCreateButtonAvailability();
        this.updateNameAccordingly();
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

    get getNewName() {
        return this._newName;
    }

    private updateCreateButtonAvailability() {
        this._canCreateNewItem =
            this._selectedResultItemId !== ""
            && this._selectedMachineId !== ""
            && this._newRecipeAmount !== ""
            && this._newName !== "";
    }

    private isNumeric(str: string): boolean {
        return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    onNewNameChange(newName: string): void {
        this._newName = newName;
        this.updateCreateButtonAvailability();
    }

    private updateNameAccordingly()
    {
        const itemName = this._selectedResultItemId !== "" ? this._ItemsStore.getItem(this._selectedResultItemId).name : "";
        const machineName = this._selectedMachineId !== "" ? this._MachinesStore.getMachine(this._selectedMachineId).name : "";
        this._newName = itemName !== "" && machineName !== "" ? itemName + ' - ' + machineName : "";
    }
}

export default RecipeResultsStore;