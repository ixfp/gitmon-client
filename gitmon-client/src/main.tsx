import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@styles/index.css'
import { ROUTES_CONFIG } from 'routesConfig.ts';
import Loading from '@components/Loading';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        {ROUTES_CONFIG.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Suspense>
    </BrowserRouter>
  </StrictMode>
)
