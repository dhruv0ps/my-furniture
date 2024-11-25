import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";

import { Table, Button, Textarea, Dropdown,Card ,Modal,TextInput,Label} from "flowbite-react";
import { useNavigate } from "react-router-dom";
export default function RouteDetails() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const deliveries = [
        {
          orderId: "BT24091401",
          status: "Processing (shipping)",
          customer: "Selluck",
          products: "0000014945 *1",
          dueAmount: "$226.00",
        },
        // Add more delivery data here...
      ];
  return (
    <div className="container mx-auto p-4 max-w-6xl">
    
      

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Button color="light" className=" w-16 flex items-center"  onClick={() => navigate(-1)}>
          <HiArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <div className="flex items-center justify-between w-full sm:w-auto">
          <h1 className="text-2xl font-semibold">Route Details</h1>
          <Button color="info">Edit</Button>
        </div>
      </div>

      <div className="space-y-8">
     
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-[140px,1fr] items-center">
              <span className="text-sm text-gray-500">Route Name</span>
              <span>Route 2024-09-16</span>
            </div>
            <div className="grid grid-cols-[140px,1fr] items-center">
              <span className="text-sm text-gray-500">Route Date</span>
              <span>2024-09-16</span>
            </div>
            <div className="grid grid-cols-[140px,1fr] items-center">
              <span className="text-sm text-gray-500">Route ID</span>
              <span>R16SEP2024B</span>
            </div>
            <div className="grid grid-cols-[140px,1fr] items-center">
              <span className="text-sm text-gray-500">Starting waypoint</span>
              <span className="text-gray-500">Not Selected</span>
            </div>
            <div className="grid grid-cols-[140px,1fr] items-center">
              <span className="text-sm text-gray-500">Assigned Team</span>
              <span className="text-gray-500">Not Assigned</span>
            </div>
            <div className="grid grid-cols-[140px,1fr] items-center">
              <span className="text-sm text-gray-500">Assigned Truck</span>
              <span className="text-gray-500">Not Assigned</span>
            </div>
            <div className="grid grid-cols-[140px,1fr] items-center">
              <span className="text-sm text-gray-500">Phase</span>
              <Dropdown label="Draft">
                <Dropdown.Item>Draft</Dropdown.Item>
                <Dropdown.Item>In Progress</Dropdown.Item>
                <Dropdown.Item>Completed</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Comments</h2>
          <div className="text-gray-500 mb-4 text-center py-4">No comments yet</div>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your comment"
              className="min-h-[100px] resize-none"
            />
            <Button color="purple" className="w-full">
              Add Comment
            </Button>
          </div>
        </div>

      
        <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-6">Delivery Stops</h2>

      
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>ORDER ID</Table.HeadCell>
            <Table.HeadCell>STATUS</Table.HeadCell>
            <Table.HeadCell>CUSTOMER</Table.HeadCell>
            <Table.HeadCell className="hidden lg:table-cell">PRODUCTS</Table.HeadCell>
            <Table.HeadCell>DUE AMT.</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {deliveries.map((delivery) => (
              <Table.Row key={delivery.orderId} className="whitespace-nowrap">
                <Table.Cell className="font-medium">{delivery.orderId}</Table.Cell>
                <Table.Cell>{delivery.status}</Table.Cell>
                <Table.Cell>{delivery.customer}</Table.Cell>
                <Table.Cell className="hidden lg:table-cell">{delivery.products}</Table.Cell>
                <Table.Cell>{delivery.dueAmount}</Table.Cell>
                <Table.Cell>
                  <Button color="info" size="sm">
                    Edit Route
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

     
      <div className="md:hidden space-y-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.orderId} className="border rounded-lg shadow-sm">
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{delivery.orderId}</p>
                  <p className="text-sm text-gray-500">{delivery.customer}</p>
                </div>
                <Button color="info" size="sm">
                  Edit Route
                </Button>
              </div>
              <div className="text-sm">
                <p>Status: {delivery.status}</p>
                <p>Due Amount: {delivery.dueAmount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>

      
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Custom Added Stops</h2>
            <Button color="info"   onClick={() => setIsOpen(true)}>+ Add Stop</Button>
          </div>
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
      </div>
    </div>
  );
}
