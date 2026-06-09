import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";

import {
  getStarredDocuments,
} from "../services/documentService";

import DocumentList from "../components/DocumentList";

import RenameDocumentModal from "../components/modals/RenameDocumentModal";
import DeleteDocumentModal from "../components/modals/DeleteDocumentModal";

function Starred() {

  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [renameDoc, setRenameDoc] = useState(null);

  const [deleteDoc, setDeleteDoc] = useState(null);

  useEffect(() => {

    fetchStarredDocuments();

  }, []);

  const fetchStarredDocuments = async () => {

    try {

      const docs =
        await getStarredDocuments();

      setDocuments(docs || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AppLayout>

        <div className="text-center py-20">

          Loading...

        </div>

      </AppLayout>

    );

  }

  return (
    <>

      {
        renameDoc && (

          <RenameDocumentModal
            document={renameDoc}
            onClose={() => setRenameDoc(null)}
            onSuccess={fetchStarredDocuments}
          />

        )
      }

      {
        deleteDoc && (

          <DeleteDocumentModal
            document={deleteDoc}
            onClose={() => setDeleteDoc(null)}
            onSuccess={fetchStarredDocuments}
          />

        )
      }

      <AppLayout>

        <DocumentList
          title="Starred Documents"
          subtitle="Your favorite documents"
          documents={documents}
          onRename={setRenameDoc}
          onDelete={setDeleteDoc}
          fetchDocuments={fetchStarredDocuments}
        />

      </AppLayout>

    </>
  );
}

export default Starred;