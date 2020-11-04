import React from "react";
import {inject, observer} from "mobx-react";

@observer
@inject("ItemsStore")
export default class ItemList extends React.Component<any, any> {
    render() {
        return (
            <div>Item list</div>
        );
    }
}