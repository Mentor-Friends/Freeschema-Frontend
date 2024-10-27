import { GetCompositionListListener, NORMAL, StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";

export class selector extends StatefulWidget{
    inpage: number= 10;
    phonebooks:any;
    page: number = 1;
    widgetDidMount(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_phonebook", userId, this.inpage, this.page, NORMAL).subscribe((output: any)=>{
            this.phonebooks = output;
            this.render();
        })
    }




    /**
     * These are the events that user adds. These could be any thing like populating the data to creating the data
     * 
     */
    addEvents(): void {
        let phonebookData = this.phonebooks;

        let selector = this.getElementById("phonelist") as HTMLInputElement;
        if(selector){
            for(let i=0 ;i< phonebookData.length; i++){
                let newElement = document.createElement("option");
                newElement.setAttribute("value", phonebookData[i].the_phonebook?.id);
                console.log("this is the new element", newElement);
                newElement.innerHTML = phonebookData[i].the_phonebook?.name;
                selector.appendChild(newElement);

            }
            let that = this;
            that.data = selector.value;
            console.log("this is the initial data value", selector.value);
            that.notify();
            selector.onchange = () =>{
                that.data = selector.value;
                that.notify();
                console.log("this is the data change", that.data);
            }
        }


    }

    /**
     * 
     * @param identifier code to get all the elements by class name inside of the component.
     * @returns 
     */
    getElementByClassName(identifier: string){
        let element = this.getComponent();
        let selectedElements: HTMLElement[] = [];
        if(element){
          let myelements = element.querySelectorAll('.'+identifier);
          myelements.forEach((element) => {
            selectedElements.push(<HTMLElement>element);
          });
        }
        return selectedElements;
      }


    getHtml(): string {

        let html = "";

        html = `
        <select id= "phonelist" class="myselector" >

        </select>`
        return html;
    }
}