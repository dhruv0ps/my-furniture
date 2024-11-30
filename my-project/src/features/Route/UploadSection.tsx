import { useState, useCallback, useRef } from "react";
import { Button, Modal } from "flowbite-react";
import { Cloud, X, Camera, ImageIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    if (files.length + newFiles.length > 6) {
        toast.error("You can only upload a maximum of 6 images.");
      return;
    }

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
  }, [files]);

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
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-1 p-4">
      
      
      <div
        onClick={handleUploadClick}
        className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center cursor-pointer hover:border-blue-300 transition-colors bg-white shadow-sm"
      >
        <div className="bg-blue-50 rounded-full p-3 inline-block mb-4">
          <Cloud className="w-8 h-8 text-blue-500 mt-2" />
        </div>
        <p className="text-gray-700 font-medium mb-4">tap here to upload images</p>
       {/* <p className="text-xs text-gray-400 mt-2">Max file size 5MB</p> */}
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
          <div className="mt-8 grid grid-cols-3 gap-4 pt-4 ">
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
          className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 shadow-lg"
        >
          <X className="w-4 h-4" style={{backgroundColor:"Red"}} />
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
            color="purple"
              onClick={handleCameraSelect}
              className="h-24 flex flex-col items-center justify-center gap-2"
            >
              <Camera className="h-6 w-8 " />
              <p className="pt-1">Camera</p>
            </Button>
            <Button
            color="purple"
              onClick={handleGallerySelect}
              className="h-24 flex flex-col items-center justify-center gap-2"
            >
              <ImageIcon className="h-6 w-8" />
              <p className="pt-1">Gallery</p>
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      
    </div>
  );
}
