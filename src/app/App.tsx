import CommonLayout from '@/pages/common-layout';
import IndexPage from '@/pages/index';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from 'react';
import ProtectedRoute from '@/pages/protected-route';
import { AxiosInterceptor } from '@/shared/api/AxiosInterceptor';
import EmailVerificationPage from '@/pages/email-verification';

export const queryClient = new QueryClient()

const NotFoundPage = lazy(() => import('@/pages/not-found'))
const UnderConstructionPage = lazy(() => import('@/pages/under-construction'))
const InstructionPage = lazy(() => import('@/pages/instruction'))
const ProfilePage = lazy(() => import('@/pages/profile'))
const LoginPage = lazy(() => import('@/pages/login'))
const RegisterPage = lazy(() => import('@/pages/register'))

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosInterceptor>
        <BrowserRouter>
          <Routes>
            <Route element={<CommonLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="verification" element={<EmailVerificationPage />} />

              <Route element={<ProtectedRoute />}>
                <Route index element={<IndexPage />} />
                <Route path="instruction" element={<InstructionPage />} />
                <Route path="settings" element={<UnderConstructionPage />} />
                <Route path="projects" element={<UnderConstructionPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="subscribe" element={<UnderConstructionPage />} />
              </Route>

              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AxiosInterceptor>
    </QueryClientProvider>
  )
}

export default App
