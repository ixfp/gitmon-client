import Landing from '@pages/Landing';
import TempBlog from '@pages/TempBlog';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
}

export const ROUTES_CONFIG: RouteConfig[] = [
  { path: '/', component: Landing },
  { path: '/tempBlog', component: TempBlog },
];
