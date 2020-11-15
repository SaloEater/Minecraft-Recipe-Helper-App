import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "mobx-react";
import reportWebVitals from './reportWebVitals';
import MainStore from "./state";

const mainStore = new MainStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider
        ItemsStore={mainStore.ItemsStore}
        IdStore={mainStore.IdStore}
        MachinesStore={mainStore.MachinesStore}
        RecipeResultsStore={mainStore.RecipeResultsStore}
        RecipesStore={mainStore.RecipesStore}
    >
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
