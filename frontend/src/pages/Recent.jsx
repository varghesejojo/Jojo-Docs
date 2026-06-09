import { useEffect, useState } from "react";

import {
    Clock3,
    FileText,
} from "lucide-react";

import AppLayout from "../layouts/AppLayout";

import {
    getRecentDocuments,
} from "../services/documentService";
import DocumentList from "../components/DocumentList";


function Recent() {

    const [documents, setDocuments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);
    const [renameDoc, setRenameDoc] = useState(null);
    const [deleteDoc, setDeleteDoc] = useState(null);

    useEffect(() => {

        fetchRecentDocuments();

    }, []);

    const fetchRecentDocuments =
        async () => {

            try {

                const docs =
                    await getRecentDocuments();

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

                Loading...

            </AppLayout>
        );
    }

    return (
        <AppLayout>

            <div className="mb-10">

                <DocumentList
                    title="Recent Documents"
                    subtitle="Recently updated documents"
                    documents={documents}
                    onRename={setRenameDoc}
                    onDelete={setDeleteDoc}
                    fetchDocuments={fetchRecentDocuments}
                />

            </div>

        </AppLayout>
    );
}

export default Recent;