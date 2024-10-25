import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, UpdateComposition } from "mftsccs-browser";
import { StatefulWidget } from "../../default/StatefulWidget";
import './todolist.style.css';
import { getLocalUserId } from "../user/login.service";

export class CreateTodo extends StatefulWidget {

    /**
     * Adds events to handle form submissions and task creation.
     */
    addEvents(): void {
        let userId: number = getLocalUserId();
        let order: number = 1;
        let taskInput = this.getElementById("task") as HTMLInputElement;
        let id = this.getElementById("id") as HTMLInputElement;

        // If editing an existing task, prepopulate the fields with data.
        if (this.data) {
            taskInput.value = this.data.task;
            id.value = this.data.id;
        }

        let submitButton = this.getElementById("submit");
        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                // If an ID is present, we are updating an existing task
                if (id.value) {
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "task": taskInput.value
                    }
                    UpdateComposition(patcherStructure).then(() => {
                        this.notify(); // Notify listeners (like TodoList) to re-render the task list
                    });
                }
                // Else, we are creating a new task
                else {
                    MakeTheInstanceConceptLocal("the_todo", "", true, userId, PRIVATE).then((mainconcept) => {
                        MakeTheInstanceConceptLocal("task", taskInput.value, false, userId, PRIVATE).then((concept) => {
                            CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(() => {
                                LocalSyncData.SyncDataOnline();  // Sync the data with the server
                                this.notify(); // Notify listeners (like TodoList) to re-render the task list
                            });
                        });
                    });
                }

                console.log("Todo submitted:", taskInput.value);
            }
        }
    }

    /**
     * Returns the HTML structure for creating a new Todo task.
     */
    getHtml(): string {
        let html = `
        <div class="container">
            <form>
                <div>
                    <input type="number" id="id" hidden>
                    <div class="formbody">
                        <label>Task</label>
                        <input type="text" id="task" placeholder="Enter your task">
                    </div>
                    <button class="btn btn-primary" id="submit" type="submit">Submit</button>
                </div>
            </form>
        </div>`;
        return html;
    }
}
