"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Avatar, Dropdown, Button, Table, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
interface TimesheetEntry {
  user: string;
  photo: string;
  date: string;
  startTime: string;
  status: string;
}

const TimesheetView: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const entries: TimesheetEntry[] = [
    {
      user: "Arav",
      photo: "/placeholder.svg",
      date: "2024-11-22",
      startTime: "11:16:03 PM",
      status: "ongoing",
    },
    {
      user: "Simran Narang",
      photo: "/placeholder.svg",
      date: "2024-11-22",
      startTime: "10:28:55 PM",
      status: "ongoing",
    },
    {
      user: "Kamini",
      photo: "/placeholder.svg",
      date: "2024-11-22",
      startTime: "9:24:37 PM",
      status: "ongoing",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <div className="mb-8">
        <Button   onClick={() => navigate(-1)} outline pill>
          <span className="mr-2">←</span>
          Back
        
        </Button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mb-8">View Timesheet</h1>

      {/* Date Pickers and Apply Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Start Date Picker */}
        <TextInput
          type="date"
          className="w-64"
          value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />

        {/* End Date Picker */}
        <TextInput
          type="date"
          className="w-64"
          value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />

        {/* Apply Button */}
        <Button color="success" className="sm:w-[100px]">
          Apply
        </Button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <TextInput
          placeholder="Search by username"
          type="text"
          className="w-64"
        />
      </div>

      {/* Timesheet Table */}
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>USER</Table.HeadCell>
            <Table.HeadCell>PHOTO START</Table.HeadCell>
            <Table.HeadCell>LOCATION START</Table.HeadCell>
            <Table.HeadCell>DATE</Table.HeadCell>
            <Table.HeadCell>START TIME</Table.HeadCell>
            <Table.HeadCell>END TIME</Table.HeadCell>
            <Table.HeadCell>PHOTO END</Table.HeadCell>
            <Table.HeadCell>LOCATION END</Table.HeadCell>
            <Table.HeadCell>TOTAL HOURS</Table.HeadCell>
            <Table.HeadCell>STATUS</Table.HeadCell>
            <Table.HeadCell>ACT</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {entries.map((entry, index) => (
              <Table.Row key={index} className="bg-white">
                <Table.Cell>{entry.user}</Table.Cell>
                <Table.Cell>
                  <Avatar img={entry.photo} rounded={true} size="sm">
                    <span className="sr-only">{entry.user}</span>
                  </Avatar>
                </Table.Cell>
                <Table.Cell>
                  <Button color="link" size="xs">
                    View
                  </Button>
                </Table.Cell>
                <Table.Cell>{entry.date}</Table.Cell>
                <Table.Cell>{entry.startTime}</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>
                  <Button color="link" size="xs">
                    View
                  </Button>
                </Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>{entry.status}</Table.Cell>
                <Table.Cell>
                  <Dropdown label="⋮" size="sm">
                    <Dropdown.Item>Action 1</Dropdown.Item>
                    <Dropdown.Item>Action 2</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default TimesheetView;
