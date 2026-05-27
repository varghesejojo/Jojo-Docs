import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Star,
  Clock3,
  Check,
  MoreHorizontal,
  Download,
  History,
  Users,
} from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import api from "../config/api";

/* ─── Quill-specific overrides (only things Tailwind can't reach) ─── */
const quillStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  .doc-editor { border: none !important; font-family: 'Lora', Georgia, serif; }

  /* ── TOOLBAR SHELL ── */
  .doc-editor .ql-toolbar {
    border: none !important;
    padding: 0 20px !important;
    height: 52px;
    display: flex !important;
    align-items: center !important;
    gap: 4px;
    background: #ffffff;
    position: sticky;
    top: 60px;
    z-index: 50;
    border-bottom: 1px solid #f0edf5 !important;
    box-shadow: 0 1px 0 #f0edf5, 0 4px 16px rgba(170,59,255,.04);
  }
  [data-theme="dark"] .doc-editor .ql-toolbar {
    background: #18181f;
    border-bottom: 1px solid #2a2a35 !important;
    box-shadow: 0 1px 0 #2a2a35, 0 4px 16px rgba(0,0,0,.2);
  }

  /* ── FORMAT GROUPS as pill clusters ── */
  .doc-editor .ql-toolbar .ql-formats {
    display: inline-flex !important;
    align-items: center !important;
    gap: 1px;
    margin: 0 !important;
    padding: 3px 5px;
    background: #f8f6fc;
    border-radius: 10px;
    border: 1px solid #ede9f7;
  }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-formats {
    background: #22222e;
    border-color: #2e2e3e;
  }

  /* ── BUTTONS ── */
  .doc-editor .ql-toolbar button {
    width: 30px !important;
    height: 30px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 7px !important;
    transition: all .15s cubic-bezier(.4,0,.2,1) !important;
    position: relative;
  }
  .doc-editor .ql-toolbar button:hover {
    background: rgba(170,59,255,.13) !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(170,59,255,.18) !important;
  }
  .doc-editor .ql-toolbar button.ql-active {
    background: rgba(170,59,255,.18) !important;
    box-shadow: 0 0 0 1.5px rgba(170,59,255,.4) inset !important;
  }
  [data-theme="dark"] .doc-editor .ql-toolbar button:hover {
    background: rgba(192,132,252,.15) !important;
    box-shadow: 0 2px 8px rgba(192,132,252,.2) !important;
  }
  [data-theme="dark"] .doc-editor .ql-toolbar button.ql-active {
    background: rgba(192,132,252,.2) !important;
    box-shadow: 0 0 0 1.5px rgba(192,132,252,.45) inset !important;
  }

  /* ── SVG COLORS ── */
  .doc-editor .ql-toolbar .ql-stroke {
    stroke: #7c7488 !important;
    transition: stroke .15s;
  }
  .doc-editor .ql-toolbar button:hover .ql-stroke,
  .doc-editor .ql-toolbar button.ql-active .ql-stroke {
    stroke: #aa3bff !important;
  }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-stroke { stroke: #7c7d8e !important; }
  [data-theme="dark"] .doc-editor .ql-toolbar button:hover .ql-stroke,
  [data-theme="dark"] .doc-editor .ql-toolbar button.ql-active .ql-stroke { stroke: #c084fc !important; }

  .doc-editor .ql-toolbar .ql-fill { fill: #7c7488 !important; transition: fill .15s; }
  .doc-editor .ql-toolbar button:hover .ql-fill,
  .doc-editor .ql-toolbar button.ql-active .ql-fill { fill: #aa3bff !important; }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-fill { fill: #7c7d8e !important; }
  [data-theme="dark"] .doc-editor .ql-toolbar button:hover .ql-fill { fill: #c084fc !important; }

  /* ── PICKERS (Font / Header dropdowns) ── */
  .doc-editor .ql-toolbar .ql-picker {
    height: 30px !important;
  }
  .doc-editor .ql-toolbar .ql-picker-label {
    border: none !important;
    border-radius: 7px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    padding: 0 8px !important;
    font-size: 12px !important;
    font-family: 'DM Sans', system-ui, sans-serif !important;
    font-weight: 500 !important;
    color: #6b6375 !important;
    transition: all .15s !important;
    gap: 4px;
  }
  .doc-editor .ql-toolbar .ql-picker-label:hover {
    background: rgba(170,59,255,.1) !important;
    color: #aa3bff !important;
  }
  .doc-editor .ql-toolbar .ql-picker-label .ql-stroke {
    stroke: #7c7488 !important;
  }
  .doc-editor .ql-toolbar .ql-picker-label:hover .ql-stroke {
    stroke: #aa3bff !important;
  }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-picker-label { color: #9ca3af !important; }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-picker-label:hover { color: #c084fc !important; }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-picker-label .ql-stroke { stroke: #9ca3af !important; }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-picker-label:hover .ql-stroke { stroke: #c084fc !important; }

  /* dropdown panel */
  .doc-editor .ql-toolbar .ql-picker-options {
    background: #ffffff !important;
    border: 1px solid #ede9f7 !important;
    border-radius: 12px !important;
    box-shadow: 0 12px 32px rgba(170,59,255,.12), 0 2px 8px rgba(0,0,0,.06) !important;
    padding: 6px !important;
    min-width: 120px;
    animation: dropIn .15s ease;
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-picker-options {
    background: #1e1e2a !important;
    border-color: #2e2e3e !important;
    box-shadow: 0 12px 32px rgba(0,0,0,.4) !important;
  }
  .doc-editor .ql-toolbar .ql-picker-item {
    padding: 6px 10px !important;
    border-radius: 7px !important;
    font-size: 13px !important;
    font-family: 'DM Sans', system-ui, sans-serif !important;
    color: #6b6375 !important;
    transition: all .12s !important;
  }
  .doc-editor .ql-toolbar .ql-picker-item:hover {
    color: #aa3bff !important;
    background: rgba(170,59,255,.08) !important;
  }
  .doc-editor .ql-toolbar .ql-picker-item.ql-selected {
    color: #aa3bff !important;
    font-weight: 600 !important;
    background: rgba(170,59,255,.1) !important;
  }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-picker-item { color: #9ca3af !important; }
  [data-theme="dark"] .doc-editor .ql-toolbar .ql-picker-item:hover { color: #c084fc !important; background: rgba(192,132,252,.1) !important; }

  /* color-picker swatches */
  .doc-editor .ql-toolbar .ql-color-picker .ql-picker-options {
    padding: 8px !important;
    width: auto !important;
  }
  .doc-editor .ql-toolbar .ql-color-picker .ql-picker-item {
    width: 20px !important; height: 20px !important;
    border-radius: 5px !important;
    padding: 0 !important;
    border: 2px solid transparent !important;
    transition: transform .12s, border-color .12s !important;
  }
  .doc-editor .ql-toolbar .ql-color-picker .ql-picker-item:hover {
    transform: scale(1.2) !important;
    border-color: #aa3bff !important;
    background: unset !important;
  }

  /* ── CONTAINER ── */
  .doc-editor .ql-container { border: none !important; }

  /* ── EDITOR BODY ── */
  .doc-editor .ql-editor {
    min-height: calc(100vh - 180px);
    padding: 64px 80px 80px;
    font-family: 'Lora', Georgia, serif;
    font-size: 18px;
    line-height: 1.9;
    color: #08060d;
    caret-color: #aa3bff;
  }
  [data-theme="dark"] .doc-editor .ql-editor { color: #f3f4f6; }

  .doc-editor .ql-editor.ql-blank::before {
    font-style: normal;
    color: #c4c2c8;
    font-family: 'Lora', Georgia, serif;
    font-size: 18px;
    left: 80px;
  }

  /* prose */
  .doc-editor .ql-editor h1 { font-family: 'Lora', serif; font-size: 34px; font-weight: 600; letter-spacing: -.5px; line-height: 1.2; color: #08060d; margin-bottom: 16px; }
  .doc-editor .ql-editor h2 { font-family: 'Lora', serif; font-size: 24px; font-weight: 600; letter-spacing: -.3px; color: #08060d; margin-bottom: 10px; }
  .doc-editor .ql-editor h3 { font-size: 19px; font-weight: 600; color: #08060d; margin-bottom: 8px; }
  [data-theme="dark"] .doc-editor .ql-editor h1,
  [data-theme="dark"] .doc-editor .ql-editor h2,
  [data-theme="dark"] .doc-editor .ql-editor h3 { color: #f3f4f6; }
  .doc-editor .ql-editor blockquote {
    border-left: 3px solid #aa3bff;
    background: rgba(170,59,255,.06);
    padding: 12px 20px; border-radius: 0 8px 8px 0;
    font-style: italic; margin: 20px 0; color: #6b6375;
  }
  [data-theme="dark"] .doc-editor .ql-editor blockquote { background: rgba(192,132,252,.1); color: #9ca3af; }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .doc-editor .ql-toolbar { height: auto !important; padding: 6px 10px !important; flex-wrap: wrap !important; }
    .doc-editor .ql-editor { padding: 32px 24px 48px; font-size: 16px; }
    .doc-editor .ql-editor.ql-blank::before { left: 24px; font-size: 16px; }
  }
`;

export default function Editor() {
  const { documentId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [starred, setStarred] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => { fetchDocument(); }, []);

  const fetchDocument = async () => {
    try {
      const token = localStorage.getItem("access");
      const res = await api.get(`docs/documents/${documentId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContent(res.data.content || "");
      setTitle(res.data.title || "Untitled Document");
    } catch (e) {
      console.log("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = useCallback(async (newContent, newTitle) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("access");
      await api.put(
        `docs/documents/${documentId}/`,
        { title: newTitle, content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedAt(new Date());
    } catch (e) {
      console.log("Save error:", e);
    } finally {
      setSaving(false);
    }
  }, [documentId]);

  const handleContentChange = (value) => {
    setContent(value);
    saveDocument(value, title);
    const text = value.replace(/<[^>]*>/g, " ").trim();
    setWordCount(text ? text.split(/\s+/).length : 0);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    saveDocument(content, e.target.value);
  };

  const savedLabel = () => {
    if (!savedAt) return "Saved";
    const s = Math.floor((Date.now() - savedAt) / 1000);
    return s < 60 ? "Saved just now" : `Saved ${Math.floor(s / 60)}m ago`;
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  /* ── LOADING ── */
  if (loading) {
    return (
      <>
        <style>{quillStyles}</style>
        <div className="h-screen flex flex-col items-center justify-center bg-[#f0edf5] dark:bg-[#0f0f14] gap-5">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#aa3bff] dark:border-t-[#c084fc] animate-spin" />
          </div>
          <p className="text-sm text-[#6b6375] dark:text-[#9ca3af] font-[DM_Sans,system-ui,sans-serif]">
            Opening document…
          </p>
        </div>
      </>
    );
  }

  /* ── EDITOR ── */
  return (
    <>
      <style>{quillStyles}</style>

      <div className="min-h-screen flex flex-col bg-[#f0edf5] dark:bg-[#0f0f14] font-[DM_Sans,system-ui,sans-serif]">

        {/* ── HEADER ── */}
        <header className="
          sticky top-0 z-[100] h-[60px]
          flex items-center justify-between
          px-3 md:px-5
          bg-white/90 dark:bg-[#0f0f14]/90
          backdrop-blur-md
          border-b border-[#e5e4e7] dark:border-[#2a2a35]
        ">

          {/* LEFT */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">

            {/* Back */}
            <button
              onClick={() => navigate("/dashboard")}
              className="
                flex items-center justify-center w-9 h-9 rounded-xl
                text-[#6b6375] dark:text-[#9ca3af]
                hover:bg-[#aa3bff]/10 hover:text-[#aa3bff]
                dark:hover:bg-[#c084fc]/10 dark:hover:text-[#c084fc]
                transition-colors flex-shrink-0
              "
            >
              <ArrowLeft size={18} />
            </button>

            {/* Doc icon */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  fill="#aa3bff" fillOpacity=".15"
                  stroke="#aa3bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="14 2 14 8 20 8"
                  stroke="#aa3bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="8" y1="13" x2="16" y2="13" stroke="#aa3bff" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="17" x2="12" y2="17" stroke="#aa3bff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Title + meta */}
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Untitled Document"
                spellCheck={false}
                className="
                  text-[15px] font-semibold
                  text-[#08060d] dark:text-[#f3f4f6]
                  bg-transparent border-none outline-none
                  placeholder:text-[#c4c2c8]
                  truncate w-full
                  leading-tight
                "
              />
              <div className="flex items-center gap-1.5 text-[11px] text-[#6b6375] dark:text-[#9ca3af]">

                {/* Save status */}
                <span className={`flex items-center gap-1 font-medium transition-colors ${saving ? "text-[#6b6375]" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {saving
                    ? <><Clock3 size={11} /> Saving…</>
                    : <><Check size={11} /> {savedLabel()}</>
                  }
                </span>

                <span className="w-[2px] h-[2px] rounded-full bg-current opacity-40" />

                {/* Star */}
                <button
                  onClick={() => setStarred(s => !s)}
                  className={`flex items-center gap-1 transition-colors hover:text-amber-500 ${starred ? "text-amber-500" : ""}`}
                >
                  <Star size={11} fill={starred ? "currentColor" : "none"} />
                  {starred ? "Starred" : "Star"}
                </button>

                {wordCount > 0 && (
                  <>
                    <span className="w-[2px] h-[2px] rounded-full bg-current opacity-40" />
                    <span className="opacity-70">{wordCount} words</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1.5 flex-shrink-0">

            {/* Icon buttons */}
            {[
              { icon: <History size={17} />, label: "History" },
              { icon: <Download size={17} />, label: "Download" },
              { icon: <MoreHorizontal size={17} />, label: "More" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                title={label}
                className="
                  hidden sm:flex items-center justify-center
                  w-8 h-8 rounded-xl
                  text-[#6b6375] dark:text-[#9ca3af]
                  hover:bg-[#aa3bff]/10 hover:text-[#aa3bff]
                  dark:hover:bg-[#c084fc]/10 dark:hover:text-[#c084fc]
                  transition-colors
                "
              >
                {icon}
              </button>
            ))}

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-[#e5e4e7] dark:bg-[#2a2a35] mx-1" />

            {/* Collaborators */}
            <button className="
              hidden sm:flex items-center gap-1.5
              h-8 px-2.5 rounded-full
              border border-[#e5e4e7] dark:border-[#2a2a35]
              text-[#6b6375] dark:text-[#9ca3af] text-xs
              hover:border-[#aa3bff] hover:bg-[#aa3bff]/8
              dark:hover:border-[#c084fc] dark:hover:bg-[#c084fc]/10
              transition-colors
            ">
              <Users size={14} />
              <img
                src="https://ui-avatars.com/api/?name=Jojo&background=aa3bff&color=fff&size=28"
                alt="Jojo"
                className="w-5 h-5 rounded-full border-2 border-white dark:border-[#0f0f14]"
              />
            </button>

            {/* Share */}
            <button className="
              flex items-center gap-1.5
              h-8 px-4 rounded-full
              bg-[#aa3bff] dark:bg-[#c084fc]
              text-white text-[13px] font-medium
              shadow-[0_2px_12px_rgba(170,59,255,.4)]
              hover:opacity-90 active:scale-95
              transition-all
            ">
              <Share2 size={14} />
              Share
            </button>
          </div>
        </header>

        {/* ── CANVAS ── */}
        <main className="flex-1 py-8 px-3 md:px-6 relative">

          {/* Subtle dot-grid background */}
          <div
            className="fixed inset-0 top-[60px] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #aa3bff18 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />

          {/* Page card */}
          <div className="
            relative z-10
            max-w-[860px] mx-auto
            rounded-xl overflow-hidden
            bg-white dark:bg-[#18181f]
            border border-[#e5e4e7] dark:border-[#2a2a35]
            shadow-[0_4px_32px_rgba(0,0,0,.08)] dark:shadow-[0_4px_32px_rgba(0,0,0,.4)]
          ">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleContentChange}
              modules={modules}
              placeholder="Start writing…"
              className="doc-editor"
            />
          </div>
        </main>

        {/* ── STATUS BAR ── */}
        <footer className="
          fixed bottom-0 left-0 right-0 z-[90]
          h-7 flex items-center gap-2
          px-5
          text-[11px] text-[#6b6375] dark:text-[#6b7280]
          bg-white/80 dark:bg-[#0f0f14]/80
          backdrop-blur-sm
          border-t border-[#e5e4e7] dark:border-[#2a2a35]
        ">
          <span>100%</span>
          <span className="w-[2px] h-[2px] rounded-full bg-current opacity-40" />
          <span>A4</span>
          {wordCount > 0 && (
            <>
              <span className="w-[2px] h-[2px] rounded-full bg-current opacity-40" />
              <span>{wordCount} words</span>
            </>
          )}
        </footer>

      </div>
    </>
  );
}