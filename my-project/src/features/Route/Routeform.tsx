import React, { useState } from "react";
import { format } from "date-fns";
import { HiArrowLeft, HiCalendar } from "react-icons/hi";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RouteForm: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    alert("Route added successfully!");
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          color="light"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <HiArrowLeft className="h-5 w-5" />
          Back
        </Button>
      </div>

      {/* Form Card */}
      <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white">
        <h1 className="text-xl md:text-2xl font-semibold text-center mb-6 overflow-y-auto">
          Add Route
        </h1>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          {/* Route Name */}
          <div className="space-y-2">
            <Label htmlFor="routeName">Route Name</Label>
            <TextInput
              id="routeName"
              type="text"
              placeholder="Enter route name"
              defaultValue="Route 2024-09-16"
              required
            />
          </div>

          {/* Route ID */}
          <div className="space-y-2">
            <Label htmlFor="routeId">Route ID</Label>
            <TextInput
              id="routeId"
              type="text"
              placeholder="Enter route ID"
              defaultValue="R16SEP2024B"
              required
            />
          </div>

          {/* Route Date */}
          <div className="space-y-2">
            <Label>Route Date</Label>
            <div className="relative">
              <Button
                color="gray"
                className="w-full text-left"
                onClick={() => handleDateChange(new Date())}
              >
                <HiCalendar className="mr-2 h-5 w-5" />
                {date ? format(date, "EEE MMM dd yyyy") : "Mon Sep 16 2024"}
              </Button>
            </div>
          </div>

          {/* Assign Team */}
          <div className="space-y-2">
            <Label>Assign Team</Label>
            <Select id="assignTeam" required>
              <option value="">Select a team</option>
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
              <option value="team3">Team 3</option>
            </Select>
          </div>

          {/* Start Location */}
          <div className="space-y-2">
            <Label htmlFor="startLocation">Start Location</Label>
            <TextInput
              id="startLocation"
              type="text"
              placeholder="Search Inventory locations"
              required
            />
          </div>

          {/* Truck */}
          <div className="space-y-2">
            <Label htmlFor="truck">Truck</Label>
            <TextInput
              id="truck"
              type="text"
              placeholder="Search Inventory locations"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            ADD Route
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RouteForm;
