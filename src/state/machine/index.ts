import {Machine} from "../../type/component/machine";
import {action, computed, makeAutoObservable, observable} from "mobx";
import {MainStore} from "../index";
import IdStore from "../id";
import {IdTypes} from "../../type/common/id/types";

export class MachinesStore
{
    _items: Map<string, Machine> = new Map<string, Machine>();
    _IdStore: IdStore;
    _newItemName: string = "";
    _canCreateNewItem: boolean = false;
    _createNewItemButtonClicked: boolean = false;

    private saveState(): void {
        let items = JSON.stringify(Array.from(this._items.values()));
        localStorage.setItem(IdTypes.MACHINE, items);
    }

    constructor(globalStore: MainStore) {
        this._IdStore = globalStore.IdStore;

        makeAutoObservable(this, {
            _items: observable,
            _newItemName: observable,
            _createNewItemButtonClicked: observable,
            addItem: action,
            createNewItemButtonClicked: action,
            removeMachine: action,
            onNewItemNameChange: action,
            canCreateNewItem: computed,
            getNewItemName: computed
        });
    }

    addItem(machine: Machine): void {
        this._items.set(machine.id, machine);
        this._IdStore.updateNextId(IdTypes.MACHINE);
        this.saveState();
    }

    getMachine(id: string): Machine {
        return this._items.get(id) ?? {} as Machine;
    }

    getMachines(): Machine[] {
        let machines: Machine[] = [];
        this._items.forEach(function (value: Machine) {
            machines.push(value);
        });
        return machines.sort(((a, b) => a.name.localeCompare(b.name)));
    }

    removeMachine(machine: Machine): void {
        this._items.delete(machine.id);
    }

    createNewMachine(): void {
        let id: string = String(this._IdStore.getNextId(IdTypes.MACHINE));
        let newName: string = this._newItemName;
        let machine = {
            id: id,
            name: newName
        } as Machine;
        this.addItem(machine);
        this.onNewItemNameChange("");
    }

    onNewItemNameChange(newName: string): void {
        this._newItemName = newName;
        this._canCreateNewItem = this._newItemName !== "";
    }

    createNewItemButtonClicked(): void {
        this._createNewItemButtonClicked = true;
        this.createNewMachine();
    }

    get getNewItemName() {
        return this._newItemName;
    }

    get canCreateNewItem() {
        return !this._canCreateNewItem;
    }

    save(machine: Machine): void {
        this._items.set(machine.id, machine);
        this.saveState();
    }
}

export default MachinesStore;