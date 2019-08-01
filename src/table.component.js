import {LitElement, html, customElement, property} from 'lit-element';

@customElement('tably-component')
export class TableComponent extends LitElement {

    constructor() {
        super();
    }

    @property({type: Array})
    columns = [];

    @property({type: Array})
    rows = [];

    render() {
        return html`
            <header>${renderColumns(this.columns)}</header>
            <main>${renderRows(this.rows, this.columns)}</main>
            <footer>
                <slot name="tably-footer"></slot>
            </footer>
        `
    }
}

function resolveDisplayValue(value, column) {
    if (!column || typeof column.displayWith !== 'function') {
        return value;
    }

    return column.displayWith(value);
}

function renderColumns(columns) {
    return columns.map(c => html`
        <slot name="${c.prop}"></slot>
    `);
}

function renderRows(rows, columns) {
    return rows.map(row => {
        return columns.map(column => renderCell(column, row));
    });
}

function renderCell(column, row) {
    return html`<slot slot-value="${resolveDisplayValue(row[column.prop], column)}" name="tably-cell-${column.prop}">${resolveDisplayValue(row[column.prop], column)}</slot>`
}