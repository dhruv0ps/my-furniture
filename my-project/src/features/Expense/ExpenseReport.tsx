

import React, { useState, FormEvent } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
const ExpenseReport: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const navigate = useNavigate();
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

   
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Category:", category);
  };

  return (
    <div className="max-w-3xl  mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">Expense Report</h1>
      <Button  color="gray" onClick={() => navigate(-1)} className="gap-2" >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      <form className="space-y-6" onSubmit={handleFormSubmit}>
       
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date:</Label>
          <TextInput
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Select a start date"
            required
          />
        </div>

      
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date:</Label>
          <TextInput
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Select an end date"
            required
          />
        </div>

       
        <div className="space-y-2">
          <Label htmlFor="category">Select Category of Expense:</Label>
          <Select
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="store">Store Expense</option>
            <option value="truck">Truck Fuel</option>
            <option value="maintenance">Maintenance</option>
            <option value="other">Other</option>
          </Select>
        </div>


        <Button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700">
          Generate Report
        </Button>
      </form>
    </div>
  );
};

export default ExpenseReport;
