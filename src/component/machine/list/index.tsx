import React from "react";
import MachinesStore from "../../../state/machine";
import {Machine} from "../../../type/component/machine";
import {inject, observer} from "mobx-react";
import MachineRecord from "../record";

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
            (machine: Machine) => items.push(<MachineRecord id={machine.id}/>)
        );
        console.log(items);
        return (
            <div>{items}</div>
        );
    }
}

export const MachineList = inject(
    "MachinesStore"
)(observer(InnerMachineList));