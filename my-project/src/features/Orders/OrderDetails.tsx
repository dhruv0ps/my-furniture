import React, { useState } from "react";
import { Button, TextInput, Select, Textarea } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="p-6 space-y-6">
      
      <Button color="light" className="mb-4" onClick={() => navigate(-1)}>
        Back
      </Button>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <div className="border p-4 rounded-lg bg-gray-50">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Customer Name:</strong> Chandni Patel</p>
          <p><strong>Customer Phone Number:</strong> 1234567890</p>
          <p><strong>Shipping Address:</strong> 1234 Elm Street, City</p>
          <p><strong>Due Amount:</strong> $550.00</p>
          <p><strong>Customer Created By:</strong> Rishabh</p>
        </div>
      </div>

      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Delivery Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput
            placeholder="Product Name"
            value={deliveryDetails.productName}
            onChange={(e) =>
              setDeliveryDetails({ ...deliveryDetails, productName: e.target.value })
            }
          />
          <TextInput
            placeholder="Product SKU"
            value={deliveryDetails.productSKU}
            onChange={(e) =>
              setDeliveryDetails({ ...deliveryDetails, productSKU: e.target.value })
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
        <Button color="purple" onClick={handleDeliveryUpdate}>
          Update Delivery Details
        </Button>
      </div>

    
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Details</h2>
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
              setPaymentDetails({ ...paymentDetails, paymentAmount: e.target.value })
            }
          />
        </div>
        <Button color="purple" onClick={handlePaymentUpdate}>
          Update Payment Details
        </Button>
      </div>

      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Preview</h2>
        <Textarea
          rows={5}
          value={preview}
          readOnly
          placeholder="Preview of changes will appear here..."
        />
      </div>

      
      <div className="flex  mt-6 justify-end">
        <Button color="green" onClick={handleUpdateOrder}>
          Update Order
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
