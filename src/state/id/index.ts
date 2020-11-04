import {IdStoreInterface} from "../../type/common/id";
import {IdTypes} from "../../type/common/id/types";

class IdStore implements IdStoreInterface
{
    private _ids: Map<string, number> = new Map<string, number>();

    constructor() {
        this._ids.set(IdTypes.ITEM, 1);
    }

    getNextId(type: string): number {
        return this._ids.get(type) ?? 0;
    }

    updateNextId(type: string): void {
        this._ids.set(
            type,
            this.getNextId(type)+1
        );
    }
}

export default IdStore;