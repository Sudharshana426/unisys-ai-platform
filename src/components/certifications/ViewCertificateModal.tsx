
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from 'lucide-react';

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

  const handleDownload = () => {
    if (certificate.fileURL) {
      const link = document.createElement('a');
      link.href = certificate.fileURL;
      link.download = certificate.fileName || 'certificate.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Certificate: {certificate.name}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          {certificate.fileURL && (
            certificate.fileURL.endsWith('.pdf') ? (
              <iframe 
                src={certificate.fileURL} 
                className="w-full h-[500px]" 
                title={certificate.name}
              />
            ) : (
              <img 
                src={certificate.fileURL} 
                alt={certificate.name} 
                className="max-w-full max-h-[500px] object-contain"
              />
            )
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={handleDownload} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCertificateModal;
