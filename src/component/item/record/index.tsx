import React from "react";
import {inject, observer} from "mobx-react";
import {ItemParams} from "../../../type/page/item/ItemParams";
import ItemsStore from "../../../state/item";
import {Link} from "react-router-dom";

@inject("ItemsStore")
@observer
export default class ItemRecord extends React.Component<ItemParams, any> {
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        const id: string = this.props.id;
        const item = this.itemsStore.getItem(id);
        return (
            <div>Item: { "{id: "} <Link to={"/item/"+id}>{id}</Link> {", name: " + item.name + "}" } </div>
        );
    }
}