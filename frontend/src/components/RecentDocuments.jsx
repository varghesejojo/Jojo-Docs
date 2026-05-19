import { LayoutGrid, FileText, MoreVertical } from "lucide-react";

function RecentDocuments({ dark, recentDocs }) {
  return (
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
              <div className={`h-12 w-12 rounded-2xl ${dark ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center shrink-0`}>
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
            <button className={`p-2 rounded-xl ${dark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} shrink-0`}>
              <MoreVertical className={`w-5 h-5 ${dark ? 'text-gray-400' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentDocuments;