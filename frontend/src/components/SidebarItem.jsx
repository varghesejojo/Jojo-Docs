function SidebarItem({
  icon,
  title,
  active,
  dark,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        ${
          active
            ? dark
              ? "bg-gray-800 text-white"
              : "bg-blue-50 text-blue-600"
            : dark
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      {icon}
      <span className="font-medium">
        {title}
      </span>
    </button>
  );
}

export default SidebarItem;