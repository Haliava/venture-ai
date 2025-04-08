import UnderConstructionPage from '@/pages/under-construction';
import CommonLayout from '@/pages/common-layout';
import InstructionPage from '@/pages/instruction';
import NotFoundPage from '@/pages/not-found';
import IndexPage from '@/pages/index';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from "react-router";

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
            <Route path="profile" element={<UnderConstructionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
