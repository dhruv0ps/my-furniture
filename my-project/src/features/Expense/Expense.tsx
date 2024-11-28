import React, { useState } from "react"
import { Button, Table, Select, TextInput, Card } from "flowbite-react"
import { HiEye, HiPencil, HiTrash, HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from 'lucide-react'

interface Expense {
  title: string
  category: "STORE EXPENSE" | "TRUCK FUEL"
  number: string
  date: string
  time: string
  receipt?: string
}

const expenses: Expense[] = [
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
]

const ExpenseList: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const handleEdit = (expenseNumber: string) => {
    console.log("Edit", expenseNumber)
  }

  const handleView = (expenseNumber: string) => {
    console.log("View", expenseNumber)
  }

  const handleDelete = (expenseNumber: string) => {
    console.log("Delete", expenseNumber)
  }

  const handleApplyFilter = () => {
    console.log("Applying filters:", { startDate, endDate, category })
  }

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <Button color="gray" onClick={() => navigate(-1)} className="gap-2 w-full sm:w-auto">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Expense List</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Start Date</label>
          <TextInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">End Date</label>
          <TextInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Category</label>
          <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="store">Store Expense</option>
            <option value="truck">Truck Fuel</option>
          </Select>
        </div>

        <div className="flex items-end">
          <Button color="blue" onClick={handleApplyFilter} className="w-full">
            Apply
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
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
              {expenses.map((expense, index) => (
                <Table.Row key={index} className="hover:bg-gray-50">
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button size="xs" color="info" onClick={() => handleEdit(expense.number)}>
                        <HiPencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button size="xs" color="purple" onClick={() => handleView(expense.number)}>
                        <HiEye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button size="xs" color="failure" onClick={() => handleDelete(expense.number)}>
                        <HiTrash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="font-medium">{expense.title}</Table.Cell>
                  <Table.Cell>{expense.category}</Table.Cell>
                  <Table.Cell>{expense.number}</Table.Cell>
                  <Table.Cell>{expense.date}</Table.Cell>
                  <Table.Cell>{expense.time}</Table.Cell>
                  <Table.Cell>{expense.receipt || "-"}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {expenses.map((expense, index) => (
          <Card key={index}>
            <div className="flex justify-end gap-2 mb-4">
              <Button size="xs" color="info" onClick={() => handleEdit(expense.number)}>
                <HiPencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button size="xs" color="purple" onClick={() => handleView(expense.number)}>
                <HiEye className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
              <Button size="xs" color="failure" onClick={() => handleDelete(expense.number)}>
                <HiTrash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-600">Title</div>
                <div className="font-medium">{expense.title}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Category</div>
                <div>{expense.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Expense Number</div>
                <div>{expense.number}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div>{expense.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Time</div>
                  <div>{expense.time}</div>
                </div>
              </div>
              {expense.receipt && (
                <div>
                  <div className="text-sm text-gray-600">Receipt</div>
                  <div>{expense.receipt}</div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {expenses.length === 0 && (
        <Card className="text-center py-8">
          <p className="text-gray-600">No expenses found</p>
        </Card>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <Button
          color="gray"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="gap-2"
        >
          <HiChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          color="gray"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="gap-2"
        >
          Next
          <HiChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ExpenseList