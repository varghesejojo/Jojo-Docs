import { useEffect, useState } from "react";
import {
  Trash2,
  RotateCcw,
  FileText,
} from "lucide-react";

import AppLayout from "../layouts/AppLayout";

import {
  getTrashDocuments,
  restoreDocument,
  deleteForever,
  createDocument,
} from "../services/documentService";

function Trash() {

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchTrashDocuments();
  }, []);

  const fetchTrashDocuments =
    async () => {

      try {

        const docs =
          await getTrashDocuments();

        setDocuments(docs || []);

      } catch (error) {

        console.log(error);

        setDocuments([]);

      } finally {

        setLoading(false);

      }
    };

  const handleRestore =
    async (id) => {

      try {

        await restoreDocument(id);

        fetchTrashDocuments();

      } catch (error) {

        console.log(error);

      }
    };

  const handlePermanentDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete permanently?"
        )
      ) {
        return;
      }

      try {

        await deleteForever(id);

        fetchTrashDocuments();

      } catch (error) {

        console.log(error);

      }
    };

  const handleCreateDocument =
    async () => {

      try {

        const response =
          await createDocument();

        console.log(response);

      } catch (error) {

        console.log(error);

      }
    };

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          Loading Trash...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      onCreateDocument={
        handleCreateDocument
      }
    >

      <div className="mb-8">

        <h1 className="font-bold flex items-center gap-3">
          <Trash2 className="w-8 h-8 text-red-500" />
          Trash
        </h1>

        <p className="text-gray-500 mt-2">
          Deleted documents can be restored.
        </p>

      </div>

      {documents.length === 0 ? (

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-20 text-center">

          <Trash2 className="w-20 h-20 mx-auto text-gray-400 mb-4" />

          <h2 className="text-xl font-semibold">
            Trash is Empty
          </h2>

          <p className="text-gray-500 mt-2">
            Deleted documents will appear here.
          </p>

        </div>

      ) : (

        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">

          {documents.map((doc) => (

            <div
              key={doc._id}
              className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700"
            >

              <div className="flex items-center gap-4">

                <div className="h-12 w-12 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

                  <FileText className="w-6 h-6 text-red-500" />

                </div>

                <div>

                  <h3 className="font-semibold">
                    {doc.title}
                  </h3>

                  {doc.deleted_at && (
                    <p className="text-sm text-gray-500">
                      Deleted on{" "}
                      {new Date(
                        doc.deleted_at
                      ).toLocaleString()}
                    </p>
                  )}

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleRestore(doc._id)
                  }
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                >
                  <RotateCcw size={18} />
                  Restore
                </button>

                <button
                  onClick={() =>
                    handlePermanentDelete(
                      doc._id
                    )
                  }
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                >
                  <Trash2 size={18} />
                  Delete Forever
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </AppLayout>
  );
}

export default Trash;