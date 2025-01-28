import Post from '@components/Post/Post';
import BlogLayout from '@layouts/BlogLayout';
import BlogMain from '@pages/BlogMain';
import Landing from '@pages/Landing';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  children?: RouteConfig[];
}

export const ROUTES_CONFIG: RouteConfig[] = [
  { path: '/', component: Landing },
  {
    path: '/blog',
    component: BlogLayout,
    children: [
      { path: ':id', component: BlogMain },
      { path: ':id/posts/add', component: Post },
      { path: ':id/posts/:article_id', component: Post },
    ],
  },
  // 임시 페이지
  // get method와 관련된 값들을 연결할 수 없음을 명시적으로 표현하기 위해 해당 주소를 유지
  {
    path: '/tempBlog',
    component: BlogLayout,
    children: [
      { path: ':id', component: BlogMain },
      { path: ':id/blog/:article_id', component: Post },
    ],
  },
];
