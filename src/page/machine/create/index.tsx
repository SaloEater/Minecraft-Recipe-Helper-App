import React from "react";
import {MachineNewRecord} from "../../../component/machine/record/create";
import {inject, observer} from "mobx-react";
import MachinesStore from "../../../state/machine";

class InnerMachineCreatePage extends React.Component<any, any>
{
    MachinesStore: MachinesStore;

    constructor(props: any) {
        super(props);
        this.MachinesStore = props.MachinesStore;
    }

    render() {

        return (
            <MachineNewRecord machine={null} onClick={() => this.MachinesStore.createNewItemButtonClicked()}/>
        );
    }
}

export const MachineCreatePage = inject(
    "MachinesStore"
)(observer(InnerMachineCreatePage));