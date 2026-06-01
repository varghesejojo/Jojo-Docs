import { useState } from "react";
import { renameDocument } from "../../services/documentService";
function RenameDocumentModal({
  dark,
  document,
  onClose,
  onSuccess,
}) {

  const [title, setTitle] = useState(document.title);
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {

  try {

    setLoading(true);

    await renameDocument(
      document._id,
      title
    );

    onSuccess();
    onClose();

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

      <div
        className={`
          w-full
          max-w-md
          rounded-2xl
          p-6
          shadow-2xl
          ${
            dark
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }
        `}
      >

        <h2 className="text-xl font-bold mb-4">
          Rename Document
        </h2>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className={`
            w-full
            p-3
            rounded-xl
            border
            outline-none
            ${
              dark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }
          `}
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className={`
              px-4 py-2 rounded-lg
              ${
                dark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleRename}
            className="
              px-4 py-2
              rounded-lg
              bg-blue-600
              hover:bg-blue-700
              text-white
            "
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default RenameDocumentModal;