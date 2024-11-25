import React, { useState } from "react";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { ChevronLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddExpense:React.FC = () =>{
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size <= 1024 * 1024) {
        
        if (selectedFile.type.startsWith("image/")) {
          setFile(selectedFile);
        } else {
          alert("Only image files (PNG, JPG) are allowed.");
        }
      } else {
        alert("File size should not exceed 1MB.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with values:");
    alert("Expense submitted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
     
      <div className="flex items-center justify-between mb-6">
        <Button color="gray" onClick={() => navigate(-1)} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold">Add Expense</h1>
        <div className="w-[72px]" />
      </div>

   
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
        
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <TextInput id="title" required placeholder="Expense title" />
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Expense description" />
          </div>

   
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <TextInput
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount"
              required
            />
          </div>

         
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select id="category" required>
              <option value="">Select Category</option>
              <option value="store">Store Expense</option>
              <option value="truck">Truck Fuel</option>
              <option value="maintenance">Maintenance</option>
              <option value="other">Other</option>
            </Select>
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="date">Date of Expense</Label>
            <TextInput
              id="date"
              type="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>

       
          <div className="space-y-2">
            <Label htmlFor="time">Time of Expense</Label>
            <TextInput
              id="time"
              type="time"
              required
              defaultValue={new Date()
                .toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            />
          </div>

       
          <div className="space-y-2">
            <Label htmlFor="receipt">Add Receipt</Label>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
              onClick={() => document.getElementById("receipt")?.click()}
            >
              <input
                type="file"
                id="receipt"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="mt-2 flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400" />
                <p className="text-sm text-gray-500 mt-1">
                  {file ? file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-gray-500">PNG, JPG (MAX. 1MB)</p>
              </div>
            </div>
          </div>

        
          <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;