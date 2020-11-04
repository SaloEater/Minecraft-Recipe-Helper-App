import React from "react";
import {inject, observer} from "mobx-react";
import {ItemParams} from "../../../type/page/item/ItemParams";
import {ItemsStoreInterface} from "../../../type/component/item";
import ItemsStore from "../../../state/item";

@observer
@inject("ItemsStore")
export default class ItemRecord extends React.Component<ItemParams, any> {
    itemsStore: ItemsStoreInterface;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        const id: string = this.props.id;
        const item = this.itemsStore.getItem(id);
        return (
            <div>Item: { "{id: " + item.id + ", name: " + item.name + "}" } </div>
        );
    }
}