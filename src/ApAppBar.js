import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import ApElementView from './ApElementView.js'

export default class ApAppBar extends ApElementView {

    constructor() {
        super();
        this.activeLink = null;
        this._appBar = {};
    }


    connectedCallback() {
        window.addEventListener('hashchange', e => this.onNavigation(e));
        fetch("./menuBar.json")
            .then(response => response.json())
            .then(json => {
                this.appBar = json;
                this.navigateToHome();
            });
    }

    navigateToHome(){
        const el = this.root.querySelector(`a[href="#Home"]`);
        el.click();
    }
    onLinkClicked(e) {
        const target = e.composedPath()[0];
        this.changeActiveLink(target);
    }

    onNavigation(e) {
        const { hash } = window.location;
        const link = this.root.querySelector(`a[href="${hash}"]`);
        if (link) {
            console.log(`appBar navigation event ${hash}`);
            this.changeActiveLink(link);
            const event = new CustomEvent(
                'ap-navigation', {
                detail: {
                    type: link.dataset.type,
                    link: hash.substring(1),
                    src: 'appbar',
                    params: {}
                },
                bubbles: true
            }
            );
            this.dispatchEvent(event);
        }
    }

    changeActiveLink(target) {
        if (this.activeLink) {
            this.activeLink.parentElement.classList.toggle('pure-menu-selected');
        }
        this.activeLink = target;
        this.activeLink.parentElement.classList.toggle('pure-menu-selected');
    }

    set appBar(value) {
        this._appBar = value;
        this.changeView();
    }

    get appBar() {
        return this._appBar;
    }

    createMenuItem({ type, url, label, icon, params, external }) {
        return html`
            <li class="pure-menu-item"><a data-type="${type}" href="${url}" class="pure-menu-link" @click=${e => this.onLinkClicked(e)}>${label}</a></li>
        `;
    }

    createView() {
        return html`
            <div class="pure-menu pure-menu-horizontal">
                <a data-type="item" href="#Home" class="pure-menu-heading pure-menu-link">${this.appBar.title}</a>
                <ul class="pure-menu-list">
                    ${this._appBar.menu.map(e => this.createMenuItem(e))}
                </ul>
            </div>
        `;
    }

    createStyle() {
        return html`
        
        `;
    }
}
customElements.define('ap-appbar', ApAppBar);
