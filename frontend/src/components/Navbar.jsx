import {
  Search,
  Bell,
  Grid3X3,
  FileText,
  Menu,
  Sun,
  Moon
} from "lucide-react";

function Navbar({ dark, setDark, user, onMenuClick }) {
  console.log("Navbar received user:", user.picture);
  return (
    <header className={`sticky top-0 z-50 ${dark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b`}>
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">

        {/* LEFT - Compact Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className={`md:hidden p-2 rounded-xl ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <Menu className={`w-5 h-5 ${dark ? 'text-gray-300' : ''}`} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <FileText className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Jojo Docs</span>
          </div>
        </div>

        {/* SEARCH - More compact */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className={`absolute left-3.5 top-2.5 w-4 h-4 ${dark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full ${dark ? 'bg-gray-800 text-gray-100' : 'bg-[#f1f3f4]'} rounded-xl py-2 pl-10 pr-4 text-sm outline-none border border-transparent focus:border-blue-500 focus:bg-white ${dark ? 'focus:bg-gray-800' : ''} transition-all`}
            />
          </div>
        </div>

        {/* RIGHT - Compact actions */}
        <div className="flex items-center gap-1">
          <button className={`p-2 ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition hidden sm:flex`}>
            <Grid3X3 className={`w-4 h-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>

          <button className={`p-2 ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition relative`}>
            <Bell className={`w-4 h-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>
          </button>

          <button
            onClick={() => setDark(d => !d)}
            className={`p-2 ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className={`flex items-center gap-2 pl-2 ml-1 ${dark ? 'sm:border-gray-700' : 'sm:border-l'}`}>
          {console.log("User in Navbar:", user)}
            <img
              src={user?.picture || "https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&rounded=true&bold=true"}
              alt="profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500 object-cover"
            />
            <div className="hidden lg:block">
              <p className={`text-sm font-medium ${dark ? 'text-gray-100' : 'text-gray-700'}`}>
                {user?.name?.split(' ')[0] || "User"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;