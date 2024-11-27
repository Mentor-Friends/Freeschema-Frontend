import { profilelist } from "./wrapper.profile";

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
  const profileRoutes: RouteParams[] = [
    {
      path: "/profile",
      linkLabel: "Profile",
      content: profilelist,
    }]

    export default profileRoutes;