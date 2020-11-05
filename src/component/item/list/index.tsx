import React from "react";
import {inject, observer} from "mobx-react";
import ItemsStore from "../../../state/item";
import {Item} from "../../../type/component/item";
import ItemRecord from "../record";

class InnerItemList extends React.Component<any, any> {
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        const items: any[] = [];
        this.itemsStore.getItems().forEach((item:Item) => items.push(<ItemRecord id={item.id}/>));
        console.log(items);
        return (
            <div>{items}</div>
        );
    }
}

export const ItemList = inject(
    "ItemsStore"
)(observer(InnerItemList));