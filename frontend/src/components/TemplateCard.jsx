function TemplateCard({ title, icon, dark }) {
  return (
    <div className="group cursor-pointer">
      <div className={`aspect-3/4 rounded-3xl border ${dark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'} hover:shadow-xl transition-all flex items-center justify-center`}>
        {icon}
      </div>
      <p className={`mt-3 text-center font-medium ${dark ? 'text-gray-300' : ''}`}>
        {title}
      </p>
    </div>
  );
}

export default TemplateCard;