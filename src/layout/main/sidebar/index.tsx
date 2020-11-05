import React from "react";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";

export default class LayoutSidebar extends React.Component<any, any>
{
    render() {
        return (
            <div className={styles.Sidebar}>
                <div>
                    <Link to="/item">Items</Link>
                    <Link to="/item/create">+</Link>
                </div>
                <Link to="/machine">Machines</Link>
                <Link to="/recipe">Recipes</Link>
                <Link to="/recipe-result">Recipe Results</Link>
            </div>
        );
    }
}