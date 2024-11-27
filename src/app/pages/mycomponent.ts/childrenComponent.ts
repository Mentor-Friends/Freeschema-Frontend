import { Concept, StatefulWidget } from "mftsccs-browser";


function HTMLElementMixin<
  T1 extends new (...args: any[]) => {}, 
  T2 extends new (...args: any[]) => {}
>(Base1: T1, Base2: T2) {
  return class extends (Base1 as any, Base2 as any) {
    constructor(...args: any[]) {
      super(...args);
      Object.setPrototypeOf(this, Base1.prototype);
      Object.setPrototypeOf(this, Base2.prototype);
      
      console.log(Base1.prototype,"Base2.prototype",Base2.prototype,"Base2")
      // Attach shadow DOM
    //   if ("attachShadow" in Base2.prototype) {
    //     this.attachShadow({ mode: "open" });
    //   }
    }
  };
}
export class ChildrenComponent extends HTMLElementMixin(StatefulWidget, Concept) {
  inpage: any;
  page: any;
  countrylist: any;
  
  constructor() {
    super(); // Calls the constructor of StatefulWidget and HTMLElement
    // Call widgetDidMount after mounting
    // const callFromParent=document.getElementById('app')
    console.log(this,"this");
    // this.mount(callFromParent)
    //  this.attachShadow({ mode: 'open' });
      // const shadow = this.shadowRoot;
      // if (shadow) {
      //   shadow.innerHTML = `
      //     <style>
      //       p { color: green; }
      //     </style>
      //     <p>Hello from ChildrenComponent!</p>
      //   `;
      // }
    }
    // This will be called after the widget mounts (inherited from StatefulWidget)
  widgetDidMount() {
    super.widgetDidMount(); // Optional: call the parent class's widgetDidMount if needed
    console.log("ChildrenComponent has been mounted!");
    // Additional logic to run after the widget has mounted, like adding events or initializing child widgets
    this.addEvents();
  }
    connectedCallback() {
        console.log('ChildrenComponent connected to the DOM.');
        // Call the widgetDidMount method from StatefulWidget (inherited by this class)
    }
    
  }
//   customElements.define("children-component", ChildrenComponent as unknown as CustomElementConstructor);
  
  export default ChildrenComponent