export default class ApRoute extends HTMLElement {

    constructor() {
        super();
        this.oldChild = null;
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        document.addEventListener('ap-navigation', e => this.onNavigation(e));
    }

    onNavigation(e) {
        const { detail } = e;
        const { type } = detail;
        if (type && type === "submenu") {
            if (this.oldChild) {
                this.root.removeChild(this.oldChild);
                this.oldChild = null;
            }
        } else {
            this.loadView(detail);
        }

    }

    async loadView({ type, link, params }) {
        const { default: View } = await import(`./views/${link}View.js`)
        let newChild = new View(params);
        //newChild.params = params; 
        if (this.oldChild) {
            this.root.replaceChild(newChild, this.oldChild);
        } else {
            this.root.appendChild(newChild);
        }
        this.oldChild = newChild;
    }
}
customElements.define('ap-route', ApRoute);