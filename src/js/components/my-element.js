import { LitElement, html } from 'lit-element';
import { create, cssomSheet } from 'twind'

// This creates a twind "sheet" which is a wrapper
// around a CSS stylesheet
const sheet = cssomSheet({ target: new CSSStyleSheet() });

// This gets an instance of the tw helper for our
// stylesheet above. Meaning any time we use `tw`, it will
// append the right CSS to our custom stylesheet.
const { tw } = create({ sheet });

export class MyElement extends LitElement {
  static get properties() {
    return {
      clics: {
        type: Number,
      },
    };
  }
  static styles = [sheet.target];
  constructor() {
    super();
    this.clics = 0;
  }

  render() {
    return html `
    <div class=${tw`text-xl text-black mx-6 my-4`}>
      <h1>Componente my-counter</h1>
      <p>Clics realizados: ${this.clics}</p>
      <button @click="${this.incrementarClic}" class=${tw`bg-blue-500 hover:bg-blue-400 capitalize px-4 py-2 border rounded-sm`}>Haz click</a>
    </div>
    `;
  }

  incrementarClic() {
    this.clics += 1;
  }
}

customElements.define('my-element', MyElement);
