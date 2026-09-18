// contracts.js
// This file contains temporary sample contract data for RenewTrack.
//
// Each contract now contains a customerId.
// customerId connects the contract to a customer
// stored inside customers.js.
//
// Example:
// customerId: 1
// means this contract belongs to the customer with id: 1.
//
// Later, we will replace this temporary data
// with information fetched from our MockAPI.

// Export the array so other files can import and use it.
export const contracts = [
  {
    // Unique ID used to identify this contract.
    id: 1,

    // Connect this contract to ABC Pte Ltd (customer id 1).
    customerId: 1,

    // Company that owns the contract.
    customer: "ABC Pte Ltd",

    // Name or description of the contract.
    contractName: "IT Maintenance Contract",

    // Contract start date.
    startDate: "2026-01-01",

    // Contract expiry date.
    expiryDate: "2026-12-31",

    // Contract value in Singapore dollars.
    value: 24000,

    // Current contract status.
    status: "Active",
  },

  {
    // Unique contract ID.
    id: 2,

    // Connect this contract to XYZ Engineering (customer id 2).
    customerId: 2,

    customer: "XYZ Engineering",
    contractName: "Software Support Contract",
    startDate: "2026-01-15",
    expiryDate: "2027-01-15",
    value: 18000,
    status: "Expiring Soon",
  },

  {
    // Unique contract ID.
    id: 3,

    // Connect this contract to DEF Solutions (customer id 3).
    customerId: 3,

    customer: "DEF Solutions",
    contractName: "Equipment Maintenance Contract",
    startDate: "2026-03-01",
    expiryDate: "2027-02-28",
    value: 32000,
    status: "Active",
  },

  {
    // Unique contract ID.
    id: 4,

    // Connect this contract to Sunrise Trading Pte Ltd (customer id 4).
    customerId: 4,

    customer: "Sunrise Trading Pte Ltd",
    contractName: "Network Support Contract",
    startDate: "2025-07-01",
    expiryDate: "2026-06-30",
    value: 12000,
    status: "Expired",
  },
];