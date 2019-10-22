import { LitElement, html, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';
export class ConfirmationAnimatedDialog extends LitElement{
    static get properies(){
        return {
            open: {
            type: Boolean,
            attribute: "open",
            reflect: true
        },
        headline: {
            type: String,
            attribute: "headline",
            reflect: true
        },
        content: {
            type: String,
            attribute: "content",
            reflect: true
        },
        buttons:{
            type: Boolean,
            attribute: "buttons",
            reflect: true
        },
        yes: {
            type: String,
            attribute: "yes",
            reflect: true
        },
        no: {
            type: String,
            attribute: "no",
            reflect: true
        }
    }
    };
    static get styles(){
        return[css `
            :host{
                width: auto;
                height: auto;
                margin: 0;
                padding: 0;
                z-index:999;
                color: var(--general-text-color, black);
            }
            #header, #content, #buttons {
    opacity: 0;
    animation: bringUp .4s forwards;
} 
            #back {
                position: fixed;
                top: 0;
                left: 0;
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100vh;
                background-color: var(--background-color, rgba(0,0,0, 0.5));
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: scroll;
            }
            #modal {
                background-color: var(--dialog-background-color, white);
                width: 20rem;
                height: max-content;
                border-radius: 2%;
                box-shadow: 1rem .4rem 3rem rgba(0,0,0,0.6);
                padding: var(--general-padding, 2rem);
                display: flex;
                flex-direction: column;
                font-family: sans-serif;
                transform: scale(.2);
                animation: comeUp .5s forwards;
                margin-top: -8rem;
         
            }
            @keyframes comeUp {
                to{
                    transform: scale(1);
                }
            }
            #content{
                flex-grow: 1;
                margin-bottom: var(--general-padding, 2rem);
                animation-delay: .5s;
            }
            #buttons{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-content: space-between;
                align-items: space-between;
                animation-delay: .8s;
            }
#header {
    text-align: center;
    animation-delay: .2s;
}


button{
    background-color: white;
    border: none;
    box-shadow: none;
    padding: .5rem;
    width: 40%;
    background-color: var(--yes-button-background-color, #50DDF0);
     font-size: 120%;
color: var(--yes-button-text-color, white);
}
button:focus {
    outline: 1px solid gray;
}
#no {
    background-color: var(--no-button-background-color, #E2E5FE);
    color: var(--no-button-text-color, black);
}
#close {
    position: absolute;
    top: var(--close-button-top, 1.5rem);
    right: var(--close-button-right, 1rem);
    color: var(--close-button-text-color, rgba(0,0,0, 0.4));
    cursor: pointer;
  border: none;
  width: max-content;
  background-color: var(--dialog-background-color, white);
}
#close:hover{
    color: var(--close-button-text-color-hover, black);
}
#close:focus{
    outline:  1px solid blue;
}
@keyframes bringUp{
    to {
        opacity: 1;
    }
}

@media only screen and (max-width: 400px){
    #modal{
        width: 14rem;
    }
}
            `
        ]
    };
    
    constructor(){
        super();
        this.open = true;
        this.prevFocus = null;
        this.buttons = true;
        this.yes = "Yes";
        this.no = "No";
    }
    firstUpdated(){
        super.firstUpdated();
        this.prevFocus = document.activeElement;
        if(this.buttons){
        this.shadowRoot.querySelector("#no").focus();}
        else{
            this.shadowRoot.querySelector("#close").focus();
        }
        let buttons = this.shadowRoot.querySelector("#buttons");
        buttons.addEventListener("focusin", this.trap.bind(this));
        buttons.addEventListener("focusout", this.untrap.bind(this));   
    }
    
hide(e){
    e.preventDefault();
let response;
switch(e.target.textContent){
    case "x":
        response = false;
        break;
    case this.yes:
        response = true;
        break;
    case this.no:
        response = false;
}
    this.dispatchEvent(new CustomEvent('answer', { bubbles: true, detail: { text: () => response,  focused: () => this.prevFocus} }));
    this.open = false;
    this.style.display = "none";
}
connectedCallback(){
    super.connectedCallback();
    if(this.open){
        this.style.display = "block";
    }
    else{
        this.style.display = "none";
    }
}
jumpToTheEnd(){
    this.shadowRoot.querySelector("#yes").focus();
}
jumpToStart(){
    this.shadowRoot.querySelector("#close").focus();
}
trap(){
   this.shadowRoot.querySelector("#start").tabIndex = 0;
    this.shadowRoot.querySelector("#stop").tabIndex = 0;
}
untrap(){
    this.shadowRoot.querySelector("#start").tabIndex = -1;
    this.shadowRoot.querySelector("#stop").tabIndex = -1;
}
    render(){
        return html`
        <div id="back">
         
        <div id="modal" role="dialog" aria-labelledby="header" aria-describedby="content">
        <h1 id="header">${this.headline}</h1>
        <p id="content">${this.content}</p>
        <div id="start" @focusin="${this.jumpToTheEnd}" tabindex="-1"></div>
        <div id="buttons">
        <button id="close" @click="${this.hide}">x</button>
       ${this.buttons ? html `
       <button id="no" @click="${this.hide}">${this.no}</button>
        <button id="yes" @click="${this.hide}">${this.yes}</button>
        </div>` :html ` <button style="width: 100%" id="yes" @click="${this.hide}">${this.yes}</button>
        </div>`}
        <div id="stop" @focusin="${this.jumpToStart}" tabindex="-1"></div>
    </div>

    </div></div>
        `
    }

}
customElements.define("confirmation-animated-dialog", ConfirmationAnimatedDialog);

export async function showModal(headline, content, buttons=true, yes="Yes", no="No") {
    const $dialog = await new ConfirmationAnimatedDialog();
    document.body.appendChild($dialog); 
    $dialog.open = true;
    $dialog.headline = headline;
    $dialog.content = content;
    $dialog.buttons = buttons;
    $dialog.yes = yes;
    $dialog.no = no;
    window.addEventListener("answer", e =>{ e.detail.focused().focus();})
    return $dialog;
}