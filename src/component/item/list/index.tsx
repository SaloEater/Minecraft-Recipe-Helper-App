import React from "react";
import {inject, observer} from "mobx-react";
import ItemsStore from "../../../state/item";
import {Item} from "../../../type/component/item";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";

class InnerItemList extends React.Component<any, any> {
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        const items: any[] = [];
        this.itemsStore.getItems().forEach((item:Item) => items.push(<Link to={"/item/"+item.id}>{item.name}</Link>));
        console.log(items);
        return (
            <div className={styles.items}>{items}</div>
        );
    }
}

export const ItemList = inject(
    "ItemsStore"
)(observer(InnerItemList));