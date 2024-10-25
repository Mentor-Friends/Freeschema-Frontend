import { DeleteConceptById, GetCompositionListListener, NORMAL, PatcherStructure, UpdateComposition } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import { StatefulWidget } from "../../default/StatefulWidget";
import './todolist.style.css';

export class TodoList extends StatefulWidget {
    todos: any = [];
    inpage: number = 10;
    page: number = 1;

    widgetDidMount(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_todo", userId, this.inpage, this.page, NORMAL).subscribe((output: any) => {
            this.todos = output;
            this.render();
        });
    }

    addEvents() {
        let tableElement = this.getElementById("mainbody");
        if (tableElement) {
            console.log("this is the element", tableElement);

            if (this.todos.length > 0) {
                for (let i = 0; i < this.todos.length; i++) {
                    let todo = this.todos[i].the_todo;
                    let id = todo.id;

                    if (id) {
                        let row = document.createElement("tr");
                        let col1 = document.createElement("td");
                        let col3 = document.createElement("td");
                        let col4 = document.createElement("td");

                        let name = document.createElement("span");
                        let taskInput = document.createElement("input");
                        taskInput.setAttribute('type', 'text');
                        taskInput.style.display = 'none';

                        let taskValue = todo.task || "Untitled Task";
                        name.innerHTML = taskValue;
                        taskInput.value = taskValue;

                        let edit = document.createElement("button");
                        edit.setAttribute('class', 'btn btn-primary');
                        edit.innerHTML = "Edit";

                        let save = document.createElement("button");
                        save.setAttribute('class', 'btn btn-success');
                        save.innerHTML = "Save";
                        save.style.display = 'none';

                        let del = document.createElement("button");
                        del.setAttribute('class', 'btn btn-danger');
                        del.innerHTML = "Delete";

                        del.onclick = () => {
                            DeleteConceptById(id).then(() => {
                                console.log("Todo deleted successfully");
                                // this.widgetDidMount();
                            });
                        };

                        edit.onclick = () => {
                            name.style.display = 'none';
                            taskInput.style.display = 'inline-block';
                            edit.style.display = 'none';
                            save.style.display = 'inline-block';
                        };

                        save.onclick = () => {
                            let updatedTask = taskInput.value.trim();

                            if (updatedTask) {
                                let patcherStructure: PatcherStructure = new PatcherStructure();
                                patcherStructure.compositionId = id;
                                patcherStructure.patchObject = { "task": updatedTask };

                                UpdateComposition(patcherStructure).then(() => {
                                    name.innerHTML = updatedTask;
                                    name.style.display = 'inline-block';
                                    taskInput.style.display = 'none';
                                    edit.style.display = 'inline-block';
                                    save.style.display = 'none';
                                    this.notify();
                                });
                            }
                        };

                        col1.append(name);
                        col1.append(taskInput);
                        col3.append(del);
                        col4.append(edit);
                        col4.append(save);

                        row.appendChild(col1);
                        row.appendChild(col3);
                        row.appendChild(col4);
                        tableElement.append(row);
                    }
                }
            } else {
                console.log("No todos found.");
            }
        } else {
            console.error("Table element not found.");
        }
    }

    getHtml(): string {
        return `
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody id="mainbody">
                </tbody>
            </table>
        </div>`;
    }
}
