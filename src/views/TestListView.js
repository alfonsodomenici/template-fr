import LaboratorioService from '../services/TestService.js'
import ApElementView from "../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import Paginator from "../Paginator.js";
import TestService from '../services/TestService.js';
import SearchPosts from './SearchPosts.js';

export default class TestListView extends ApElementView {

    constructor() {
        super({});
        this.service = new TestService();
        this.criteria = {
            tipo: '',
            denominazione: '',
            start: 0,
            pageSize: this.pageSize
        }
    }

    connectedCallback() {
        this.loadData();
    }

    onSearch(e) {
        this.detail = e.detail
        this.criteria = e.detail;
        this.criteria.start = 0;
        this.criteria.pageSize = this.pageSize;
        this.loadData();
    }

    loadData() {
        this.service.all(this.criteria)
            .then(json => {
                //this.count = json.size;
                this.count = 100;
                this.data = json;
                this.changeView();
            });
    }

    onRowClick(e, id) {
        this.selected = this.data.find(v => v.id === id);
        const old = this.root.querySelector("tr.selected");
        const selRow = this.root.querySelector(`[row-key="${id}"]`);
        //this.params = { ...this.params, id: id, uri: this.selected.link.uri };
        this.params = { ...this.params, id: id };
        console.log(this.params);
        if (old) {
            old.classList.toggle('selected');
        }
        selRow.classList.toggle('selected');
        this.changeView();
    }

    onPageChange(e) {
        let currentPage = e.detail.cur;
        this.criteria.start = this.criteria.pageSize * currentPage;
        this.loadData();
    }

    onCreate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'TestCrud',
            params: {}
        })
    }

    onUpdate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'TestCrud',
            params: { id: this.params.id }
        })
    }

    onDelete(e) {
        e.preventDefault();
        this.service.delete(this.selected.id).then(_ => {
            this.selected = null;
            this.loadData();
        });
    }

    /**
     * permission
     */

    checkCreateDisabled() {
        return false;
    }

    checkUpdateDisabled() {
        return this.selected === undefined ;
    }

    checkDeleteDisabled() {
        return this.selected === undefined ;
    }

    checkApparecchiatureDisabled() {
        return this.selected === undefined ;
    }

    checkDominiDisabled() {
        return this.selected === undefined ;
    }

    createStyle() {
        return html`
            tbody > tr:hover{
                cursor: pointer;
                background: var(--hover-backgound-color,lightblue); 
            }
            tr.selected{
                background: var(--hover-backgound-color,lightblue);
            }
        `;
    }

    createView() {
        return html`
            ${this.createSearchView()}
            ${this.createDataView()}
        `;
    }

    createSearchView() {
        return html`
            <search-posts @search=${e => this.onSearch(e)}></search-posts>
        `;
    }

    createDataView() {
        return html`
        <h1>Elenco</h1>
        <table  class="pure-table pure-table-bordered">
            <thead>
                <th>id</th>
                <th>denominazione</th>
            </thead>
            <tbody>
                ${this.data.map(row => this.createRow(row))}
            </tbody>
            <tfoot>
                <tr>
                    <td >
                        <paginator-uv count="${this.count}" 
                            page="${this.pageSize}"
                            @paginator=${e => this.onPageChange(e)}>
                        </paginator-uv>
                    </td>
                    <td >
                        ${this.checkCreateDisabled() ? 
                            html`<button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary' disabled>Crea</button>`:
                            html`<button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary'>Crea</button>`
                        }
                        ${this.checkUpdateDisabled() ? 
                            html`<button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary' disabled>Modifica</button>`:
                            html`<button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary'>Modifica</button>`
                        }
                        ${this.checkDeleteDisabled() ? 
                            html`<button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary' disabled>Elimina</button>`:
                            html`<button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary'>Elimina</button>`
                        }
                        
                    </td>
                </tr>
            </tfoot>
        </table>
        `;
    }

    createRow({ id, title }) {
        return html`
            <tr row-key=${id} @click=${e => this.onRowClick(e, id)}>
                <td>${id}</td>
                <td>${title}</td>
            </tr>
       `;
    }
}
customElements.define('test-list', TestListView);