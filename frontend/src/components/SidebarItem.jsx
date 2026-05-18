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

export default SidebarItem;