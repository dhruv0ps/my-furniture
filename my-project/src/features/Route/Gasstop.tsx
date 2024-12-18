import { useState } from "react";
import { HiPlus,HiArrowLeft } from "react-icons/hi";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const CustomStopsHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
        
        <div className="mb-6">
        <Button
          color="light"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <HiArrowLeft className="h-5 w-5" />
          Back
        </Button>
      </div>
      
        <h2 className="text-lg font-semibold text-center md:text-left">Custom Added Stops</h2>

       
        <Button
          color="purple"
          onClick={() => setIsOpen(true)}
          className="flex items-center w-full md:w-auto"
        >
          <HiPlus className="mr-2 h-5 w-5" />
          Add Stop
        </Button>
      </div>

      <Modal
        show={isOpen}
        size="md"
        onClose={() => setIsOpen(false)}
      >
       
        <Modal.Header>
          <div className="flex items-center justify-between">
            <span>Add Custom Stop</span>
          </div>
        </Modal.Header>

        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsOpen(false);
              // Add form submission logic here
            }}
            className="space-y-4"
          >
            
            <div>
              <Label htmlFor="reason" value="Reason:" />
              <TextInput id="reason" type="text" placeholder="Enter reason" required />
            </div>

            {/* Person Input */}
            <div>
              <Label htmlFor="person" value="Person:" />
              <TextInput id="person" type="text" placeholder="Enter person name" required />
            </div>

            {/* Address Input */}
            <div>
              <Label htmlFor="address" value="Select Address:" />
              <TextInput id="address" placeholder="Enter a location" required />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <Button type="submit" color="purple" className="w-full md:w-auto">
                Confirm
              </Button>
              <Button
                type="button"
                color="gray"
                onClick={() => setIsOpen(false)}
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomStopsHeader;
