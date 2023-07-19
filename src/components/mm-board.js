import { LitElement, html, css } from 'lit';
import { Color } from '../types/Color.mjs'

export class MMBoard extends LitElement {

    GAME_BOARD_ID = "game_board";

    currentCombinationIndexColor;

    static styles = [
        css`
            :host {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
                font: inherit;
                font-size: 100%;
            }

            table, tbody, tr, td {
                margin: 0;
                padding: 0;
                border: 0;
            }

            #game_board{
                overflow: hidden;
                border-collapse:collapse;
            }

            #game_board td {
                position: relative;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                vertical-align: top;
            }

            #game_board td {
                border: 1px dashed #808080;
            }
            
            .userPlayer td:hover::after {
                background-color: #F4F4F4;
                content: '';
                height: 10000px;
                left: 0;
                position: absolute;
                top: -5000px;
                width: 100%;
                z-position: -1;
            }

            #coin {
                position: absolute;
                display: none;
                left: 0px;
                top: 0px;
                width: 51px;
                height: 51px;
                border-radius: 50%;
            }

            .finished td:hover::after{
                background-color: transparent !important;
            }

            #game_board tr {
                width: 100%;
                height: 100%;
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

            #result {
                border: none !important;
                border-radius: unset !important;
            }

            #game_board .win {
                border-radius: 50%;
                animation: animationFrames 1s infinite;
                -webkit-animation: animationFrames 1s infinite;
                -moz-animation: animationFrames 1s infinite;
                -o-animation: animationFrames 1s infinite;
                -ms-animation: animationFrames 1s infinite;
            }

            @keyframes animationFrames{
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-moz-keyframes animationFrames{
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-webkit-keyframes animationFrames {
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-o-keyframes animationFrames {
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-ms-keyframes animationFrames {
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }
        `
    ];

    static properties = {
        board: { type: Object },
        tokens: { type: Array, reflect: true }
    }

    constructor(){
        super();
        this.tokens = [];
        this.currentCombinationIndexColor=0;
    }

    firstUpdated(){
        this.setBoard();
        this.setSecretCombination();
        this.getProposedCombination();
    }

    render() {
        return html`<table  id="${this.GAME_BOARD_ID}">
            <tbody>
                ${this.tokens.map( (row, position) => html`
                    <tr>
                        ${row.map( token => html`
                            <td class="${token===Color.NULL?'empty':'coin token' + token.toUpperCase() + '-coin'}"></td>
                        `)}
                        <td id="result">
                            <mm-result
                                .result=${this.board.getResult(position)}
                            ></mm-result>
                        </td>
                    </tr>
                `)}
            </tbody>
        </table>
        <mm-combination
            @mm-board-set-color=${this.setColor}
            @mm-board-delete-last-color=${this.deleteLastColor}
            @mm-board-accept-combination=${this.acceptCombination}
        ></mm-combination>`;
    }

    setColor(e){
        if(this.currentCombinationIndexColor < this.board.getSecretCombination().getLength()){
            if(this.#uniqueColor(e.detail.color)){
                this.#setCurrentCombinationValue(e.detail.color);
                this.currentCombinationIndexColor ++;
                this.#dispatchCustomEvent('mm-dialog-clean');
            } else {
                this.#dispatchCustomEvent('mm-dialog-color-repeated');
            }
        } else {
            this.#dispatchCustomEvent('mm-dialog-four-color');
        }
    }

    deleteLastColor(){
        if(this.currentCombinationIndexColor > 0){
            this.currentCombinationIndexColor --;
            this.#setCurrentCombinationValue(Color.NULL.getCode());
            this.#dispatchCustomEvent('mm-dialog-clean');
        } else {
            this.#dispatchCustomEvent('mm-dialog-no-color');
        }    
    }

    acceptCombination(){
        if(this.currentCombinationIndexColor === this.board.getSecretCombination().getLength()){
            this.setBoard();
            this.#dispatchCustomEvent('mm-game-check-end');
        } else {
            this.#dispatchCustomEvent('mm-dialog-missing-colors');
        }
    }

