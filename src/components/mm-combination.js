import { LitElement, html, css } from 'lit';
import { Color } from '../types/Color.mjs'

export class MmCombination extends LitElement {

    #options

    static styles = [
        css`
            :host {
                display: block;
                margin-top: 10px;
            }

            table, tbody, tr, td {
                margin: 0;
                padding: 0;
                border: 0;
            }

            table {
                margin-bottom: 7px;
            }

            #combination td {
                position: relative;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                vertical-align: top;
            }

            #coin {
                position: absolute;
                display: none;
                left: 0px;
                top: 0px;
                width: 41px;
                height: 41px;
                border-radius: 50%;
            }

            .tokenR-coin {
                border-radius: 50%;
                background: #DC143C;
            }

            .tokenY-coin {
                border-radius: 50%;
                background: #DBB414;
            }

            .tokenG-coin {
                border-radius: 50%;
                background: #14dbb4;
            }

            .tokenB-coin {
                border-radius: 50%;
                background: #143cdb;
            }

            .tokenM-coin {
                border-radius: 50%;
                background: #db14d1;
            }

            .tokenC-coin {
                border-radius: 50%;
                background: #db8214;
            }

        `
    ];

    constructor(){
        super();
        this.options = Color.colorsCodeToString().split("");
    }

    render() {
        return html`<table  id="combination">
            <tbody  @click=${this.doClickCell}>
                <tr>
                    ${this.options.map( token => html`
                            <td class="coin token${token.toUpperCase()}-coin"></td>
                    `)}
                </tr>
            </tbody>
        </table>
        <button @click=${this.doAccept}>Aceptar Combinación</button>
        <button @click=${this.doDelete}>Borrar Último</button>`;
    }

    doClickCell(e){
        this.dispatchEvent(new CustomEvent('mm-board-set-color', {
            bubbles: true, composed: true,
            detail: { color: this.options[e.target.cellIndex] }
        }));
    }

    doAccept(){
        this.dispatchEvent(new CustomEvent('mm-board-accept-combination', {
            bubbles: true, composed: true
        }));
    }

    doDelete(){
        this.dispatchEvent(new CustomEvent('mm-board-delete-last-color', {
            bubbles: true, composed: true
        }));
    }
}

customElements.define('mm-combination', MmCombination);
