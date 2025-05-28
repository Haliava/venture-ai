import { useAuth } from "@/shared/store/user"
import Header from "@/widgets/header"
import { useEffect } from "react"
import { Outlet } from "react-router"
import { Toaster } from "sonner"

export const CommonLayout = () => {
  const { setToken, setIsLoggedIn } = useAuth();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, [])

  return (
    <div>
      <Header />
      <Outlet />
      <Toaster visibleToasts={12} />
    </div>
  )
}