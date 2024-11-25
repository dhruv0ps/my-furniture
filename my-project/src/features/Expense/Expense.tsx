import React, { useState } from "react";
import { Button, Table, Select, TextInput } from "flowbite-react";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
const ExpenseList: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Expense List</h1>
      <Button  color="gray" onClick={() => navigate(-1)} className="gap-2" >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col gap-1  sm:w-[200px]">
          <label className="text-sm text-gray-600">Start Date</label>
          <TextInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1  sm:w-[200px]">
          <label className="text-sm text-gray-600">End Date</label>
          <TextInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1  sm:w-[200px]">
          <label className="text-sm text-gray-600">Category</label>
          <Select id="category">
            <option value="">All Categories</option>
            <option value="store">Store Expense</option>
            <option value="truck">Truck Fuel</option>
          </Select>
        </div>

        <div className="flex items-end  sm:w-auto">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            Apply
          </Button>
        </div>
      </div>

    
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <Table.Head>
          <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Expense Number</Table.HeadCell>
            <Table.HeadCell>Expense Date</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>Receipt</Table.HeadCell>
            
          </Table.Head>
          <Table.Body>
            {[ 
              {
                title: "Store Supplies Paper for printing",
                category: "STORE EXPENSE",
                number: "EXP08112024001",
                date: "11/8/2024",
                time: "16:00",
              },
              {
                title: "Fuel Expense",
                category: "TRUCK FUEL",
                number: "EXP04112024001",
                date: "11/4/2024",
                time: "10:53",
              },
            ].map((expense, index) => (
              <Table.Row key={index} className="hover:bg-gray-50">
                <Table.Cell>
                  <div className="flex gap-2">
                    {/* Action Buttons */}
                    <Button size="xs" color="blue" onClick={() => console.log("Edit", expense.number)}>
                      <HiPencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button size="xs" color="purple" onClick={() => console.log("View", expense.number)}>
                      <HiEye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button size="xs" color="failure" onClick={() => console.log("Delete", expense.number)}>
                      <HiTrash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell>{expense.title}</Table.Cell>
                <Table.Cell>{expense.category}</Table.Cell>
                <Table.Cell>{expense.number}</Table.Cell>
                <Table.Cell>{expense.date}</Table.Cell>
                <Table.Cell>{expense.time}</Table.Cell>
                <Table.Cell>-</Table.Cell>
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {/* Adjust pagination as needed */}
      {/* Example pagination implementation */}
      {/* You can uncomment and customize the following section if needed */}
      {/* 
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Go to page:", page)}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
      />
      */}
    </div>
  );
};

export default ExpenseList;