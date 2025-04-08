import Header from "@/widgets/header"
import { Outlet } from "react-router"

export const CommonLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}