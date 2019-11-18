import ApElementView from "./../ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js";

export default class HomeView extends ApElementView{

    connectedCallback(){
        this.changeView();
    }

    createView(){
        return html`
            <h1> Home view </h1>
        `
    }

    createStyle(){
        return ``;
    }
}
customElements.define("home-view",HomeView);