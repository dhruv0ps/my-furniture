import React, { useState } from "react";
import { Button, TextInput, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Phone, MapPin, DollarSign, CheckCircle, Clock } from 'lucide-react';

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  dueAmount: string;
  isDelivered: boolean;
};

const initialOrders: Order[] = [
  {
    id: "HT24112503",
    customerName: "Chandni Patel",
    customerPhone: "1234567890",
    shippingAddress: "1234 Elm Street, City",
    dueAmount: "$550.00",
    isDelivered: false,
  },
  {
    id: "HT24112504",
    customerName: "Rishabh Singh",
    customerPhone: "9876543210",
    shippingAddress: "5678 Oak Street, City",
    dueAmount: "$0.00",
    isDelivered: true,
  },
];

const OrdersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery) {
      setOrders(initialOrders);
      return;
    }

    const filteredOrders = initialOrders.filter(
      (order) =>
        order.id.includes(searchQuery) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery)
    );
    setOrders(filteredOrders);
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div className="p-4">
      <Button color="light" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
  
      <div className="mb-6 flex flex-col gap-2">
        <TextInput
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Button color="purple" onClick={handleSearch} className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className={`cursor-pointer ${
              order.isDelivered ? "bg-green-50" : "bg-white"
            }`}
            onClick={() => handleOrderClick(order.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{order.id}</span>
              <span className={`text-sm ${order.isDelivered ? "text-green-600" : "text-yellow-600"}`}>
                {order.isDelivered ? (
                  <><CheckCircle className="inline mr-1 h-4 w-4" /> Delivered</>
                ) : (
                  <><Clock className="inline mr-1 h-4 w-4" /> Pending</>
                )}
              </span>
            </div>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-gray-600 flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              {order.customerPhone}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {order.shippingAddress}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Due: {order.dueAmount}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;

