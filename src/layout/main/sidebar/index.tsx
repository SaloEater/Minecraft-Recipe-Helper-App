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
                <div>
                    <Link to="/machine">Machine</Link>
                    <Link to="/machine/create">+</Link>
                </div>
                <div>
                    <Link to="/recipe-result">Recipe Result</Link>
                    <Link to="/recipe-result/create">+</Link>
                </div>
                <div>
                    <Link to="/recipe">Recipe</Link>
                    <Link to="/recipe/create">+</Link>
                </div>
            </div>
        );
    }
}