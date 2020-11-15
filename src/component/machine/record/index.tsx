import React from "react";
import MachinesStore from "../../../state/machine";
import {inject, observer} from "mobx-react";
import {MachineParams} from "../../../type/page/machine/MachineParams";
import {MachineNewRecord} from "./create";

@observer
@inject("MachinesStore")
export default class MachineRecord extends React.Component<MachineParams, any>
{
    MachinesStore: MachinesStore;

    constructor(props: any) {
        super(props);
        this.MachinesStore = props.MachinesStore;
    }

    render() {
        const id = this.props.id;
        const machine = this.MachinesStore.getMachine(id);
        const onClick = () => {
            machine.name = this.MachinesStore.getNewItemName;
            this.MachinesStore.save(machine);
        }
        return (
            <MachineNewRecord machine={machine} onClick={onClick}/>
        );
    }
}