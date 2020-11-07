import React from "react";
import {inject, observer} from "mobx-react";
import ItemsStore from "../../../state/item";
import {Link, withRouter} from "react-router-dom";
import {ItemProps} from "../../../type/page/item/ItemProps";
import styles from "./styles.module.css";


class InnerItemRecord extends React.Component<ItemProps, any> {
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        const id: string = this.props.match.params.id;
        const item = this.itemsStore.getItem(id);
        return (
            <div className={styles.Item}>
                <div>
                    Item: { "{id: "} <Link to={"/item/"+id}>{id}</Link> {", name: " + item.name + "}" }
                </div>
                <textarea
                    placeholder="Amount to craft"
                    onChange={(e) => this.itemsStore.onAmountToCraftChanged(e.target.value)}
                    value={this.itemsStore.getAmountToCraft}
                />
                <button
                    disabled={this.itemsStore.canCraft}
                    onClick={(e) => this.props.history.push('/show-recipe/'+id+'/'+this.itemsStore.getAmountToCraft)}
                >Craft</button>
            </div>
        );
    }
}

export const ItemRecord = withRouter(inject(
    "ItemsStore"
)(observer(InnerItemRecord)));