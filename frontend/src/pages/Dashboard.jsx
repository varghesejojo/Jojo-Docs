import { useState } from "react";
import {
  Search,
  Bell,
  Grid3X3,
  FileText,
  Clock3,
  Star,
  Trash2,
  Plus,
  MoreVertical,
  Folder,
  LayoutGrid,
  LogOut,
  Menu,
  X,
  Moon, Sun
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const { dark, setDark } = useTheme();

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900' : 'bg-[#f6f8fc]'} ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
      
      {/* ================= NAVBAR ================= */}
      <header className={`sticky top-0 z-50 ${dark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b`}>
        <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className={`md:hidden p-2 rounded-xl ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <Menu className={`w-6 h-6 ${dark ? 'text-gray-300' : ''}`} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
                <FileText className="text-white w-5 h-5" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold tracking-tight">
                  Jojo Docs
                </h1>

                <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Smart workspace
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="flex-1 max-w-3xl hidden md:block">
            <div className="relative">
              <Search className={`absolute left-4 top-3.5 w-5 h-5 ${dark ? 'text-gray-400' : 'text-gray-400'}`} />

              <input
                type="text"
                placeholder="Search documents..."
                className={`w-full ${dark ? 'bg-gray-800 text-gray-100' : 'bg-[#f1f3f4]'} rounded-2xl py-3 pl-12 pr-4 outline-none border border-transparent focus:border-blue-500 focus:bg-white ${dark ? 'focus:bg-gray-800' : ''} transition-all`}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-3">

            <button className={`p-2 ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl transition hidden sm:flex`}>
              <Grid3X3 className={`w-5 h-5 ${dark ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>

            <button className={`p-2 ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl transition relative`}>
              <Bell className={`w-5 h-5 ${dark ? 'text-gray-400' : 'text-gray-600'}`} />

              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className={`flex items-center gap-3 pl-2 ${dark ? 'sm:border-gray-700' : 'sm:border-l'}`}>
              <img
                src={
                  user?.picture ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="profile"
                className={`w-10 h-10 rounded-full border ${dark ? 'border-gray-700' : ''} object-cover`}
              />

              <div className="hidden lg:block">
                <p className={`text-sm font-semibold ${dark ? 'text-gray-100' : ''}`}>
                  {user?.name || "User"}
                </p>

                <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Google Account
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setDark(d => !d)}
            className={`p-2 ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl transition`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="flex">

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen md:h-[calc(100vh-64px)]
          w-72 ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
          border-r
          px-4 py-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          md:flex
        `}
        >
          <div className="flex flex-col h-full">

            {/* Mobile Close */}
            <div className="flex justify-end md:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className={`p-2 rounded-xl ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${dark ? 'text-gray-300' : ''}`} />
              </button>
            </div>

            {/* Create Button */}
            <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-semibold shadow-lg transition-all">
              <Plus className="w-5 h-5" />
              Create New Doc
            </button>

            {/* Navigation */}
            <nav className="mt-8 space-y-2">
              <SidebarItem
                icon={<FileText size={20} />}
                title="My Documents"
                active
                dark={dark}
              />

              <SidebarItem
                icon={<Clock3 size={20} />}
                title="Recent"
                dark={dark}
              />

              <SidebarItem
                icon={<Star size={20} />}
                title="Starred"
                dark={dark}
              />

              <SidebarItem
                icon={<Folder size={20} />}
                title="Folders"
                dark={dark}
              />

              <SidebarItem
                icon={<Trash2 size={20} />}
                title="Trash"
                dark={dark}
              />
            </nav>

            {/* Storage */}
            <div className="mt-auto">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-5 text-white">
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
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className={`mt-4 flex items-center gap-2 text-red-500 ${dark ? 'hover:bg-red-950/50' : 'hover:bg-red-50'} rounded-xl px-4 py-3 transition w-full`}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-10 overflow-x-hidden">

          {/* Welcome */}
          <div className="mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${dark ? 'text-gray-100' : ''}`}>
              Welcome back 👋
            </h2>

            <p className={`mt-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              Create, manage and organize your documents easily.
            </p>
          </div>

          {/* ================= TEMPLATES ================= */}
          <section>
            <div className="flex items-center justify-between mb-6 gap-4">
              <div>
                <h3 className={`text-2xl font-bold ${dark ? 'text-gray-100' : ''}`}>
                  Start New
                </h3>

                <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Choose a template to begin
                </p>
              </div>

              <button className="text-blue-600 font-medium hover:underline whitespace-nowrap">
                View all
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

              <TemplateCard
                title="Blank"
                icon={<Plus className="w-10 h-10 text-blue-600" />}
                dark={dark}
              />

              <TemplateImageCard
                title="Resume"
                image="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop"
                dark={dark}
              />

              <TemplateImageCard
                title="Meeting Notes"
                image="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop"
                dark={dark}
              />

              <TemplateImageCard
                title="Project Plan"
                image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop"
                dark={dark}
              />
            </div>
          </section>

          {/* ================= RECENT ================= */}
          <section className="mt-14">
            <div className="flex items-center justify-between mb-6">

              <div>
                <h3 className={`text-2xl font-bold ${dark ? 'text-gray-100' : ''}`}>
                  Recent Documents
                </h3>

                <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your recently opened files
                </p>
              </div>

              <button className={`p-2 rounded-xl ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <LayoutGrid className={`w-5 h-5 ${dark ? 'text-gray-400' : ''}`} />
              </button>
            </div>

            <div className={`${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl border overflow-hidden shadow-sm`}>

              {recentDocs.map((doc, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-4 px-4 sm:px-6 py-5 border-b last:border-b-0 ${dark ? 'border-gray-700 hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`h-12 w-12 rounded-2xl ${dark ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                      <FileText className={`w-6 h-6 ${dark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>

                    <div className="min-w-0">
                      <h4 className={`font-semibold truncate ${dark ? 'text-gray-100' : ''}`}>
                        {doc.title}
                      </h4>

                      <p className={`text-sm truncate ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {doc.owner} • {doc.date}
                      </p>
                    </div>
                  </div>

                  <button className={`p-2 rounded-xl ${dark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} flex-shrink-0`}>
                    <MoreVertical className={`w-5 h-5 ${dark ? 'text-gray-400' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({ icon, title, active, dark }) {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all w-full text-left ${
        active
          ? dark 
            ? "bg-blue-900/30 text-blue-400 font-semibold" 
            : "bg-blue-50 text-blue-700 font-semibold"
          : dark
            ? "hover:bg-gray-800 text-gray-300"
            : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}

function TemplateCard({ title, icon, dark }) {
  return (
    <div className="group cursor-pointer">
      <div className={`aspect-[3/4] rounded-3xl border ${dark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'} hover:shadow-xl transition-all flex items-center justify-center`}>
        {icon}
      </div>

      <p className={`mt-3 text-center font-medium ${dark ? 'text-gray-300' : ''}`}>
        {title}
      </p>
    </div>
  );
}

function TemplateImageCard({ title, image, dark }) {
  return (
    <div className="group cursor-pointer">
      <div className={`aspect-[3/4] rounded-3xl overflow-hidden border ${dark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'} hover:shadow-xl transition-all`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <p className={`mt-3 text-center font-medium ${dark ? 'text-gray-300' : ''}`}>
        {title}
      </p>
    </div>
  );
}

export default Dashboard;