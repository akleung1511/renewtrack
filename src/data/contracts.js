// contracts.js
// This file contains temporary sample contract data for RenewTrack.
//
// For now, we use local JavaScript data so we can build and
// understand the React interface first.
//
// Later, we will replace this data with information fetched
// from our MockAPI.

// Export the array so other files can import and use it.
export const contracts = [
  {
    // Unique ID used to identify this contract.
    id: 1,

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
    id: 2,
    customer: "XYZ Engineering",
    contractName: "Software Support Contract",
    startDate: "2026-01-15",
    expiryDate: "2027-01-15",
    value: 18000,
    status: "Expiring Soon",
  },

  {
    id: 3,
    customer: "DEF Solutions",
    contractName: "Equipment Maintenance Contract",
    startDate: "2026-03-01",
    expiryDate: "2027-02-28",
    value: 32000,
    status: "Active",
  },

  {
    id: 4,
    customer: "Sunrise Trading Pte Ltd",
    contractName: "Network Support Contract",
    startDate: "2025-07-01",
    expiryDate: "2026-06-30",
    value: 12000,
    status: "Expired",
  },
];