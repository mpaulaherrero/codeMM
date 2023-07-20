import { LitElement, html, css } from 'lit';

export class MMMainGame extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
            }

            div {
                margin: 0;
                padding: 0;
                border: 0;
            }

            .message {
                height: 2.5rem;
                padding: 0.5rem 0;
                width: 250px;
                overflow-y: hidden;
                font-size: 0.8rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .box-left {
                position: relative;
                margin: 0px 10px 10px 0;
                float: left;
                overflow: hidden;
            }

            @media screen and (max-width: 600px) {
                .box-left {
                    float: none;
                }
            }
        `
    ];

    static properties= {
        game: { type: Object, reflect: true },
    }

    firstUpdated(){
        this.boardComponent = this.shadowRoot.querySelector('mm-board');
        this.dialogComponent = this.shadowRoot.querySelector('mm-dialog');
        this.dialogComponent.writeWelcome();
    }

    render() {
        return html`<div class="message">
                        <mm-dialog></mm-dialog>
                    </div>
                    <div class="box-left">
                        <mm-board
                            .board=${this.game.getBoard()}
                            @mm-game-check-end=${this.checkEnd}
                        ></mm-board>
                    </div>`;
    }

    set(game){
        this.game=game;
        this.boardComponent.set(this.game.getBoard());
    }

    checkEnd(){
        this.game.setResult();
        if(this.game.checkEnd()){
            this.#writeFinish();
        } else {
            this.#dispatchCustomEvent('mm-dialog-new-combination');
            this.boardComponent.getProposedCombination();
        }
    }

    #writeFinish(){
        if(this.game.getBoard().isLastProposedCombinationAWinner()){
            this.#dispatchCustomEvent('mm-dialog-you-won');
            this.boardComponent.displayWinnerLine();
        } else{
            if(this.game.getBoard().isComplete()){
                this.#dispatchCustomEvent('mm-dialog-you-lost');
            }
        }
    }

    #dispatchCustomEvent(name){
        this.dispatchEvent(new CustomEvent(name, {
            bubbles: true, composed: true
        }));
    }

}
customElements.define('mm-game', MMMainGame);
