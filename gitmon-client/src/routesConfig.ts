import Landing from "@pages/Landing";
import BlogMain from "@pages/BlogMain";

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
}

export const ROUTES_CONFIG: RouteConfig[] = [
  { path: "/", component: Landing },
  { path: "/tempBlog", component: BlogMain },
];
