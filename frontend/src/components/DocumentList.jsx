import { useState, useRef, useEffect } from "react";
import {
    LayoutGrid,
    FileText,
    MoreVertical,
    Pencil,
    Edit,
    Trash2, Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import {
    starDocument,
    unstarDocument,
} from "../services/documentService";
import { useTheme } from "./auth/context/ThemeContext";

// Custom hook to detect clicks outside a component
function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

function DocumentList({
    title,
    subtitle,
    documents,
    onRename,
    onDelete,
    fetchDocuments,
}) {

    const navigate = useNavigate();
    const { dark } = useTheme();
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    
    // Close menu when clicking outside
    useOutsideClick(menuRef, () => {
        if (openMenu) {
            setOpenMenu(null);
        }
    });
    
    const toggleStar = async (doc) => {
        try {
            if (doc.is_starred) {
                await unstarDocument(doc._id);
            } else {
                await starDocument(doc._id);
            }
            fetchDocuments(); // refresh list
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="mt-14">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3
                        className={`text-2xl font-bold ${dark ? "text-gray-100" : ""
                            }`}
                    >
                        {title}
                    </h3>
                    <p
                        className={`text-sm mt-1 ${dark
                            ? "text-gray-400"
                            : "text-gray-500"
                            }`}
                    >
                        {subtitle}
                    </p>
                </div>
                <button
                    className={`p-2 rounded-xl ${dark
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                        }`}
                >
                    <LayoutGrid
                        className={`w-5 h-5 ${dark ? "text-gray-400" : ""
                            }`}
                    />
                </button>
            </div>

            <div
                className={`${dark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                    } rounded-3xl border shadow-sm overflow-visible`}
            >
                {documents.map((doc) => (
                    <div
                        key={doc._id}
                        onClick={() => navigate(`/document/${doc._id}`)}
                        className={`flex items-center justify-between gap-4 px-4 sm:px-6 py-5 border-b last:border-b-0 cursor-pointer ${dark
                            ? "border-gray-700 hover:bg-gray-700/50"
                            : "hover:bg-gray-50"
                            } transition`}
                    >
                        {/* LEFT */}
                        <div className="flex items-center gap-4 min-w-0">
                            <div
                                className={`h-12 w-12 rounded-2xl ${dark
                                    ? "bg-blue-900/30"
                                    : "bg-blue-100"
                                    } flex items-center justify-center shrink-0`}
                            >
                                <FileText
                                    className={`w-6 h-6 ${dark
                                        ? "text-blue-400"
                                        : "text-blue-600"
                                        }`}
                                />
                            </div>
                            <div className="min-w-0">
                                <h4
                                    className={`font-semibold truncate ${dark
                                        ? "text-gray-100"
                                        : ""
                                        }`}
                                >
                                    {doc.title}
                                </h4>
                                <p
                                    className={`text-sm truncate ${dark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {doc.owner_name}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-2">
                            {/* STAR */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStar(doc);
                                }}
                                className="p-2 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition"
                            >
                                <Star
                                    size={20}
                                    className={
                                        doc.is_starred
                                            ? "text-yellow-500 fill-yellow-500"
                                            : dark
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                    }
                                />
                            </button>

                            <div className="relative" ref={openMenu === doc._id ? menuRef : null}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenu(
                                            openMenu === doc._id ? null : doc._id
                                        );
                                    }}
                                    className={`p-2 rounded-xl ${dark
                                        ? "hover:bg-gray-600"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    <MoreVertical
                                        className={`w-5 h-5 ${dark
                                            ? "text-gray-400"
                                            : ""
                                            }`}
                                    />
                                </button>

                                {/* MENU */}
                                {openMenu === doc._id && (
                                    <div
                                        className={`absolute right-0 top-12 w-52 rounded-xl shadow-lg border z-50 ${dark
                                            ? "bg-gray-800 border-gray-700"
                                            : "bg-white border-gray-200"
                                            }`}
                                    >
                                        {/* EDIT */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/document/${doc._id}`);
                                                setOpenMenu(null);
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Edit size={18} />
                                            Edit
                                        </button>

                                        {/* RENAME */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRename(doc);
                                                setOpenMenu(null);
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <Pencil size={18} />
                                            Rename
                                        </button>

                                        {/* DELETE */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(doc);
                                                setOpenMenu(null);
                                            }}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 size={18} />
                                            Move To Trash
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default DocumentList;