import React from "react";
import {ItemProps} from "../../type/page/item/ItemProps";
import {ItemRecord} from "../../component/item/record";
import {ItemList} from "../../component/item/list";

export default class ItemPage extends React.Component<ItemProps, any> {
    render() {
        const id = this.props.match.params.id;
        let recordImplementation = id
            ? <ItemRecord />
            : <ItemList/>;
        return (
            <div>{recordImplementation}</div>
        );
    }
}