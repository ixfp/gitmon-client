import Landing from "@pages/Landing";
import BlogMain from "@pages/BlogMain";
import BlogLayout from "@layouts/BlogLayout";
import Post from "@components/Post";
import GitRouter from "@pages/GitRouter";
import { CreateRepo } from "@pages/CreateRepo";

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  children?: RouteConfig[];
}

export const ROUTES_CONFIG: RouteConfig[] = [
  { path: "/", component: Landing },
  { path: "/auth/callback", component: GitRouter },
  { path: ":id/create-repo", component: CreateRepo },
  {
    path: "/tempBlog",
    component: BlogLayout,
    children: [
      { path: ":id", component: BlogMain },
      { path: ":id/blog/:article_id", component: Post },
    ],
  },
];
