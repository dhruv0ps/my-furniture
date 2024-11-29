import React, { useState } from "react";
import { Button, TextInput, Select, Textarea, Card } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown,ArrowLeft } from "lucide-react";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState({
    productName: "",
    productSKU: "",
    uid: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    paymentMode: "",
    paymentAmount: "",
  });

  const [preview, setPreview] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleExpandSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleDeliveryUpdate = () => {
    setPreview((prev) => `${prev}\nDelivery Details Updated`);
  };

  const handlePaymentUpdate = () => {
    setPreview((prev) => `${prev}\nPayment Details Updated`);
  };

  const handleUpdateOrder = () => {
    alert("Order Updated Successfully!");
    navigate("/orders");
  };

  return (
    <div className="container overflow-y-auto mx-auto py-6 px-4 flex-grow space-y-4 mt-2 mb-16">
     <Button
      color="light"
      onClick={() => window.history.back()}
      className="w-20 h-10 mb-2 flex items-center gap-2 p-4"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </Button>

      {/* Order Details */}
      <Card className="border rounded-lg">
        <div className="relative">
          <button
            className="absolute top-0 right-0"
            onClick={() => toggleExpandSection("orderDetails")}
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedSection === "orderDetails" ? "rotate-180" : ""
              }`}
            />
          </button>
          <div>
            <h1 className="font-semibold text-lg text-purple-700">Order Details</h1>
            <p>
              <strong>Order ID:</strong> {orderId} 200020020
            </p>
            <p>
              <strong>Customer Name:</strong> Chandni Patel
            </p>
            <p>
              <strong>Customer Phone:</strong> 1234567890
            </p>
          </div>
          {expandedSection === "orderDetails" && (
            <div className="mt-4 text-sm text-gray-600 space-y-2">
              <p>
                <strong>Shipping Address:</strong> 1234 Elm Street, City
              </p>
              <p>
                <strong>Due Amount:</strong> $550.00
              </p>
              <p>
                <strong>Created By:</strong> Rishabh
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Delivery Details */}
      <Card className="border rounded-lg">
        <div className="relative">
          <button
            className="absolute top-0 right-0"
            onClick={() => toggleExpandSection("deliveryDetails")}
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedSection === "deliveryDetails" ? "rotate-180" : ""
              }`}
            />
          </button>
          <div>
            <h2 className="font-semibold text-lg text-purple-700">Delivery Details</h2>
          </div>
          {expandedSection === "deliveryDetails" && (
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  placeholder="Product Name"
                  value={deliveryDetails.productName}
                  onChange={(e) =>
                    setDeliveryDetails({
                      ...deliveryDetails,
                      productName: e.target.value,
                    })
                  }
                />
                <TextInput
                  placeholder="Product SKU"
                  value={deliveryDetails.productSKU}
                  onChange={(e) =>
                    setDeliveryDetails({
                      ...deliveryDetails,
                      productSKU: e.target.value,
                    })
                  }
                />
                <TextInput
                  placeholder="Enter/Edit UID"
                  value={deliveryDetails.uid}
                  onChange={(e) =>
                    setDeliveryDetails({ ...deliveryDetails, uid: e.target.value })
                  }
                />
              </div>
              <Button color="purple" className="w-full" onClick={handleDeliveryUpdate}>
                Update Delivery Details
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Payment Details */}
      <Card className="border rounded-lg">
        <div className="relative">
          <button
            className="absolute top-0 right-0"
            onClick={() => toggleExpandSection("paymentDetails")}
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedSection === "paymentDetails" ? "rotate-180" : ""
              }`}
            />
          </button>
          <div>
            <h2 className="font-semibold text-lg text-purple-700">Payment Details</h2>
          </div>
          {expandedSection === "paymentDetails" && (
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  defaultValue=""
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, paymentMode: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Payment Mode
                  </option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </Select>
                <TextInput
                  placeholder="Payment Amount"
                  type="number"
                  value={paymentDetails.paymentAmount}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      paymentAmount: e.target.value,
                    })
                  }
                />
              </div>
              <Button color="purple" className="w-full" onClick={handlePaymentUpdate}>
                Update Payment Details
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Preview Section */}
      <Card className="border rounded-lg">
        <h2 className="font-semibold text-lg text-purple-700">Preview</h2>
        <Textarea
          rows={5}
          value={preview}
          readOnly
          placeholder="Preview of changes will appear here..."
        />
      </Card>

      {/* Update Order Button */}
      <div className="flex justify-end">
        <Button color="purple" onClick={handleUpdateOrder}>
          Update Order
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
