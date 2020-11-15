import React from "react";
import {inject, observer} from "mobx-react";
import ItemsStore from "../../../state/item";
import {Item} from "../../../type/component/item";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import {ItemLink} from "../../common/link/item";

class InnerItemList extends React.Component<any, any> {
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        const items: any[] = [];
        this.itemsStore.getItems().forEach((item:Item) => items.push(ItemLink(item)));
        return (
            <div className={styles.items}>{items}</div>
        );
    }
}

export const ItemList = inject(
    "ItemsStore"
)(observer(InnerItemList));