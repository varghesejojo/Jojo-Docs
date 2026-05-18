import { LayoutGrid, Plus } from "lucide-react";
import TemplateCard from "./TemplateCard";
import TemplateImageCard from "./TemplateImageCard";
import RecentDocuments from "./RecentDocuments";  // ← Add this import

function MainContent({ dark, recentDocs }) {
  return (
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

      {/* Templates Section */}
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
          <TemplateCard title="Blank" icon={<Plus className="w-10 h-10 text-blue-600" />} dark={dark} />
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

      {/* Recent Documents Section */}
      <RecentDocuments dark={dark} recentDocs={recentDocs} />
    </main>
  );
}

export default MainContent;