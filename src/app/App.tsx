import CommonLayout from '@/pages/common-layout';
import IndexPage from '@/pages/index';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from 'react';

const NotFoundPage = lazy(() => import('@/pages/not-found'))
const UnderConstructionPage = lazy(() => import('@/pages/under-construction'))
const InstructionPage = lazy(() => import('@/pages/instruction'))
const ProfilePage = lazy(() => import('@/pages/profile'))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path='*' element={<NotFoundPage />} />
            <Route index element={<IndexPage />} />
            <Route path="instruction" element={<InstructionPage />} />
            <Route path="subscribe" element={<UnderConstructionPage />} />
            <Route path="projects" element={<UnderConstructionPage />} />
            <Route path="settings" element={<UnderConstructionPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
