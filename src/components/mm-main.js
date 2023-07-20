import { LitElement, html, css } from 'lit';
import './mm-dialog';
import './mm-players-selector';
import './mm-board';
import './mm-game';
import './mm-result';
import './mm-combination';

import { Game } from '../models/Game.mjs'

export class MMMain extends LitElement {
    #game

    DEFAULT_PLAYERS = 1;

    static styles = [
        css`
            :host {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
            }

            div, h1, span {
                margin: 0;
                padding: 0;
                border: 0;
            }

            h1 {
                line-height: 1;
            }

            #container {
                position: absolute;
                left: 50%;
                margin-top: 20px;
                margin-left: -155px;
                display: flex;
                flex-wrap: wrap;
            }

            .header-text {
                font-size: 1.8rem;
                font-weight: bold;
                width: 100%;
            }

            .header-text span {
                color:#DC143C;
            }

            .box-right {
                margin-bottom: 10px;
                float: left;
                width: 140px;
                padding-top: 57px;
            }

            @media screen and (max-width: 600px) {
                #container {
                    margin: 0;
                    top: 10px;
                    left: 15%;
                    padding: 0 5px;
                    display: block;
                }

                .box-right {
                    display: block;
                    float: none;
                    padding-top: 0px;
                }
            }
        `
    ];

    constructor(){
        super();
        this.newGame(this.DEFAULT_PLAYERS);
    }

    render() {
        return html`<div id="container">
            <h1 class="header-text">Master<span>mind</span></h1>
            <mm-game
                .game=${this.#game}
            ></mm-game>
            <div class="box-right">
                <div id="options">
                    <mm-players-selector
                        numPlayers=${this.DEFAULT_PLAYERS}
                        @mm-main-set-players=${this.setPlayers}
                    ></mm-players-selector>
                </div>
            </div>
        </div>`;
    }

    setPlayers(e){
        this.newGame(e.detail.numPlayers);
        this.shadowRoot.querySelector('mm-game').set(this.#game);
        document.dispatchEvent(new CustomEvent('mm-dialog-write-select-color', {
            bubbles: true, composed: true
        }));
    }

    newGame(numPlayers) {
        this.#game = new Game(numPlayers);
    }

}
customElements.define('mm-main', MMMain);
