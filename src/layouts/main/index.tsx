import React, {ReactChild} from "react";
import LayoutSidebar from "./sidebar";
import styles from "./styles.module.css";

export default class MainLayout extends React.Component<any, any>
{
    render() {
        return (
            <div className={styles.Main}>
                <div className={styles.Sidebar}>
                    <LayoutSidebar/>
                </div>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}