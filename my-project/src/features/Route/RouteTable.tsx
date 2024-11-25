"use client";


import { HiDotsVertical, HiChatAlt } from "react-icons/hi";
import { Table, Dropdown, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
const routes = [
  {
    id: "R16SEP2024B",
    date: "2024-09-16",
    stops: 1,
    mode: "Draft",
    status: "Pending",
    comments: 0,
  },
  {
    id: "R20SEP2024A",
    date: "2024-09-20",
    stops: 1,
    mode: "Finalized",
    status: "Pending",
    comments: 0,
  },
  {
    id: "R21SEP2024A",
    date: "2024-09-21",
    stops: 3,
    mode: "Draft",
    status: "Pending",
    comments: 0,
  },
  {
    id: "R22SEP2024A",
    date: "2024-09-22",
    stops: 1,
    mode: "Draft",
    status: "Pending",
    comments: 0,
  },
  {
    id: "R23SEP2024A",
    date: "2024-09-23",
    stops: 1,
    mode: "Draft",
    status: "Pending",
    comments: 0,
  },
];

export default function RouteTable() {
    const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <Button color="light" onClick={() => navigate(-1)}>
        Back
      </Button>

      <div className="rounded-md border overflow-x-auto">

        <Table>
          <Table.Head>
            <Table.HeadCell>ROUTE ID</Table.HeadCell>
            <Table.HeadCell>ROUTE DATE</Table.HeadCell>
            <Table.HeadCell>DELIVERY STOPS</Table.HeadCell>
            <Table.HeadCell>MODE</Table.HeadCell>
            <Table.HeadCell>ROUTE STATUS</Table.HeadCell>
            <Table.HeadCell>COMMENTS</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {routes.map((route) => (
              <Table.Row key={route.id}>
                <Table.Cell className="font-medium">{route.id}</Table.Cell>
                <Table.Cell>{route.date}</Table.Cell>
                <Table.Cell>{route.stops}</Table.Cell>
                <Table.Cell>{route.mode}</Table.Cell>
                <Table.Cell>{route.status}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-1">
                    <HiChatAlt className="h-4 w-4" />
                    <span>{route.comments}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end gap-2">
                   
                    <Button color="info" size="sm" onClick={() => navigate(`/routedetails`)}>
                      View stops
                    </Button>
                  
                    <Button color="warning" size="sm">
                    View Directions
                    </Button>
                    <Button color="warning" size="sm" onClick={() => navigate(`/gasstop`)}>
                    Add Gas Stop
                    </Button>
                   
                    <Dropdown
                      inline={true}
                      label={
                        <HiDotsVertical className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                      }
                    >
                      <Dropdown.Item>View Stops</Dropdown.Item>
                      <Dropdown.Item>View Directions</Dropdown.Item>
                      <Dropdown.Item>Add Gas Stop</Dropdown.Item>
                    </Dropdown>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
