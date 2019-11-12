import ApElementView from "../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import TestService from "../services/TestService.js";

export default class TestCrudView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new TestService();
        this.update = params.id !== undefined;
    }

    connectedCallback() {
        if (this.update === true) {
            this.service.find(this.params.id)
                .then(json => {
                    this.data = json;
                    this.changeView();
                    this.dataToUi(this.data);
                })
        } else {
            this.data = {};
            this.changeView();
        }
    }

    onsave(e) {
        e.preventDefault();
        this.uiToData(this.data);
        if (this.update === true) {
            this.service.update(this.data)
                .then(msg => console.log(msg));
        } else {
            this.service.create(this.data)
                .then(msg => console.log(msg));
        }
    }


    createView() {
        return html`
        <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
            <div class="pure-g">
                <div class="pure-u-1">
                    <label for="title">Titolo</label>
                    <input id="title" data-bind="title" class="pure-u-23-24" type="text" required />
                </div>
            </div>
            <input type="submit" value="Salva" class="pure-button pure-button-primary"/>
        </form>
        `;
    }

    createStyle() {
        return html``;
    }


}
customElements.define('test-crud', TestCrudView);