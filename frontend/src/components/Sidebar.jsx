import {
  Plus,
  LogOut,
  X,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "../config/sidebarMenu";

function Sidebar({
  dark,
  sidebarOpen,
  onClose,
  onLogout,
  onCreateDocument,
}) {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`
        fixed md:sticky top-0 left-0 z-50
        h-screen md:h-[calc(100vh-64px)]
        w-72
        ${dark
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-200"
        }
        border-r
        px-4 py-6
        transform transition-transform duration-300
        ${sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
        }
        md:translate-x-0
        md:flex
      `}
    >
      <div className="flex flex-col h-full">

        {/* Mobile Close */}
        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={onClose}
            className={`p-2 rounded-xl ${dark
                ? "hover:bg-gray-800"
                : "hover:bg-gray-100"
              }`}
          >
            <X
              className={`w-5 h-5 ${dark
                  ? "text-gray-300"
                  : ""
                }`}
            />
          </button>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateDocument}
          className="
            flex
            items-center
            justify-center
            gap-3
            bg-blue-600
            hover:bg-blue-700
            text-white
            rounded-2xl
            py-4
            font-semibold
            shadow-lg
            transition-all
          "
        >
          <Plus className="w-5 h-5" />

          Create New Doc
        </button>

        {/* Navigation */}
        <nav className="mt-8 space-y-2">

          {sidebarMenu.map((item) => {

            const Icon = item.icon;

            return (
              <SidebarItem
                key={item.path}
                icon={<Icon size={20} />}
                title={item.title}
                active={
                  location.pathname === item.path
                }
                dark={dark}
                onClick={() => {
                  navigate(item.path);

                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
              />
            );
          })}

        </nav>

        {/* Storage */}
        <div className="mt-auto">

          {/* <div className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl p-5 text-white">

            <p className="text-sm opacity-90">
              Storage
            </p>

            <h3 className="text-3xl font-bold mt-1">
              72%
            </h3>

            <div className="w-full bg-white/20 rounded-full h-2 mt-4 overflow-hidden">
              <div className="bg-white h-2 w-[72%] rounded-full"></div>
            </div>

            <p className="text-xs mt-3 opacity-80">
              7.2 GB used of 10 GB
            </p>

          </div> */}

          {/* Logout */}
          <button
            onClick={onLogout}
            className={`
              mt-4
              flex
              items-center
              gap-2
              text-red-500
              ${dark
                ? "hover:bg-red-950/50"
                : "hover:bg-red-50"
              }
              rounded-xl
              px-4
              py-3
              transition
              w-full
            `}
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>

      </div>
    </aside>
  );
}

export default Sidebar;