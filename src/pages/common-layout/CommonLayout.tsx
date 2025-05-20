import Header from "@/widgets/header"
import { Outlet } from "react-router"
import { Toaster } from "sonner"

export const CommonLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  )
}