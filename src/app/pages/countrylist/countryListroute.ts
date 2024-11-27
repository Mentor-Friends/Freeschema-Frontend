import { countrylist } from "./wrapper.tasklist";

type RouteParams = {
    /**
     * This is a path for route url
     */
    path: any;
    /**
     * This is a label for the route as a name
     */
    linkLabel?: string;
    /**
     * This is the content that route renders
     */
    content: any;
    /**
     * If path needs to be authenticated. ie. true, false
     */
    isAuthenticated?: boolean;
  };
  const countryListroutes: RouteParams[] = [
    {
      path: "/country-lists",
      linkLabel: "Country Lists",
      content: countrylist,
    }]

    export default countryListroutes;