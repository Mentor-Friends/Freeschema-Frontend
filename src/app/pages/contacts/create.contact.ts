import { StatefulWidget } from "../../default/StatefulWidget";
import { Anomaly } from "../../services/anomaly.service";
import { validateField, validateFormData } from "../../services/validation.service";

/**
 * Example form for creating and submitting contact data and check anomaly.
 * This class extends the `StatefulWidget` to handle the dynamic rendering of the contact form and form validation.
 */
export class createContacts extends StatefulWidget{

    getHtml(): string { 
        let html = `
        <div class="container">
          <form id="contactForm">
            <div>
              <input type="number" id="id" hidden>
    
              <div class="formbody">
                <label for="name">Name (Text)</label>
                <input type="text" id="name" placeholder="Name" data-type="text" data-maxlength="50">
              </div>
    
              <div class="formbody">
                <label for="phone">Phone (Number)</label>
                <input type="text" id="phone" placeholder="Phone" data-type="number" data-maxlength="15" data-min="1000000000" data-max="9999999999">
              </div>
    
              <div class="formbody">
                <label for="document">Document</label>
                <input type="file" id="document" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" data-type="document">
              </div>
    
              <div class="formbody">
                <label for="sound">Sound</label>
                <input type="file" id="sound" accept=".mp3,.wav,.ogg,.flac" data-type="sound">
              </div>
    
              <div class="formbody">
                <label for="image">Image</label>
                <input type="file" id="image" accept=".jpg,.jpeg,.png,.gif,.bmp,.svg,.webp" data-type="image">
              </div>
    
              <div class="formbody">
                <label for="video">Video</label>
                <input type="file" id="video" accept=".mp4,.avi,.mov,.mkv,.flv,.webm" data-type="video">
              </div>
    
              <div class="formbody">
                <label for="url">URL</label>
                <input type="text" id="url" placeholder="https://example.com" data-type="url">
              </div>
    
              <div class="formbody">
                <label for="date">Date (YYYY-MM-DD)</label>
                <input type="date" id="date" placeholder="YYYY-MM-DD" data-type="date">
              </div>
    
              <div class="formbody">
                <label for="time">Time (HH:MM)</label>
                <input type="time" id="time" placeholder="HH:MM" data-type="time">
              </div>
    
              <div class="formbody">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" data-type="password">
              </div>
    
              <div class="formbody">
                <label for="ipaddress">IP Address</label>
                <input type="text" id="ipaddress" placeholder="192.168.0.1 or ::1" data-type="ipaddress">
              </div>
    
              <div class="formbody">
                <label for="uuid">UUID</label>
                <input type="text" id="uuid" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" data-type="uuid">
              </div>
    
              <button class="btn btn-primary" id="submit" type="submit">Submit</button>
            </div>
          </form>
        </div>`;
    
        return html;
    }
    
    /**
     * Adds event listeners to the form elements and handles form submission.
     * Validates the form data and checks for anomalies in the input data.
     * 
     * @returns {void} This method does not return anything.
     */
    addEvents(): void {
        // Get the contact form element
        const contactForm = document.getElementById("contactForm") as HTMLFormElement;
    
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
          
            // Gather form data, mapping each field's value and data type
            const formData = {
                name: {
                    dataType: "text",
                    value: (document.getElementById("name") as HTMLInputElement).value
                },
                phone: {
                    dataType: "number",
                    value: (document.getElementById("phone") as HTMLInputElement).value
                },
                document: {
                    dataType: "document",
                    value: (document.getElementById("document") as HTMLInputElement).value
                },
                sound: {
                    dataType: "sound",
                    value: (document.getElementById("sound") as HTMLInputElement).value
                },
                image: {
                    dataType: "image",
                    value: (document.getElementById("image") as HTMLInputElement).value
                },
                video: {
                    dataType: "video",
                    value: (document.getElementById("video") as HTMLInputElement).value
                },
                url: {
                    dataType: "url",
                    value: (document.getElementById("url") as HTMLInputElement).value
                },
                date: {
                    dataType: "date",
                    value: (document.getElementById("date") as HTMLInputElement).value
                },
                time: {
                    dataType: "time",
                    value: (document.getElementById("time") as HTMLInputElement).value
                },
                password: {
                    dataType: "password",
                    value: (document.getElementById("password") as HTMLInputElement).value
                },
                ipaddress: {
                    dataType: "ipaddress",
                    value: (document.getElementById("ipaddress") as HTMLInputElement).value
                },
                uuid: {
                    dataType: "uuid",
                    value: (document.getElementById("uuid") as HTMLInputElement).value
                }
            };
            
            // Validate form data
            const errors = validateFormData(formData);
            console.log("Contact Forms:", formData);
            console.log("Form Errors:", errors);

            // // Get the name from the form data for one field anomaly detection
            const name = formData.name.value;
            const anomaly_instance = new Anomaly()
            const res = anomaly_instance.checkConceptAnomaly('name', name);
            console.log("Result of check : ", res);
            
            // Collect the form data for anomaly detection in Bulk
            const instanceData: Record<string, string> = {}; // Define instanceData as a Record with string keys and string values
            for (const key in formData) {
              if (formData.hasOwnProperty(key)) {
                  const { dataType, value } = formData[key as keyof typeof formData];
                  // Add dataType and value to instanceData
                  instanceData[key] = value;
                  // console.log(`Key: ${key}, DataType: ${dataType}, Value: ${value}`);
              }
            }
            
            // Perform anomaly detection for the form data
            (async () => {
              try {
                // Assuming checkAnomalyInBulk is a static method of the Anomaly class
                const anomalies = await Anomaly.checkAnomalyInBulk(instanceData);
                console.log("Anomaly Check Result:", anomalies);
              } catch (error) {
                  console.error("Anomaly check failed:", error);
              }
            })();
            
        });
    }
    

}