import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, UpdateComposition } from "mftsccs-browser";
import { StatefulWidget } from "../../default/StatefulWidget";
import './phonebook.style.css';
import { getLocalUserId } from "../user/login.service";

export class create extends StatefulWidget {

    /**
     * These are the events that user adds. These could be any thing like populating the data to creating the data
     * 
     */
    addEvents(): void {
        let userId: number = getLocalUserId();
        let order: number = 1;  // Initialize order to 1
        let name = this.getElementById("name") as HTMLInputElement;
        let phone = this.getElementById("phone") as HTMLInputElement;
        let id = this.getElementById("id") as HTMLInputElement;

        if (this.data) {
            name.value = this.data.name;
            phone.value = this.data.phone;
            id.value = this.data.id;
        }

        let submitButton = this.getElementById("submit");
        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                // If an ID is present, we are updating an existing phonebook entry
                if (id.value) {
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "name": name.value,
                        "phone": phone.value
                    };
                    UpdateComposition(patcherStructure);
                } else {
                    // Creating a new phonebook entry
                    MakeTheInstanceConceptLocal("the_phonebook", "", true, userId, PRIVATE).then((mainconcept) => {
                        MakeTheInstanceConceptLocal("name", name.value, false, userId, PRIVATE).then((concept) => {
                            MakeTheInstanceConceptLocal("phone", phone.value, false, userId, PRIVATE).then((concept2) => {
                                CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(() => {
                                    CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(() => {
                                        LocalSyncData.SyncDataOnline();
                                    });
                                });
                            });
                        });
                    });
                }

                console.log("submit button clicked");
            };
        }
    }

    /**
     * This is the main HTML component of our creating widget.
     * @returns a form that takes in name and number for the phonebook.
     */
    getHtml(): string {
        let html = "";
        html = `
        <div class="container">
            <form>
                <div>
                    <input type="number" id="id" hidden>
                    <div class="formbody">
                        <label>Name</label>
                        <input type="text" id="name" placeholder="Enter name">
                    </div>
                    <div class="formbody">
                        <label>Phone</label>
                        <input type="number" id="phone" placeholder="Enter phone number">
                    </div>
                    <button class="btn btn-primary" id="submit" type="submit">Submit</button>
                </div>
            </form>
        </div>`;
        return html;
    }
}
