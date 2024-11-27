import { StatefulWidget } from "mftsccs-browser";
// import MyCustomElement from './childComponent'
import ChildrenComponent from "./childrenComponent";
// import NewChildComponent from "./newChildComponent";
// customElements.define("children-component", ChildrenComponent as unknown as CustomElementConstructor);
customElements.define("children-component", ChildrenComponent as unknown as CustomElementConstructor);
export class MainComponent extends StatefulWidget {
widgetDidMount(): void {
    
}
    getHtml(): string {
        let html = "";
        // Insert the custom <my-component> tag into the HTML
        html = `<div id="app">
            <h2>This is the main component</h2>
            <children-component name="shubham"></children-component>
            </div>
        `;
        return html;
    }
}
