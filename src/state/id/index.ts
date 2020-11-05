import {IdStoreInterface} from "../../type/common/id";
import {IdTypes} from "../../type/common/id/types";

class IdStore implements IdStoreInterface
{
    _ids: Map<string, number> = new Map<string, number>();

    private save() {
        let items = JSON.stringify(Array.from(this._ids.entries()));
        localStorage.setItem(IdTypes.ID, items);
    }

    getNextId(type: string): number {
        return this._ids.get(type) ?? 0;
    }

    updateNextId(type: string): void {
        this._ids.set(
            type,
            this.getNextId(type)+1
        );
        this.save();
    }
}

export default IdStore;