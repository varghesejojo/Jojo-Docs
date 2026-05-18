function TemplateImageCard({ title, image, dark }) {
  return (
    <div className="group cursor-pointer">
      <div className={`aspect-3/4 rounded-3xl overflow-hidden border ${dark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'} hover:shadow-xl transition-all`}>
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

export default TemplateImageCard;