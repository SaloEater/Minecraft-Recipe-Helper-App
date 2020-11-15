import React from "react";
import {inject, observer} from "mobx-react";
import ItemsStore from "../../../state/item";
import {Link, withRouter} from "react-router-dom";
import {ItemProps} from "../../../type/page/item/ItemProps";
import styles from "./styles.module.css";
import {ItemNewRecord} from "./create";


class InnerItemRecord extends React.Component<ItemProps, any> {
    itemsStore: ItemsStore;

    constructor(props: any) {
        super(props);
        this.itemsStore = props.ItemsStore;
    }

    render() {
        const id: string = this.props.match.params.id;
        const item = this.itemsStore.getItem(id);
        const onClick = () => {
            item.name = this.itemsStore.getNewItemName;
            item.stack = Number(this.itemsStore.getNewStack);
            this.itemsStore.saveItem(item);
        }
        return (
            <div className={styles.Item}>
                <ItemNewRecord item={item} onClick={onClick}/>
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