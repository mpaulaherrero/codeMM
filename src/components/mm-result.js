import { LitElement, html, css } from 'lit';

export class MmResult extends LitElement {
    #results;

    static styles = [
        css`
            :host {
                display: block;
                margin-left: 4px;
            }
            .parent {
                border: 1px dashed #808080;
                background-color: #cbcdcc;
                display: flex;
                flex-wrap: wrap;
                border-radius: 10%;
                margin-bottom: 1px;
                margin-bottom: 1px;
            }
            .child {
                flex: 1 1 21%;
                margin: 3px;
                width: 15px;
                height: 15px;
                background-color: #cbcdcc;
                border-radius: 50%;
                border: 1px solid #808080;
            }

            .tokenB-coin {
                background: #333;
                border: 1px solid #333;
            }

            .tokenW-coin {
                background: #FFF;
                border: 1px solid #FFF;
            }
        `
    ];

    static properties = {
        result: { type: Object },
    }

    constructor(){
        super();
        this.results = [];
    }

    render() {
        this.setResult();
        return html`<div class="parent">
                ${this.results.map( token => html`<div class="child ${token}"></div>`)}
        </div>`;
    }

    setResult(){
        this.results = [];
        let total = 0;
        let blacks = (this.result)?this.result.getBlacks():0;
        let whites = (this.result)?this.result.getWhites():0;
        for(total; total < blacks; total++){
            this.results[total] = "tokenB-coin";
        }
        for(total; total < blacks + whites; total++){
            this.results[total] = "tokenW-coin";
        }
        for(total; total < 4; total++){
            this.results[total] = "";
        }
    }
}
customElements.define('mm-result', MmResult);