    setBoard() {
        this.tokens = [];
        const combinationLength = this.board.getSecretCombination().getLength();
        for (let i = 0; i < this.board.getProposedCombinationsLength(); i++) {
            let proposedCombination = this.board.getProposedCombination(i);
            let proposedCombinationTokens = [];
            for (let j = 0; j < combinationLength; j++) {
                proposedCombinationTokens.push(proposedCombination.getValue()[j]);
            }
            this.tokens.push(proposedCombinationTokens);
        }
        for(let i = this.board.getProposedCombinationsLength(); i < this.board.MAX_ATTEMPTS; i++){
            let proposedCombinationTokens = [];
            for (let j = 0; j < combinationLength; j++) {
                proposedCombinationTokens.push(Color.NULL);
            }
            this.tokens.push(proposedCombinationTokens);
        }
        //console.log(this.tokens)
    }

    set(board){
        this.board = board;
        this.setBoard();
        this.setSecretCombination();
        this.getProposedCombination();
    }

    setSecretCombination(){
        this.board.getSecretCombination().accept(this);
    }

    visitRandomSecretCombination(){
        this.board.getSecretCombination().setCombination();
        console.log(`The random secret combination is ${this.board.getSecretCombination().getValue()}`);
    }

    // visitUserSecretCombination(){
    //     new CombinationView(this.#console,this.board.getSecretCombination(),`Propose a secret combination`).readValue();
    //     console.log(`The user secret combination is ${this.board.getSecretCombination().getValue()}`);
    // }

    getProposedCombination(){
        this.board.newLastProposedCombination();
        this.board.getLastProposedCombination().accept(this);
    }

    // visitRandomProposedCombination(){
    //     this.board.getLastProposedCombination().setCombination();
    // }

    visitUserProposedCombination(){
        console.log("visitUserProposedCombination");
        this.currentCombinationIndexColor=0;
        this.board.getLastProposedCombination().setValue(this.getEmptyCombination());
        //new CombinationView(this.#console,this.board.getLastProposedCombination()).readValue();
    }

    getEmptyCombination(){
        let emptyProposedCombination = "";
        for(let i=0; i< this.board.getSecretCombination().getLength(); i++){
            emptyProposedCombination += Color.NULL.getCode();
        }
        return emptyProposedCombination;
    }

    #setCurrentCombinationValue(color){
        let currentProposedCombination = this.board.getLastProposedCombination().getValue();
        currentProposedCombination = this.#getCurrentCombinationValue(currentProposedCombination, color);
        this.board.getLastProposedCombination().setValue(currentProposedCombination);
        this.setBoard();
    }

    #getCurrentCombinationValue(value, color){
        const valueArray = value.split("");
        valueArray[this.currentCombinationIndexColor] = color;
        return valueArray.join('');
    }

    #uniqueColor(color){
        let currentProposedCombination = this.board.getLastProposedCombination().getValue();
        let uniqueColor = true;
        for (let i = 0; uniqueColor && i < this.currentCombinationIndexColor; i++) {
            uniqueColor = currentProposedCombination[i] !== color;
        }
        return uniqueColor;
    }

    displayWinnerLine(){
        this.shadowRoot.getElementById(this.GAME_BOARD_ID).className = "finished";
        //inconsistencia con ultimo token puesto, se muestra pero no esta en el html el estilo
        setTimeout(function() {
            const winnerLine = this.board.getProposedCombinationsLength()-1;
            const combinationLength = this.board.getSecretCombination().getLength();
            const rows = this.shadowRoot.getElementById(this.GAME_BOARD_ID).rows;
            for (let i = 0; i < combinationLength; i++) {
                rows[winnerLine].cells[i].classList.add("win");
            }
        }.bind(this), 10);
    }

    #dispatchCustomEvent(name){
        this.dispatchEvent(new CustomEvent(name, {
            bubbles: true, composed: true
        }));
    }
}

customElements.define('mm-board', MMBoard);
