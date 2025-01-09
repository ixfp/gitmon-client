import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@styles/index.css'
import Landing from '@pages/Landing.tsx'
import TempBlog from '@pages/TempBlog.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/tempBlog" element={<TempBlog />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  </StrictMode>
)
