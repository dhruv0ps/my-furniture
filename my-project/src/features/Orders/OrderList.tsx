import React, { useState } from "react";
import { Button, TextInput, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

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
    <div className="p-6">
          <Button color="light" onClick={() => navigate(-1)}>
        Back
      </Button>
  
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <TextInput
          placeholder="Search by Order ID, Customer Name, or Phone Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2"
        />
        <Button color="purple" onClick={handleSearch} className="w-full md:w-auto">
          Search
        </Button>
      </div>

      
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Shipping Address</Table.HeadCell>
            <Table.HeadCell>Due Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {orders.map((order) => (
              <Table.Row
                key={order.id}
                className={`cursor-pointer ${
                  order.isDelivered ? "bg-green-100" : "bg-white"
                }`}
                onClick={() => handleOrderClick(order.id)}
              >
                <Table.Cell className="font-medium">{order.id}</Table.Cell>
                <Table.Cell>{order.customerName}</Table.Cell>
                <Table.Cell>{order.customerPhone}</Table.Cell>
                <Table.Cell>{order.shippingAddress}</Table.Cell>
                <Table.Cell>{order.dueAmount}</Table.Cell>
                <Table.Cell>
                  {order.isDelivered ? "Delivered" : "Pending"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default OrdersList;
