import { useCallback } from "react";
import { jsPDF } from "jspdf";

const useDownloadDocument = (documents, showError) => {
  const downloadDocument = useCallback((docId) => {
    const doc = new jsPDF();
    const documentData = documents.find(doc => doc._id === docId);

    if (!documentData) {
      showError('Download failed', 'Document not found.');
      return;
    }

    const text = documentData.content || "No content available";
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    const margin = 10;
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 7;

    const lines = doc.splitTextToSize(text, maxWidth);

    let y = margin;

    lines.forEach(line => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save(`${documentData.title || 'document'}.pdf`);
  }, [documents, showError]);

  return downloadDocument;
};

export default useDownloadDocument;
