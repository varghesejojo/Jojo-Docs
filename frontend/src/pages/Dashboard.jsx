import { useEffect, useState } from "react";
import { useTheme } from "../components/auth/context/ThemeContext";
import { useAuth } from "../components/auth/context/AuthContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import { useNavigate } from "react-router-dom";
import { createDocument, getDocuments } from "../services/documentService";
import RenameDocumentModal from "../components/modals/RenameDocumentModal";
import DeleteDocumentModal from "../components/modals/DeleteDocumentModal";
import AppLayout from "../layouts/AppLayout";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { dark, setDark } = useTheme();

  const { user, logout, loading, fetchUser } = useAuth();
  console.log("Authenticated user:", user);
  const navigate = useNavigate();

  const [recentDocs, setRecentDocs] = useState([]);
  const [renameDoc, setRenameDoc] = useState(null);
  const [deleteDoc, setDeleteDoc] = useState(null);
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {

    try {

      const docs = await getDocuments();

      setRecentDocs(docs);

    } catch (error) {

      console.log(error);

    }
  };


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      {
        renameDoc && (
          <RenameDocumentModal
            dark={dark}
            document={renameDoc}
            onClose={() => setRenameDoc(null)}
            onSuccess={fetchDocuments}
          />
        )
      }

      {
        deleteDoc && (
          <DeleteDocumentModal
            dark={dark}
            document={deleteDoc}
            onClose={() => setDeleteDoc(null)}
            onSuccess={fetchDocuments}
          />
        )
      }
      <AppLayout
      >

        <MainContent
          dark={dark}
          recentDocs={recentDocs}
          onRename={setRenameDoc}
          onDelete={setDeleteDoc}
           fetchDocuments={fetchDocuments}
        />
      </AppLayout>
    </>
  );
}

export default Dashboard;