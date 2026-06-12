import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../components/auth/context/ThemeContext";
import { useAuth } from "../components/auth/context/AuthContext";
import { createDocument } from "../services/documentService";

function AppLayout({
  children,
}) {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const { dark, setDark } = useTheme();

  const {
    user,
    logout,
    loading,

  } = useAuth();
  const navigate = useNavigate();
  const handleCreateDocument = async () => {

    try {

      const response = await createDocument();

      navigate(`/document/${response.document_id}`);

    } catch (error) {

      console.log(error);

    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${dark
        ? "bg-gray-900 text-white"
        : "bg-[#f6f8fc] text-gray-900"
        }`}
    >

      <Navbar
        dark={dark}
        setDark={setDark}
        user={user}
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      <div className="flex">

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          />
        )}

        <Sidebar
          dark={dark}
          sidebarOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
          onLogout={logout}
          onCreateDocument={
            handleCreateDocument
          }
        />

        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-x-hidden">          {children}
        </main>

      </div>

    </div>
  );
}

export default AppLayout;