import ItemsStore from "./item";
import IdStore from "./id";

export class MainStore {
    ItemsStore: ItemsStore;
    IdStore: IdStore;

    constructor() {
        this.IdStore = new IdStore();
        this.ItemsStore = new ItemsStore(this);
    }
}
const mainStore = new MainStore();
export default mainStore;