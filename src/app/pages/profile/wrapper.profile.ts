// src/app/pages/example/wrapper.example.ts

import { StatefulWidget } from "mftsccs-browser";
import { CreateProfile } from "./create.profile";
import { ListProfile } from "./list.profile";
import './profile.style.css'


export class profilelist extends StatefulWidget
{
    
    constructor() {
        super();
    }

   async mountChildWidgets(){
        let widget1 = this.getElementById("widget1");
        let widget2 = this.getElementById("widget2");
        let creating =new CreateProfile();
        let listing = new ListProfile();

         if(widget1){
           this.childWidgets.push(creating);
           creating.mount(widget1);
         }
         if(widget2)
         {
            listing.dataChange((value: any)=>{
                this.UpdateChildData(value, creating);
            });
            this.childWidgets.push(listing);
            listing.mount(widget2);
         }
         const host:any = document.getElementById("host");
        
         const shadowRoot = host.attachShadow({ mode: "open" });
         let template:any= document.getElementById('widget1')
         
         console.log(template,"here")
        //  const node= document.importNode(template.content,true)
         // const div = document.getElementById("widget1");
         shadowRoot.appendChild(template);
         
    }


    getHtml(): string {
        // Attached the shadow DOM to custom element
         let html = "";
        html = `
        <div id="host" class="flex-container">
                    <div id= "widget1"></div>
                </div>
        </div>        
                <div class="flex-container">
                    <div id ="widget2"></div>
                </div>`
        return html;
    }
}
