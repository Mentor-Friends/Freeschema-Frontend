import "./style.css";

import { bootup } from "./app/routes/renderRoute.service.ts";
import { init, updateAccessToken } from "mftsccs-browser";
import { environment } from "./app/environments/environment.dev.ts";
import { getLocalStorageData } from "./app/pages/user/login.service.ts";
import { Logger } from "./app/middleware/logger.ts";

// Initialize the environment and app setup
async function initializeApp() {
    // Log the start of the initialization
    Logger.log("INFO", "Starting the app initialization...");
  
    try {
      const startTime = performance.now();
  
      // Log the environment configuration (only if necessary for debugging)
      Logger.log("DEBUG", "Environment configuration:", environment);
  
      // Initialize third-party libraries or services
      await init(environment?.boomURL, environment?.aiURL, "", environment?.baseNodeUrl);
  
      // Fetch user profile data from local storage
      const profileStorageData: any = await getLocalStorageData();
  
      // Update the access token (if available in local storage)
      updateAccessToken(profileStorageData?.token);
  
      // Boot up the application (your main application logic starts here)
      bootup();
  
      const endTime = performance.now();
      Logger.log("INFO", "App initialization completed.");
      Logger.log("INFO", `Time taken for app initialization: ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
      // Log any errors during initialization
      Logger.log("ERROR", "Error initializing the app:", error);
    }
  }
  
  // Call the initialize function to start the app
  initializeApp();

// await init(environment?.boomURL, environment?.aiURL, "", environment?.baseNodeUrl);
// const profileStorageData: any = await getLocalStorageData();
// updateAccessToken(profileStorageData?.token);
// bootup();
