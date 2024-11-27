import { StatefulWidget } from "mftsccs-browser";


class NewChildComponent extends StatefulWidget {
constructor(){
  super();
  const htmlelement= new HTMLElement()
  htmlelement.attachShadow({ mode: 'open' });
      const shadow = htmlelement;
      if (shadow) {
        shadow.innerHTML = `
          <style>
            p { color: green; }
          </style>
          <p>Hello from ChildrenComponent!</p>
        `;
      }
    }
}

export default NewChildComponent 
