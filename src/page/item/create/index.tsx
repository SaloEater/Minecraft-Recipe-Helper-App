import React from "react";
import {ItemNewRecord} from "../../../component/item/record/create";
import {inject, observer} from "mobx-react";
import ItemsStore from "../../../state/item";

class InnerItemCreatePage extends React.Component<any, any>
{
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        return (
            <ItemNewRecord item={null} onClick={this.itemsStore.createNewItemButtonClicked}/>
        );
    }
}
export const ItemCreatePage = inject(
    "ItemsStore"
)(observer(InnerItemCreatePage));