import { useState } from "react";
import { useTheme } from "../components/auth/context/ThemeContext";
import { useAuth } from "../components/auth/context/AuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { dark, setDark } = useTheme();

  const { user, logout, loading ,fetchUser} = useAuth();
  console.log("Authenticated user:", user);

  const recentDocs = [
    {
      title: "Project Roadmap 2026",
      owner: "Me",
      date: "2 hours ago",
    },
    {
      title: "Meeting Notes",
      owner: "Me",
      date: "Yesterday",
    },
    {
      title: "React Learning Docs",
      owner: "Me",
      date: "3 days ago",
    },
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        dark
          ? "bg-gray-900 text-gray-100"
          : "bg-[#f6f8fc] text-gray-800"
      }`}
    >
      <Navbar
        dark={dark}
        setDark={setDark}
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          dark={dark}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={logout}
        />

        <MainContent
          dark={dark}
          recentDocs={recentDocs}
        />
      </div>
    </div>
  );
}

export default Dashboard;