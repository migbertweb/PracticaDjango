import { LitElement, html } from 'lit-element';

export class MyMessage extends LitElement {
  static get properties() {
    return {
      msg: {
        type: String,
      },
    };
  }

  render() {
    return html`
      <style>
        p {
          background-color: #ddd;
          padding: 15px;
          border-radius: 10px;
        }
      </style>
      <p>${this.msg}</p>
    `;
  }
}

customElements.define('my-message', MyMessage);
