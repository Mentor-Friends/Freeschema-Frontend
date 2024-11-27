import { StatefulWidget } from "mftsccs-browser";

// Base class for HTML element behavior
class HTMLElementWrapper extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<p>Hello World</p> <h3>hello ${this.getAttribute('name')}</h3>`;
  }
}

// Class for StatefulWidget behavior
class StatefulWidgetWrapper extends StatefulWidget {
  getHtml(): string {
    return `
      <h2>This is the main component</h2>
      <my-component name="shubham"></my-component>
    `;
  }
}

// Hybrid class combining both elements
export class MyCustomElement extends HTMLElementWrapper {
  private stateWidget: StatefulWidgetWrapper;

  constructor() {
    super();
    this.stateWidget = new StatefulWidgetWrapper();
  }

  connectedCallback() {
    // Add the functionality of both classes
    super.connectedCallback();
    this.innerHTML += this.stateWidget.getHtml();
  }
}

// Define the custom element
customElements.define('my-custom-element', MyCustomElement);

export default MyCustomElement;
