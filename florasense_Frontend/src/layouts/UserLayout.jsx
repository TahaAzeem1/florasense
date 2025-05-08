import { Link, Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { HiMenuAlt2, HiX } from "react-icons/hi"
import { CgProfile } from "react-icons/cg"
import { GiPlantRoots } from "react-icons/gi"
import { AiOutlineCustomerService } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"
import { TbHomeEco } from "react-icons/tb";

const UserLayout = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const isActive = (path) => location.pathname === path

  const menuItems = [
    { path: "/user", label: "Profile", icon: CgProfile },
    { path: "/user/plants", label: "My Plants", icon: GiPlantRoots },
    { path: "/user/custom", label: "Custom", icon: AiOutlineCustomerService },
    { path: "/search", label: "Search", icon: BiSearch },
    { path: "home", label: "Home", icon: TbHomeEco },
  ]

  useEffect(() => {
    // Close the sidebar when the route changes
    setIsSidebarOpen(false)
  }
  , [location.pathname])
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static lg:translate-x-0 z-30 h-screen transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 bg-white shadow-md`}
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-2 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon && <item.icon className="h-5 w-5" />}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="p-4 lg:p-8">
          {/* Toggle button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden mb-4"
          >
            <HiMenuAlt2 className="h-6 w-6" />
          </button>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserLayout
