import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "flowbite-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Timesheet: React.FC = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment", // Use back camera for mobile
  };

  const startCamera = (actionType: string) => {
    setCameraActive(true);
    setCurrentAction(actionType);
  };

  const stopCamera = () => {
    setCameraActive(false);
    setCurrentAction(null);
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(`Captured photo for ${currentAction}:`, imageSrc);

      // Show notification
      toast.success(`Photo captured for ${currentAction} successfully!`);

      // Handle the captured image (e.g., upload or save)
    }
    stopCamera();
  };

  return (
    <div className="container mx-auto p-4 max-w-full">
      {/* Toast Notification Container */}
      <ToastContainer />

      <div className="mb-8">
        <Button
          color="light"
          pill
          onClick={() => navigate(-1)}
          className="-ml-4 flex items-center gap-2 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="p-6 bg-white border rounded-lg shadow flex-1">
          <h2 className="text-xl text-gray-600 mb-6 text-center">Mark Login</h2>
          <div className="flex justify-center items-center">
            <Button
              color="green"
              pill
              className="bg-green-500 flex justify-center items-center hover:bg-green-600 text-white"
              onClick={() => startCamera("Login")}
            >
              Mark Login
            </Button>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow flex-1 mt-2">
          <h2 className="text-xl text-gray-600 mb-6 text-center">Mark Logout</h2>
          <div className="flex justify-center items-center">
            <Button
              color="red"
              pill
              className="bg-red-700 text-white"
              onClick={() => startCamera("Logout")}
            >
              Mark Logout
            </Button>
          </div>
        </div>
      </div>

      {cameraActive && (
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-lg text-gray-700 mb-4">
            {currentAction === "Login" ? "Marking Login" : "Marking Logout"}
          </h3>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            className="border rounded-lg w-full h-auto max-w-md"
          />
          <div className="flex gap-4 mt-4">
            <Button
              color="blue"
              pill
              className=" text-white"
              onClick={capturePhoto}
            >
              Capture Photo
            </Button>
            <Button
              color="gray"
              pill
              className="bg-gray-500 hover:bg-gray-600 text-white"
              onClick={stopCamera}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timesheet;
