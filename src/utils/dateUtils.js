// dateUtils.js
// This file contains reusable functions for working with dates.

/*
  calculateDaysRemaining()

  Purpose:
  Calculate how many days remain between today
  and a contract's expiry date.

  Example:
  expiryDate = "2026-12-31"

  The function returns a number such as:
  105
*/
export function calculateDaysRemaining(expiryDate) {
  // Create a Date object representing today.
  const today = new Date();

  // Create a Date object from the contract expiry date.
  const expiry = new Date(expiryDate);

  // Calculate the difference between the two dates.
  // JavaScript gives us the result in milliseconds.
  const differenceInMilliseconds = expiry - today;

  // Number of milliseconds in one day.
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  // Convert milliseconds into days.
  //
  // Math.ceil() rounds upward because a partial remaining
  // day should still count as one day remaining.
  const daysRemaining = Math.ceil(
    differenceInMilliseconds / millisecondsPerDay
  );

  // Return the calculated number.
  return daysRemaining;
}