import React, {ChangeEvent} from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import ItemsStore from "../../../../state/item";
import {ItemEditForm} from "../../../../type/component/item/create";

class InnerItemNewRecord extends React.Component<ItemEditForm, any> {
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
        const item = this.props.item;
        if (item) {
            this.itemsStore.onNewItemNameChange(item.name);
            this.itemsStore.onNewStackChanged(String(item.stack));
        } else {
            this.itemsStore.onNewItemNameChange("");
            this.itemsStore.onNewStackChanged("");
        }
    }

    render() {
        return (
            <div className={styles.items}>
            Describe the item:
            <textarea
                placeholder="Name"
                value={this.itemsStore.getNewItemName}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>this.itemsStore.onNewItemNameChange(e.target.value)}
            />
            <textarea
                placeholder="Stack"
                value={this.itemsStore.getNewStack}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>this.itemsStore.onNewStackChanged(e.target.value)}
            />
            <button
                onClick={() => this.props.onClick()}
                disabled={this.itemsStore.canCreateNewItem}
            >Save</button>
            </div>
        );
    }
}

export const ItemNewRecord = inject(
    "ItemsStore"
)(observer(InnerItemNewRecord));