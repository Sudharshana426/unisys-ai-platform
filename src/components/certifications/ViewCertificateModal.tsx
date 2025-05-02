import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ViewCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    name: string;
    fileURL: string;
    fileName: string;
  } | null;
}

const ViewCertificateModal = ({ isOpen, onClose, certificate }: ViewCertificateModalProps) => {
  if (!certificate) return null;

  const isPDF = certificate.fileName.toLowerCase().endsWith('.pdf');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[600px]">
        <DialogHeader>
          <DialogTitle>{certificate.name}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full overflow-hidden">
          {isPDF ? (
            <iframe
              src={certificate.fileURL}
              className="w-full h-full"
              title={certificate.name}
            />
          ) : (
            <img
              src={certificate.fileURL}
              alt={certificate.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCertificateModal;
