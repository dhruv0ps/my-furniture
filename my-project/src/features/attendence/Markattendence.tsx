import React from "react";
import { Button } from "flowbite-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Timesheet: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 max-w-full">
    
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


      <h1 className="text-2xl font-semibold text-center mb-12">Fill Timesheet</h1>

      <div className="flex flex-col md:flex-row gap-8">
      
        <div className="p-6 bg-white border rounded-lg shadow flex-1">
          <h2 className="text-xl text-gray-600 mb-6 text-center">Mark Login</h2>
          <Button
            color="green"
            pill
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Mark Login
          </Button>
        </div>

       
        <div className="p-6 bg-white border rounded-lg shadow flex-1">
          <h2 className="text-xl text-gray-600 mb-6 text-center">Mark Logout</h2>
          <Button color="red" pill>
            Mark Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timesheet;
