import { Concept, CreateDefaultConcept, CreateTheConnectionLocal, DeleteConnectionById, DeleteConnectionByType, GetConnectionBetweenTwoConceptsLinker, GetTheConcept, LocalSyncData, MakeTheInstanceConceptLocal, MakeTheTypeConceptLocal, PatcherStructure, PRIVATE, StatefulWidget, UpdateComposition } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import { selector } from "./selector.profile.ts";

export class CreateProfile extends StatefulWidget
{
    selectedCountries: Concept= CreateDefaultConcept();
    constructor() {
        super();
        (window as any).createProfile = this.createProfile;
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
          slot {
            color:red;
          }
          ::slotted(h1) {
            color: blue
          }
          ::slotted([slot="footer"]) {
            color: green;
          }
          main ::slotted(*) {
            color:orange
          }
        </style>
        <div>
          <header><slot name="header">Fallback content for header</slot></header>
          <main><slot>Fallback content for main</slot></main>
          <footer><slot name="footer">Fallback content for footer</slot></footer>
        </div>
        `
      }
   
    mountChildWidgets(){
        let widget1 = this.getElementById("widget1");
        let selecting =new selector();
         if(widget1){
           this.childWidgets.push(selecting);
           selecting.dataChange((value:number)=>{
              GetTheConcept(value).then(async(conceptData)=>{
                console.log(value,"value")
                  this.selectedCountries = conceptData;
                  // Convert object to string and store in localStorage
                localStorage.setItem('countriesConceptData', JSON.stringify(this.selectedCountries));
                  console.log(this.selectedCountries,"conceptData")
              })
           });
           selecting.mount(widget1);
         }    
    }
    createProfile(event:Event){
        event.preventDefault()
        let userId:number = getLocalUserId();
        const countriesConceptData:any = localStorage.getItem('countriesConceptData')
        const selectedCountries=JSON.parse(countriesConceptData)
        console.log(JSON.parse(countriesConceptData),"countriesConceptData")

        let order: 1;
          // Access form elements from event.target (the form)
        const form:any = event.target;
        // Retrieve the form field values
        const id = form.id.value;       // Hidden field (id)
        const name = form.name.value; // First Name
        const address = form.address.value; // Last Name
        const countrylist = form.countrylist.value; // Salary
        console.log(id,name,address,countrylist,"event",selectedCountries.id)
        // return;

        if(name && address && countrylist){
        MakeTheInstanceConceptLocal("the_profile", "", true,userId,PRIVATE).then((mainconcept)=> {
            MakeTheInstanceConceptLocal("name",name,false, userId, PRIVATE).then((concept)=>{
                MakeTheInstanceConceptLocal("address", address, false, userId,PRIVATE).then((concept2) => {
                    CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(()=>{
                        CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(()=>{
                            if(selectedCountries.id != 0){
                                MakeTheTypeConceptLocal("the_profile_country", 999, 999, userId). then((typeConcept)=>{
                                    CreateTheConnectionLocal(mainconcept.id, selectedCountries.id, typeConcept.id, 1000, typeConcept.characterValue, userId).then(()=>{
                                        LocalSyncData.SyncDataOnline();

                                    });
                                })
                            }
                            else{
                                LocalSyncData.SyncDataOnline();

                            }
                        })
                    })
                });
            });
        });
      }
    }
  
    addEvents(): void {
        let name = this.getElementById("name") as HTMLInputElement;
        let address = this.getElementById("address") as HTMLInputElement;
        let widget1 = this.getElementById("widget1") as HTMLInputElement;
        // let countrylist = this.getElementById("countrylist") as HTMLInputElement;
        // Set the value of the select element inside the div with id="widget1"
        let widget2 = document.querySelector('#widget1 #countrylist') as HTMLInputElement;
    
        console.log(this.data,"this.data",widget1,widget2)
        if(this.data){
            name.value = this.data.name;
            address.value = this.data.address;
            widget1.value = this.data.country_id;
            // id.value = this.data.id;
        }
    }
        /**
     * This is the main html component of our creating widget.
     * @returns returns a form that takes in name and number for the phone book.
     */
        getHtml(): string {
            let html = "";
            html = `<div class="container">
            <form onsubmit="createProfile(event)">
                <div>
                    <input type= number id=id hidden>
                    <div class="formbody">
                        <label> Name </label>
                        <input  type = text id="name" placeholder="Name">
                    </div>
                    <div class="formbody">
                        <label> Country </label>
                        <div id="widget1" class="myselector"></div>

                    </div>
                    <div class="formbody">
                        <label> Address </label>
                        <input type = text id="address" placeholder="Address">
                    </div>
                    
                    <button class=" btn btn-primary" id="submit" type=submit>Submit</button>

                </div>
            </form>
    
            </div>`
        return html;
        }
}