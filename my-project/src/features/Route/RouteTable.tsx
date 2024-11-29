import { Card, Dropdown, Button, Table, TextInput } from "flowbite-react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Route {
  id: string;
  name: string;
  date: string;
  start: string;
  truck: string;
}

export default function RouteCards() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);

  const routes: Route[] = [
    {
      id: "R16SEP2024B",
      name: "Route 2024-09-16",
      date: "2024-09-16",
      start: "600 Matheson Blvd",
      truck: "DAZT882",
    },
    {
      id: "R17SEP2024C",
      name: "Route 2024-09-17",
      date: "2024-09-17",
      start: "700 Matheson Blvd",
      truck: "DFRT123",
    },
    {
      id: "R18SEP2024D",
      name: "Route 2024-09-18",
      date: "2024-09-18",
      start: "800 Matheson Blvd",
      truck: "XYTR567",
    },
    {
      id: "R19SEP2024E",
      name: "Route 2024-09-19",
      date: "2024-09-19",
      start: "900 Matheson Blvd",
      truck: "ABCD999",
    },
  ];

  // Initialize filtered routes
  if (!filteredRoutes.length) setFilteredRoutes(routes);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
    const filtered = routes.filter(
      (route) =>
        route.id.toLowerCase().includes(searchQuery) ||
        route.name.toLowerCase().includes(searchQuery)
    );
    setFilteredRoutes(filtered);
  };

  const handleCardClick = (id: string) => {
    navigate(`/routedetails/${id}`);
  };

  // Mobile view with cards
  const MobileView = () => (
    <div className="space-y-2">
      {filteredRoutes.map((route, index) => (
        <Card
          key={index}
          className="border-2 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick(route.id)}
        >
          <div className="space-y-1">
            <p className="text-lg font-semibold text-purple-700">
              Name: <span className="text-black">{route.name}</span>
            </p>
            <p className="text-lg font-semibold text-purple-700">
              Date: <span className="text-black">{route.date}</span>
            </p>
            <p className="text-lg font-semibold text-purple-700">
              ID: <span className="text-black">{route.id}</span>
            </p>
            <p className="text-xs text-gray-600">
              Start: <span>{route.start}</span>
            </p>
            <p className="text-xs text-gray-600">
              Truck: <span>{route.truck}</span>
            </p>
          </div>
        </Card>
      ))}
    </div>
  );

  // Desktop view with table
  const DesktopView = () => (
    <Table>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Date</Table.HeadCell>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Start Location</Table.HeadCell>
        <Table.HeadCell>Truck</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {filteredRoutes.map((route, index) => (
          <Table.Row key={index}>
            <Table.Cell className="text-blue-800 font-bold">{route.name}</Table.Cell>
            <Table.Cell className="text-gray-700">{route.date}</Table.Cell>
            <Table.Cell className="text-gray-700">{route.id}</Table.Cell>
            <Table.Cell className="text-gray-500 text-xs">{route.start}</Table.Cell>
            <Table.Cell className="text-gray-500 text-xs">{route.truck}</Table.Cell>
            <Table.Cell>
              <Dropdown label="Actions" inline={true}>
                <Dropdown.Item>View Stops</Dropdown.Item>
                <Dropdown.Item>View Directions</Dropdown.Item>
                <Dropdown.Item>Add Gas Stop</Dropdown.Item>
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Back Button and Search Field */}
      <Button outline={true} size="sm" color="gray" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2  h-4 w-4" />
          Back
        </Button>
      <div className="mb-6 flex mt-4 flex-col md:flex-row gap-4 md:items-center justify-between">
        
        <TextInput
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-1/3"
        />
        <Button color="purple" onClick={handleSearch} className="w-full md:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {/* Mobile and Desktop Views */}
      <div className="block md:hidden overflow-y-auto">
        <MobileView />
      </div>
      <div className="hidden md:block">
        <DesktopView />
      </div>
    </div>
  );
}
