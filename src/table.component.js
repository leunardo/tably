import {LitElement, html, customElement, property} from 'lit-element';

@customElement('tably-component')
export class TableComponent extends LitElement {


    constructor() {
        super();
        renderRows = renderRows.bind(this);
        renderCell = renderCell.bind(this);
    }

    @property({type: Array})
    columns = [];

    @property({type: Array})
    rows = [];

    @property({type: Array})
    mobileConstraintWidth = 600;

    @property({type: Boolean})
    horizontalScroll;

    get styles () {
        return html`<style>
            table {
                border-collapse: collapse;
                border: 1px solid #ccc;
                width: 100%;
            }
            
            table tr {
                background-color: #f8f8f8;
                border: 1px solid #ddd;
                padding: .35em;
            }
            
            table th,
            table td {
                padding: .625em;
                text-align: center;
            }
            
            main {
                overflow-x: ${this.horizontalScroll ? 'auto' : 'inherit'};
            }

            @media screen and (max-width: ${this.mobileConstraintWidth + 'px'})  {
                table {
                    border: 0;
                }
                table thead {
                    border: none;
                    display: none;
                    overflow: hidden;
                    position: absolute; 
                }
                table tr {
                    border-bottom: 3px solid #ddd;
                    display: block;
                    margin-bottom: .625em;
                }
                table td {
                    border-bottom: 1px solid #ddd;
                    display: block;
                    font-size: .8em;
                    text-align: right;
                }
                table td::before {
                    content: attr(data-label);
                    float: left;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                table td:last-child {
                    border-bottom: 0;
                }
                main {
                    overflow-x: inherit;
                }
            }
        </style>`;
    }

    render() {
        return html`
            ${this.styles}
            <main class="tably-wrapper">
                <table>
                    <thead>
                        <tr>${renderColumns(this.columns)}</tr>
                    </thead>
                    <tbody>
                      ${renderRows(this.rows, this.columns)}  
                    </tbody>
                    <tfoot>
                        <slot name="tably-footer"></slot>
                    </tfoot>
                </table>
            </main>
        `;
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
        <th class="tably-col">
            <slot name="${c.prop}">${c.name}</slot>
        </th>
    `);
}

function renderRows(rows, columns) {
    return rows.map(row => html`
        <tr class="tably-row">
            ${columns.map(column => renderCell(column, row))}
        </tr>
    `);
}

function renderCell(column, row) {
    return html`
        <td data-label="${column.name}" class="tably-cell">
            ${resolveDisplayValue(row[column.prop], column)}
        </td>`;
}