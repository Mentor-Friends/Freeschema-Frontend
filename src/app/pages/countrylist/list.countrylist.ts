import { BinaryTree, DATAID, DeleteConceptById, GetCompositionListListener, GetLinkListListener, NORMAL, SearchQuery, SearchStructure, StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";

export class listCountries extends StatefulWidget{
    countrylist: any = [];
    inpage: number= 20;
    page: number = 1;
    linker: string = "console_folder_s";

    constructor() {
        super();
        (window as any).deleteConnection = this.deleteConnection;
      }
    
    deleteConnection(id:number){
        if(id){
            DeleteConceptById(id).then(()=>{
                console.log("this is the delete notify");
                window.location.assign('/country-lists')
              });

    } 
} 
    widgetDidMount(): void {

        // let searchStructure: SearchStructure = new SearchStructure();
        // searchStructure.composition = "the_country";
        // searchStructure.inpage = this.inpage;
        // searchStructure.page = this.page;


        // let searchQuery: SearchQuery = new SearchQuery();
        // searchQuery.fullLinkers = ["the_task_contact"];
        let userId:number = getLocalUserId();
        GetCompositionListListener("the_country", userId, this.inpage, this.page, NORMAL).subscribe((output: any)=>{
            this.countrylist = output;
            console.log(output,"output")
            this.render();
        })

        // GetLinkListListener(searchStructure, [searchQuery], "", NORMAL).subscribe((output: any)=>{
        //     this.countrylist = output;
        //     console.log("this is the output of the list listener", output);
        //     this.render();
        // });
    }

     getHtml(): string {
        let html = "";
        html = `<div>
        <table>
        <thead>
          <tr>
              <th>SN</th>
              <th>Country Name</th>
              <th>Country Code</th>
              <th>Delete</th>
              <th>Edit</th>
          </tr>
        </thead>
        <tbody id= mainbody>
        ${this.countrylist.map((output:any,index:number)=>{
           return `<tr>
            <td>${index+1}</td>
            <td>${output.the_country.country_name}</td>
            <td>${output.the_country.country_code}</td>
            <td><button onclick="deleteConnection(${output.the_country.id})">Delete</button></td>
            </tr>`
        })}
        </tbody>
        </table>
        
        </div>`
        return html;
    }
}