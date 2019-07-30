import {LitElement, html, customElement, property} from 'lit-element';

@customElement('tably-component')
export class TableComponent extends LitElement {

    constructor() {
        super();
    }

    @property()
    name = 'World';

    render() {
        return html`
            <p>Hello, ${this.name}!</p>
        `
    }
}
