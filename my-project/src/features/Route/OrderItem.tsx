

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import { Button, Card, TextInput, Select } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderItem, Denomination, PaymentDetails } from "../../modal/procedorder"
import UploadSection from "./UploadSection";
export default function OrderDetailsPage() {
  const navigate = useNavigate();

  const [items] = useState<OrderItem[]>([
    { name: "Transformers Sofa Set", uid: "XXXX-XXXX-XXXX", sku: "42880428", status: "Delivered" },
    { name: "Transformers Sofa Set", uid: "XXXX-XXXX-XXXX", sku: "42880428", status: "Delivered" },
    { name: "Transformers Sofa Set", uid: "XXXX-XXXX-XXXX", sku: "42880428", status: "Delivered" },
    { name: "Transformers Sofa Set", uid: "XXXX-XXXX-XXXX", sku: "42880428", status: "Delivered" },
  ]);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    mode: "DEBIT / CREDIT CARD",
    amount: "350",
    senderEmail: "",
    senderName: "",
  });

  const [denominations, setDenominations] = useState<Denomination[]>([
    { value: 100, count: 1, total: 100 },
    { value: 50, count: 4, total: 200 },
    { value: 20, count: 0, total: 0 },
    { value: 10, count: 9, total: 90 },
    { value: 5, count: 0, total: 0 },
    { value: 2, count: 0, total: 0 },
    { value: 1, count: 0, total: 0 },
  ]);

  const totalDue = 400;
  const totalPaid =
    paymentDetails.mode === "CASH"
      ? denominations.reduce((sum, item) => sum + item.total, 0)
      : Number(paymentDetails.amount);
  const pendingAmount = totalDue - totalPaid;

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setPaymentDetails((prev) => ({
      ...prev,
      amount: numericValue,
    }));
  };
//  const handleUploadedFiles = (files: any) => {
//     console.log("Uploaded files:", files);
//   };

  const handleDenominationChange = (index: number, increment: boolean) => {
    setDenominations((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const newCount = increment ? item.count + 1 : Math.max(0, item.count - 1);
          return {
            ...item,
            count: newCount,
            total: newCount * item.value,
          };
        }
        return item;
      })
    );
  };
  const [enteredUIDs, setEnteredUIDs] = useState<string[]>(Array(items.length).fill(""));

  const handleUIDChange = (value: string, index: number) => {
    setEnteredUIDs((prev) =>
      prev.map((uid, i) => (i === index ? value : uid))
    );
  };

  const validateUIDs = () => {
    let allValid = true;

    enteredUIDs.forEach((uid, index) => {
      if (uid !== items[index].uid) {
        allValid = false;
        toast.error(`UID for "${items[index].name}" does not match!`);
      }
    });

    if (allValid) {
      toast.success("All UIDs are valid!");
    }

    return allValid;
  };
  const handleSubmit = () => {
    if (!validateUIDs()) {
      return; // Stop submission if UIDs are invalid.
    }
    if (paymentDetails.mode === "INTERAC") {
      if (!paymentDetails.senderEmail || !paymentDetails.senderName) {
        toast.error("Please fill in all required INTERAC details.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(paymentDetails.senderEmail)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }

    if (paymentDetails.mode === "CASH" && pendingAmount > 0) {
      toast.error("Please provide enough cash to cover the total due.");
      return;
    }

    toast.success("Payment recorded successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <header className="bg-[#2E2B7C] text-white p-4 flex items-center justify-between">
        <Button color="light" onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">HI2411801</h1>
        <button className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Order Details */}
      <div className="bg-gray-400 border rounded-lg text-gray-600 py-4 px-6">
        <div className="space-y-1">
          <p className="text-gray-600">HI24112801 | Processing</p>
          <p className="font-medium">Shantanu Singh Bharadwaj</p>
          <p className="text-gray-600">578 Linden Dr, Cambridge</p>
          <p className="text-gray-600">Unit 19, Buzzcode 123, Zipcode N3H5L5</p>
        </div>
      </div>

      {/* Items List */}
      <main className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-4">ITEMS</h2>
        <div className="space-y-6">
          {items.map((item, index) => (
            <Card key={index} className="space-y-2 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">Linked UID: {item.uid}</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-600">{item.status}</span>
                  <p className="text-gray-600">SKU: {item.sku}</p>
                </div>
              </div>
              <TextInput
                    value={enteredUIDs[index]}
                    onChange={(e) => handleUIDChange(e.target.value, index)}
                    placeholder="Enter UID"
                    className="text-center h-12"
                  />
            </Card>
          ))}
        </div>
      </main>

      {/* Payment Section */}
      <div className="p-4 border bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">RECORD TRANSACTION</h2>
        <div className="space-y-4">
          <p className="text-lg">TOTAL AMOUNT DUE: ${totalDue.toFixed(2)}</p>
          <div className="space-y-2">
            <label className="block">SELECT MODE OF PAYMENT:</label>
            <Select
              value={paymentDetails.mode}
              onChange={(e) =>
                setPaymentDetails((prev) => ({
                  ...prev,
                  mode: e.target.value,
                }))
              }
              className="w-full"
            >
              <option value="DEBIT / CREDIT CARD">DEBIT / CREDIT CARD</option>
              <option value="CASH">CASH</option>
              <option value="INTERAC">INTERAC</option>
            </Select>
          </div>

          {paymentDetails.mode === "CASH" ? (
            <div className="space-y-3">
              {denominations.map((denom, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <button
                    onClick={() => handleDenominationChange(index, false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold"
                    style={{backgroundColor : "yellow"}}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{denom.count}</span>
                  <button
                    onClick={() => handleDenominationChange(index, true)}
                    className="w-8 h-8 rounded-full  flex items-center justify-center text-black font-bold"
                    style={{backgroundColor : "yellow"}}
                  >
                    +
                  </button>
                  <span className="w-20">${denom.value}</span>
                  <span className="text-purple-800">${denom.total}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paymentDetails.mode === "INTERAC" && (
                <>
                  <div className="space-y-2">
                    <label className="block">SENDER's EMAIL ID:</label>
                    <TextInput
                      type="email"
                      value={paymentDetails.senderEmail}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({
                          ...prev,
                          senderEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block">SENDER's NAME:</label>
                    <TextInput
                      type="text"
                      value={paymentDetails.senderName}
                      onChange={(e) =>
                        setPaymentDetails((prev) => ({
                          ...prev,
                          senderName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <label className="block">ENTER AMOUNT:</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg">$</span>
                  <TextInput
                    type="text"
                    value={paymentDetails.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 mt-6">
            <p className="text-lg">Total Paid: ${totalPaid.toFixed(2)}</p>
            <p className="text-lg text-red-600">
              Pending: ${pendingAmount > 0 ? pendingAmount.toFixed(2) : 0}
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 p-4 border bg-white mt-6">
        <h2 className="text-xl font-semibold mb-4">UPLOAD DELIVERY PHOTOS</h2>
        <UploadSection  />
      </main>

      {/* Footer */}
      <footer className="p-4">
        <Button
          className="w-full"
          color="purple"
          onClick={handleSubmit}
        >
          UPDATE ORDER
        </Button>
      </footer>
    </div>
  );
}
