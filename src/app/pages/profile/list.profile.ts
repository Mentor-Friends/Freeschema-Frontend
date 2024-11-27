import {
  BinaryTree,
  DATAID,
  DeleteConceptById,
  GetComposition,
  GetCompositionListListener,
  GetLinkListListener,
  NORMAL,
  SearchQuery,
  SearchStructure,
  StatefulWidget,
} from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";

export class ListProfile extends StatefulWidget {
  elements!: HTMLElement;
  tasklist: any = [];
  inpage: number = 10;
  page: number = 1;
  innerHTML:any

  constructor() {
    super();
    (window as any).profileList = this.profileList;
    this.element = document.createElement('div'); // Create a new div element
    this.element.classList.add('profile-list');   // Add a class to the div

  }

  connectedCallback() {
    this.innerHTML = `<p>Hello World</p> <h3>hello ${this.getAttribute('name')}</h3>`;
    const data=this.getElementById('test')
    data?.appendChild(this.innerHTML)
    }
  profileList(param: any) {
    console.log(param);
    let singleProfile = GetComposition(param);
    console.log(singleProfile, "sasasas");
    let that = this;
    that.data = {
      id: "param",
      name: "singleProfile?.the_profile?.name",
      address: "singleProfile?.the_profile?.address",
      country_id: 101495731,
    };
    that.notify();
  }
  widgetDidMount(): void {
    let searchStructure: SearchStructure = new SearchStructure();
    searchStructure.composition = "the_profile";
    searchStructure.inpage = this.inpage;
    searchStructure.page = this.page;

    let searchQuery: SearchQuery = new SearchQuery();
    searchQuery.fullLinkers = ["the_profile_country"];

    GetLinkListListener(searchStructure, [searchQuery], "", NORMAL).subscribe(
      (output: any) => {
        this.tasklist = output;
        console.log("this is the output of the list listener", this.tasklist);
        this.render();
      }
    );
  }

  addEvents(): void {
    this.tasklist.map((output: any, i: any) => {
      let edit: any = this.getElementById(`editProfile${i + 1}`);
      let that = this;
      edit.onclick = () => {
        console.log("click");
        that.data = {
          id: output.the_profile.id,
          name: output.the_profile.name,
          address: output.the_profile.address,
          country_id:
            output?.the_profile?.the_profile_country[0].the_country.id,
        };
        that.notify();
      };
    });
  }
  getHtml(): string {
    let html = "";

    html = `<div>
        <table>
        <thead>
          <tr>
              <th>name</th>
              <th>Description</th>
              <th>Contact Person</th>
              <th>Delete</th>
              <th>Edit</th>
          </tr>
        </thead>
        <tbody id= mainbody>
           
            ${this.tasklist.map((output: any, index: any) => {
              return `
                <tr>
                 <td>${output?.the_profile?.name}</td>
                 <td>${output?.the_profile?.address}</td>
                 <td>${
                   output?.the_profile?.the_profile_country[0]?.the_country
                     ?.country_name
                 }</td>
                <td><button id="editProfile${index + 1}" onclick="profileList(${
                output?.the_profile?.id
              })">Edit</button></td>
                 <td><button>Delete</button></td>
                </tr> `;
            })}
           
           
        </tbody>
        </table>
        <div id="test"></div>
        </div>`;
    return html;
  }
}
