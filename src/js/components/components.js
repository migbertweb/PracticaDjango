import { LitElement, html } from 'lit-element';
import { create, cssomSheet } from 'twind';
const sheet = cssomSheet({
  target: new CSSStyleSheet(),
});
const { tw } = create({
  sheet,
});
export class MyInputElement extends LitElement {
  static get properties() {
    return {
      /** Label to the element */
      label: {
        type: String,
      },
      /** Set a placeholder to the input element */
      placeholder: {
        type: String,
      },
      /** Disable the input field */
      disabled: {
        type: Boolean,
      },
      /** Set initial value to the input. This property syncs to the input field value property */
      value: {
        type: String,
      },
      /** Name for this input field */
      name: {
        type: String,
      },
      /** Disable the autocomplete of the input field */
      disableAutocomplete: {
        type: Boolean,
      },
    };
  }
  constructor() {
    super();
    this.placeholder = '';
    this.label = '';
    this.value = '';
    this.disabled = false;
    this.disableAutocomplete = false;
    this.name = '';
  }
  static styles = [sheet.target];
  render() {
    return html `
      <div>
        ${this.label
          ? html`<label
              for="textField"
              class=${tw`block text-sm font-medium text-gray-700`}
            >
              ${this.label}
            </label>`
          : ''}
        <input
          type="text"
          id="textField"
          name="${this.name}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          autocomplete="${this.disableAutocomplete ? 'off' : 'on'}"
          @keypress="${this._lookForEnter}"
          @input="${this._input}"
          .value="${this.value}"
          class=${tw`px-2 py-2 transition-colors duration-150 ease-in-out border border-gray-200 rounded-sm rounded-md shadow-sm outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
        />
      </div>
    `;
  }
  /**
   * Private method to dispatch events on enter key pressed
   */
  _lookForEnter(e) {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == '13') {
      this.dispatchEvent(new CustomEvent('enter-pressed'));
    }
  }
  _input(e) {
    this.value = e.target.value;
  }
}

customElements.define('myinput-element', MyInputElement);
