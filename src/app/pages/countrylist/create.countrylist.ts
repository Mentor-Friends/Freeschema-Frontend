// src/app/pages/example/create.example.ts

import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, StatefulWidget, UpdateComposition } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import countries from './constant';
export class createCountryList extends StatefulWidget{
    constructor() {
        super();
        (window as any).autoSyncfun = this.autoSyncfun;
      }
      async autoSyncfun(event:Event) {
        event.preventDefault()
        console.log(event,'Auto Sync clicked');
        let userId:number = getLocalUserId();
        let order: 1;
        await countries.map((output:any)=>{
                console.log(output,"output")
                MakeTheInstanceConceptLocal("the_country", "", true,userId,PRIVATE).then((mainconcept)=> {
                    MakeTheInstanceConceptLocal("country_name", output.name,false, userId, PRIVATE).then((concept)=>{
                        MakeTheInstanceConceptLocal("country_code", output.code, false, userId,PRIVATE).then((concept2) => {
                            CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(()=>{
                                CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(()=>{
                                    LocalSyncData.SyncDataOnline();
                                })
                            })
                        });
                    });
                });
        })
      }
    /**
     * These are the events that user adds. These could be any thing like populating the data to creating the data
     * 
     */
    addEvents(): void {
        let userId:number = getLocalUserId();
        let order: 1;
        let countryCode = this.getElementById("country_code") as HTMLInputElement;
        let countryName = this.getElementById("country_name") as HTMLInputElement;
        let id = this.getElementById("id") as HTMLInputElement;
        if(this.data){
            countryCode.value = this.data.countryCode;
            countryName.value = this.data.countryName;
            id.value = this.data.id;
        }
        let submitButton = this.getElementById("submit");
        if(submitButton){
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();
    
                if(id.value){
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "country_code":countryCode.value,
                        "country_name":countryName.value
                    }
                    UpdateComposition(patcherStructure);
                }
                else{
                    MakeTheInstanceConceptLocal("the_country", "", true,userId,PRIVATE).then((mainconcept)=> {
                        MakeTheInstanceConceptLocal("country_code", countryCode.value,false, userId, PRIVATE).then((concept)=>{
                            MakeTheInstanceConceptLocal("country_name", countryName.value, false, userId,PRIVATE).then((concept2) => {
                                CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(()=>{
                                    CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(()=>{
                                        LocalSyncData.SyncDataOnline();
                                    })
                                })
                            });
                        });
                    });
                }
    
    
                console.log("submit button clicked");
            }
        }

    }






    /**
     * This is the main html component of our creating widget.
     * @returns returns a form that takes in name and number for the phone book.
     */
     getHtml(): string {
        let html = "";
        html = `<div class="container">
        <form>
            <div>
                <input type= number id=id hidden>
                <div class="formbody">
                    <label> Country Code </label>
                    <input  type = text id="country_code" placeholder="Country Code">
                </div>
                <div class="formbody">
                    <label> Country Name </label>
                    <input type = text id="country_name" placeholder="Country Name">
                </div>
                <button class=" btn btn-primary" id="submit" type=submit>Submit</button>
                <button class="btn btn-secondary" id="autoSync" type="button" onClick="autoSyncfun(event)">Auto Sync</button>
            </div>
        </form>

        </div>`
        return html;
    }
}