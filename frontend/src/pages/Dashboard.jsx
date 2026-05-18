import { useState } from "react";
import { useTheme } from "../components/auth/context/ThemeContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { dark, setDark } = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

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

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900' : 'bg-[#f6f8fc]'} ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
      
      <Navbar 
        dark={dark}
        setDark={setDark}
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex">
        {/* Mobile Overlay */}
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
          onLogout={handleLogout}
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