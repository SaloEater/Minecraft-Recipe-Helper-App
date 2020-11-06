import React from "react";
import MachinesStore from "../../../state/machine";
import {Machine} from "../../../type/component/machine";
import {inject, observer} from "mobx-react";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";

class InnerMachineList extends React.Component<any, any>
{
    MachinesStore: MachinesStore;

    constructor(props: any) {
        super(props);
        this.MachinesStore = props.MachinesStore;
    }

    render() {
        const items: any[] = [];
        this.MachinesStore.getMachines().forEach(
            (machine: Machine) => items.push(<Link to={"/machine/"+machine.id}>{machine.name}</Link>)
        );
        console.log(items);
        return (
            <div className={styles.items}>{items}</div>
        );
    }
}

export const MachineList = inject(
    "MachinesStore"
)(observer(InnerMachineList));