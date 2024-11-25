import  { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
export default function CustomStopsHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between py-4">
      <Button color="light" onClick={() => navigate(-1)}>
        Back
      </Button>
        <h2 className="text-lg font-semibold">Custom Added Stops</h2>
    

       
        <Button
          color="purple"
          onClick={() => setIsOpen(true)}
          className="flex items-center"
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
            }}
            className="space-y-4"
          >
          
            <div>
              <Label htmlFor="reason" value="Reason:" />
              <TextInput id="reason" type="text" />
            </div>

            <div>
              <Label htmlFor="person" value="Person:" />
              <TextInput id="person" type="text" />
            </div>

  
            <div>
              <Label htmlFor="address" value="Select Address:" />
              <TextInput id="address" placeholder="Enter a location" />
            </div>

            <div className="flex gap-3 mt-4">
              <Button type="submit" color="purple">
                Confirm
              </Button>
              <Button
                type="button"
                color="gray"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
