import { LitElement, html, css } from 'lit';

export class MMDialog extends LitElement {
    WELCOME_TEXT = 'Si quieres jugar contra la máquina seleciona 4 colores diferentes, si no, cambia la opción y empieza otro juego';
    SELECT_COLORS_TEXT = `Selecciona 4 colores diferentes`;
    COLOR_REPEATED = `El color esta repetido, escoja otro`;
    FOUR_COLOR = 'No puede escoger más, son sólo 4 colores, acepte la combinación si ya terminó';
    NO_COLOR = 'No hay color para borrar, intente seleccionar un color';
    MISSING_COLORS = 'Faltan colores, tiene que escoger 4';
    NEW_COMBINATION = 'La combinación no es correcta, intenta de nuevo';
    YOU_WON = '¡¡ GANASTE !!';
    YOU_LOST = 'PERDISTE, lo sentimos, llegaste al máximo de intentos permitidos';

    static styles = [
        css`
            :host {
                display: block;
                width: 250px;
                margin: 0;
                padding: 0;
                border: 0;
            }
            p {
                margin: 0;
                padding: 0;
            }
        `
    ];

    static properties = {
        text: { type: String },
    }

    constructor(){
        super();
        window.addEventListener('mm-dialog-write-text', (e) => this.write(e.detail.message));
        window.addEventListener('mm-dialog-clean', (e) => this.write(``));
        window.addEventListener('mm-dialog-write-select-color', () => this.write(this.SELECT_COLORS_TEXT));
        window.addEventListener('mm-dialog-color-repeated', () => this.write(this.COLOR_REPEATED));
        window.addEventListener('mm-dialog-four-color', () => this.write(this.FOUR_COLOR));
        window.addEventListener('mm-dialog-no-color', () => this.write(this.NO_COLOR));
        window.addEventListener('mm-dialog-missing-colors', () => this.write(this.MISSING_COLORS));
    }

    render() {
        return html`<p>${this.text}</p>`;
    }

    writeWelcome(){
        this.write(this.WELCOME_TEXT);
    }

    write(text){
        this.text = text;
    }

    writeIfNotWelcome(text){
        if(this.text !== this.WELCOME_TEXT){
            this.write(text);
        }
    }

    writeYouWon(){
        this.write(this.YOU_WON);
    }

    writeYouLost(){
        this.write(this.YOU_LOST)
    }

    writeNewCombination(){
        this.write(this.NEW_COMBINATION);
    }

}
customElements.define('mm-dialog', MMDialog);
