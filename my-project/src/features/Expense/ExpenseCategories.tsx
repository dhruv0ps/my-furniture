import React, { useState, FormEvent, ChangeEvent } from "react";
import { Button, TextInput, ListGroup, Card } from "flowbite-react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ExpenseCategories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(["STORE EXPENSE", "TRUCK FUEL"]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const navigate = useNavigate();
  const handleAddCategory = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim().toUpperCase()]);
      setNewCategory("");
    }
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value);
  };

  const handleNewCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewCategory(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-full mx-auto p-4 md:p-6">
    
      <div className="flex flex-row md:flex-col items-center justify-between gap-4 mb-6">
        <Button color="gray" className="gap-2" onClick={() => navigate(-1)} >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold text-center sm:text-left">
          Expense Categories
        </h1>
        <Button color="teal" className="w-full sm:w-auto" onClick={() => navigate("/expense/add")}>
          Add Expense
        </Button>
      </div>

      <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4 mb-6">
        <TextInput
          placeholder="New Category"
          value={newCategory}
          onChange={handleNewCategoryChange}
          className="flex-1"
        />
        <Button type="submit" color="purple" className="w-full md:w-auto px-8">
          Add Category
        </Button>
      </form>

     
      <div className="mb-6">
        <TextInput
          placeholder="Filter Categories"
          value={filterText}
          onChange={handleFilterChange}
          className="w-full"
        />
      </div>

     
      <Card>
        {filteredCategories.length > 0 ? (
          <ListGroup>
            {filteredCategories.map((category, index) => (
              <ListGroup.Item
                key={index}
                className="hover:bg-gray-50 transition-colors text-center md:text-left"
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="p-4 text-gray-500 text-center">No categories found.</p>
        )}
      </Card>
    </div>
  );
};

export default ExpenseCategories;
