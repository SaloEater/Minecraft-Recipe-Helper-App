import React, {ChangeEvent} from "react";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import MachinesStore from "../../../../state/machine";
import {MachineEditForm} from "../../../../type/component/machine/create";

class InnerMachineNewRecord extends React.Component<MachineEditForm, any> {
    machinesStore: MachinesStore;

    constructor(props: any) {
        super(props);
        this.machinesStore = props.MachinesStore;
        const machine = this.props.machine;
        if (machine) {
            this.machinesStore.onNewItemNameChange(machine.name);
        } else {
            this.machinesStore.onNewItemNameChange("");
        }
    }

    render() {
        return (
            <div className={styles.items}>
            Describe the machine:
            <textarea
                placeholder="Name"
                value={this.machinesStore.getNewItemName}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>this.machinesStore.onNewItemNameChange(e.target.value)}
            />
            <button
                onClick={() => this.props.onClick()}
                disabled={this.machinesStore.canCreateNewItem}
            >Save</button>
            </div>
        );
    }
}

export const MachineNewRecord = inject(
    "MachinesStore"
)(observer(InnerMachineNewRecord));