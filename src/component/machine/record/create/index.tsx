import React, {ChangeEvent} from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import MachinesStore from "../../../../state/machine";

class InnerMachineNewRecord extends React.Component<any, any> {
    machinesStore: MachinesStore;

    constructor(props: any) {
        super(props);
        this.machinesStore = props.MachinesStore;
    }

    render() {
        return (
            <div className={styles.items}>
            Describe the machine:
            <textarea
                value={this.machinesStore.getNewItemName}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>this.machinesStore.onNewItemNameChange(e.target.value)}
            />
            <button
                onClick={() => this.machinesStore.createNewItemButtonClicked()}
                disabled={this.machinesStore.canCreateNewItem}
            >Save</button>
            </div>
        );
    }
}

export const MachineNewRecord = inject(
    "MachinesStore"
)(observer(InnerMachineNewRecord));