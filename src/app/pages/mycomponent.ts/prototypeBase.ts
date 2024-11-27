// Your custom base class
class CustomBase {
    name;
    constructor(name:any) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, ${this.name}`);
    }
}

// Mixin function to add HTMLElement behavior
function HTMLElementMixin(BaseClass:any) {
    return class extends BaseClass {
        constructor(...args:any) {
            super(...args);

            // Attach HTMLElement behavior
            if (typeof HTMLElement === "function") {
                Object.setPrototypeOf(this, HTMLElement.prototype);
            }
        }
    };
}

// Create a new class combining CustomBase and HTMLElement
class MyCustomElement extends HTMLElementMixin(CustomBase) {
    connectedCallback() {
        console.log(`${this.name} connected!`);
    }
}

// Define as a custom element
// customElements.define("my-custom-element", MyCustomElement);

// // Example usage
// const element = document.createElement("my-custom-element");
// element.name = "Custom Element";
// document.body.appendChild(element); // Triggers `connectedCallback`
// element.greet(); // Logs "Hello, Custom Element"