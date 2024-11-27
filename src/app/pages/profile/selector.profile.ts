import { GetCompositionListListener, NORMAL, StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";

export class selector extends StatefulWidget{
    inpage: number= 100;
    countries:any;
    page: number = 1;
    countriesLists:any;
    widgetDidMount(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_country", userId, this.inpage, this.page, NORMAL).subscribe((output: any)=>{
            this.countries = output;
            console.log(this.countries,"this.countries")
            this.render();
        })
    }

    addEvents(): void {
        let selector = this.getElementById("countrylist") as HTMLInputElement;
        if(selector){
            let that = this;
            that.data = selector.value;
            console.log("this is the initial data value", selector.value);
            that.notify();
            selector.onchange = () =>{
                that.data = selector.value;
                console.log(selector.value,"selector.value;")
                that.notify();
                console.log("this is the data change", that.data);
            }
        }


    }

    getHtml(): string {

        let html = "";
        html = `
        <select id="countrylist" class="myselector">
        ${this.countries?.map((opt:any)=>{
            return `
            <option value=${opt.the_country.id}>${opt.the_country.country_name}</option>
            `
        })}
        </select>`
        return html;
    }
}