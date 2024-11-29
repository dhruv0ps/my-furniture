import  { useState } from "react";
import { Button, Card } from "flowbite-react";
import { ArrowLeft, ChevronDown, MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface Stop {
  orderNumber: string;
  status: string;
  customer: {
    name: string;
    address: string;
    unit: string;
    zipcode: string;
  };
  products: Array<{
    name: string;
    quantity: number;
  }>;
  dueAmount: number;
}

interface RouteDetailsProps {
  id: string;
  date: string;
  start: string;
  truck: string;
  stops: Stop[];
}

export default function RouteDetails() {
  const [expandedStop, setExpandedStop] = useState<string | null>(null); 
const navigate = useNavigate();

  const routeDetails: RouteDetailsProps = {
    id: "R16SEP2024B",
    date: "2024-09-16",
    start: "600 Matheson Blvd",
    truck: "DAZT882",
    stops: [
      {
        orderNumber: "HI24112801",
        status: "Processing",
        customer: {
          name: "Shantanu Singh Bharadwaj",
          address: "578 Linden Dr, Cambridge",
          unit: "Unit 19, Buzzcode 123",
          zipcode: "N3H5L5",
        },
        products: [
          { name: "Transformers Sofa Set", quantity: 3 },
          { name: "Transformers Love Seat", quantity: 2 },
          { name: "Bombay Bedroom Set", quantity: 1 },
        ],
        dueAmount: 2800,
      },
      {
        orderNumber: "HI24112802",
        status: "Completed",
        customer: {
          name: "John Doe",
          address: "123 Elm St, Waterloo",
          unit: "Unit 12, Buzzcode 456",
          zipcode: "N2L3G1",
        },
        products: [
          { name: "Dining Table Set", quantity: 1 },
          { name: "Office Chair", quantity: 5 },
        ],
        dueAmount: 1500,
      },
      {
        orderNumber: "HI24112803",
        status: "Pending",
        customer: {
          name: "Aisha Smith",
          address: "45 Pine St, Toronto",
          unit: "Unit 5, Buzzcode 789",
          zipcode: "M4B1B5",
        },
        products: [
          { name: "Queen Size Bed", quantity: 2 },
          { name: "Nightstand", quantity: 4 },
          { name: "Dresser", quantity: 1 },
        ],
        dueAmount: 2200,
      },
      {
        orderNumber: "HI24112804",
        status: "Processing",
        customer: {
          name: "Michael Johnson",
          address: "90 Maple Ave, Mississauga",
          unit: "Unit 10, Buzzcode 321",
          zipcode: "L5B4M7",
        },
        products: [
          { name: "Leather Sofa", quantity: 1 },
          { name: "Coffee Table", quantity: 1 },
          { name: "TV Stand", quantity: 2 },
        ],
        dueAmount: 3100,
      },
      {
        orderNumber: "HI24112805",
        status: "Processing",
        customer: {
          name: "Emily Chen",
          address: "200 Main St, Brampton",
          unit: "Unit 8, Buzzcode 654",
          zipcode: "L6V2Z9",
        },
        products: [
          { name: "Sectional Sofa", quantity: 1 },
          { name: "Accent Chair", quantity: 2 },
          { name: "Dining Table", quantity: 1 },
        ],
        dueAmount: 2700,
      },
    ],
  };
  

  const toggleExpandStop = (orderNumber: string) => {
    setExpandedStop(expandedStop === orderNumber ? null : orderNumber);
  };

  return (
    <div className="min-h-screen flex flex-col">
    {/* Back Button */}
    <Button
      color="light"
      onClick={() => window.history.back()}
      className="w-20 h-10 mb-2 flex items-center gap-2 p-4"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </Button>

    {/* Route Details Header */}
    <div className="bg-gray-400 border rounded-lg text-white py-4 px-6">
      <div className="flex justify-between text-sm">
        <p>Date: {routeDetails.date}</p>
        <p>ID: {routeDetails.id}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p>Start: {routeDetails.start}</p>
        <p>Truck: {routeDetails.truck}</p>
      </div>
    </div>

    
    <div className="container overflow-y-auto mx-auto py-6 px-4 flex-grow space-y-4 mt-2 mb-16"> 
      {routeDetails.stops.map((stop) => (
        <Card key={stop.orderNumber} className="border rounded-lg">
          <div className="relative">
           
            <button
              className="absolute top-0 right-0"
              onClick={() => toggleExpandStop(stop.orderNumber)}
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedStop === stop.orderNumber ? "rotate-180" : ""
                }`}
              />
            </button>
            <div>
              <p className="font-semibold text-lg text-purple-700">{stop.orderNumber} | {stop.status}</p>
              <p className="text-sm font-semibold text-purple-700">{stop.customer.name}</p>
              <p className="text-sm text-gray-600">
                {stop.customer.address}, {stop.customer.unit}, {stop.customer.zipcode}
              </p>
            </div>

            {/* Expanded Details */}
            {expandedStop === stop.orderNumber && (
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {stop.products.map((product, index) => (
                  <p key={index}>
                    {product.name} QTY {product.quantity}
                  </p>
                ))}
                <p className="text-red-500 font-bold">DUE AMOUNT: ${stop.dueAmount}</p>
                <Button
                  color="purple"
                  className="w-full hover:bg-purple-700 mt-4"
                  onClick={() => navigate(`/routes/orderitem`)}
                >
                  PROCESS ORDER →
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>

    {/* Fixed Footer */}
    <div className="bg-white shadow  bottom-0 left-0 right-0 flex justify-between mt-6 ">
      <Button
        color="purple"
        className="flex items-center justify-center gap-2 w-1/2 mr-2"
      >
        <MapPin className="w-5 h-5" />
        OPEN IN MAP
      </Button>
      <Button
        color="purple"
        className="flex items-center justify-center gap-2 w-1/2 ml-2"
        onClick={() => navigate(`/gasstop`)}
      >
        <Plus className="w-5 h-5 " />
        ADD GAS STOP
      </Button>
    </div>
  </div>
  );
}
