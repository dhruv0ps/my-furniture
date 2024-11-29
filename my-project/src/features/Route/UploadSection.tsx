import { useState, useCallback, useRef } from "react";
import { Button, Modal } from "flowbite-react";
import { Cloud, X, Camera, ImageIcon } from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((uploadedFiles: FileList) => {
    const newFiles = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setShowUploadDialog(false);

    // Simulate upload progress
    newFiles.forEach((fileObj) => {
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id === fileObj.id) {
              const newProgress = Math.min(f.progress + 20, 100);
              if (newProgress === 100) clearInterval(interval);
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 500);
    });
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      const removed = prev.find((f) => f.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return filtered;
    });
  };

  const handleUploadClick = () => {
    setShowUploadDialog(true);
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
    setShowUploadDialog(false);
  };

  const handleCameraSelect = () => {
    cameraInputRef.current?.click();
    setShowUploadDialog(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <div className="flex-1 p-4">
      
      
        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <Cloud className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Tap here to upload</p>
          <p className="text-sm text-gray-400 mt-1">Max file size 5MB</p>
        </div>

    
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />

    
        {files.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            {files.map((file) => (
              <div key={file.id} className="relative aspect-square">
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                  <span className="text-white font-semibold">
                    {file.progress}%
                  </span>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute -top- -right-2 p-1 shadow-lg"
                  style={{ backgroundColor : "red"}}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <Modal show={showUploadDialog} onClose={() => setShowUploadDialog(false)}>
        <Modal.Header>Choose upload method</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleCameraSelect}
              className="h-24 flex flex-col items-center justify-center gap-2"
            >
              <Camera className="h-8 w-8" />
              Camera
            </Button>
            <Button
              onClick={handleGallerySelect}
              className="h-24 flex flex-col items-center justify-center gap-2"
            >
              <ImageIcon className="h-8 w-8" />
              Gallery
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      
    </div>
  );
}
