export interface OrderItem {
    name: string;
    uid: string;
    sku: string;
    status: string;
  }
  
  // Interface for Denomination
  export interface Denomination {
    value: number;
    count: number;
    total: number;
  }
  
  // Interface for Payment Details
  export interface PaymentDetails {
    mode: string;
    amount: string;
    senderEmail?: string;
    senderName?: string;
  }