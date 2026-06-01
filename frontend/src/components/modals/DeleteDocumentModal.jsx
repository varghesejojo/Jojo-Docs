import { moveToTrash } from "../../services/documentService";
import { Trash2 } from "lucide-react";

function DeleteDocumentModal({
  dark,
  document,
  onClose,
  onSuccess,
}) {

  const handleDelete = async () => {

  try {

    await moveToTrash(
      document._id
    );

    onSuccess();
    onClose();

  } catch (error) {

    console.log(error);

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

        <div className="flex items-center gap-3 mb-4">

          <div className="p-3 rounded-full bg-red-100">

            <Trash2 className="text-red-600" />

          </div>

          <h2 className="text-xl font-bold">
            Move To Trash
          </h2>

        </div>

        <p
          className={
            dark
              ? "text-gray-400"
              : "text-gray-600"
          }
        >
          Are you sure you want to move
          <strong> {document.title} </strong>
          to trash?
        </p>

        <p
          className={`mt-2 text-sm ${
            dark
              ? "text-gray-500"
              : "text-gray-500"
          }`}
        >
          You can restore it later from Trash.
        </p>

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
            onClick={handleDelete}
            className="
              px-4 py-2
              rounded-lg
              bg-red-600
              hover:bg-red-700
              text-white
            "
          >
            Move To Trash
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteDocumentModal;