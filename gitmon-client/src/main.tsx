import Loading from '@components/Loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { RouteConfig, ROUTES_CONFIG } from './routesConfig.ts';

import '@styles/index.css';

const queryClient = new QueryClient();

const renderRoutes = (routes: RouteConfig[]) =>
  routes.map((route, index) => (
    <Route key={index} path={route.path} element={<route.component />}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>{renderRoutes(ROUTES_CONFIG)}</Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
