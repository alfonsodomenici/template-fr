import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApElement from "../ApElement.js";

export default class SearchPosts extends ApElement {

    constructor() {
        super();
        this.oldSearch = {};
        this.visible = false;
    }

    connectedCallback() {
        this.changeView();
        this.containerElement = this.root.querySelector('#container');
        this.containerElement.style.display = 'none'
    }

    ontoggle(e) {
        this.containerElement.style.display = this.visible ? 'none' : 'block';
        this.visible = !this.visible;
        this.changeView();
    }

    createStyle() {
        return html``;
    }

    createView() {
        return html`
        <button @click=${(e) => this.ontoggle(e)} class='pure-button pure-button-primary'>${this.visible ? 'nascondi filtri' : 'visualizza filtri'}</button>
                <form id='container' method="POST" @submit=${e => this.onsearch(e)} class='pure-form pure-form-stacked'>
                    <fieldset>
                        <legend>Parametri Ricerca</legend>
                        <div class="pure-g">
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label>Utente
                                    <select name="user">
                                        <option value=''>nessun utente</option>
                                        <option value='1'>Utente1</option>
                                        <option value='2'>Utente2</option>
                                        <option value='3'>Utente3</option>
                                        <option value='4'>Utente4</option>
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1">
                                <input type="submit" class='pure-button pure-button-primary' value="Cerca" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            `;
    }

    onsearch(e) {
        e.preventDefault();
        const { user } = e.target.elements;
        if (this.isChange(user)) {
            this.dispatchEvent(new CustomEvent('search', {
                bubbles: true,
                composed: true,
                detail: {
                    user: user.value
                }
            }));
        }
    }

    isChange(user) {
        const search = {
            user: user.value
        };
        const change = JSON.stringify(this.oldSearch) !== JSON.stringify(search);
        this.oldSearch = search;
        return change;
    }
}
customElements.define('search-posts', SearchPosts);