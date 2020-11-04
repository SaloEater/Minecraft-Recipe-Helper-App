import React from "react";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";

export default class LayoutSidebar extends React.Component<any, any>
{
    render() {
        return (
            <div className={styles.Sidebar}>
                <Link to="/item">Items</Link>
                <Link to="/machine">Machines</Link>
                <Link to="/recipe">Recipes</Link>
                <Link to="/recipe-result">Recipe Results</Link>
            </div>
        );
    }
}