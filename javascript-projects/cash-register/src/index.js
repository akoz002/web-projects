/*
 * freeCodeCamp JavaScript Algorithms and Data Structures Certification
 * Project 5: Cash Register
 * Alex Kozlov, 2019
 *
 * Implements a cash register drawer function checkCashRegister() that
 * accepts a purchase price, cash payment amount, and "cash-in-drawer".
 * Returns an object in the following format containing a "status" string
 * and a "change" array:
 *
 *   {status: "INSUFFICIENT_FUNDS", change: []}
 *
 * if the funds in "cash-in-drawer" are insufficent, or don't have the
 * correct currencies for the exact change. The "change" array is empty.
 *
 *   {status: "CLOSED", change: [...]}
 *
 * if the funds in "cash-in-drawer" are equal to the required change.
 * The "change" array is equal to the "cash-in-drawer" array, sorted in
 * lowest to highest currency value.
 *
 *   {status: "OPEN", change: [...]}
 *
 * if the funds in "cash-in-drawer" are greater than the required change.
 * The "change" array denotes the currencies for the required change in a
 * similar format to the "cash-in-drawer" array, except sorted in highest
 * to lowest currency value.
 */

// Example "cash-in-drawer" array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

"use strict";

import checkCashRegister from './utils/checkCashRegister';

window.checkCashRegister = checkCashRegister;

/***  Usage Examples  ***/

function printCheckCashRegister(...args) {
  console.log('checkCashRegister(');
  console.log(...args);
  console.log(');');
  console.log('// Returns:');
  console.log(checkCashRegister(...args));
}

printCheckCashRegister(19.5, 20,
  [["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]]);

printCheckCashRegister(3.26, 100,
  [["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]]);

printCheckCashRegister(19.5, 20,
  [["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]]);

printCheckCashRegister(19.5, 20,
  [["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]]);

printCheckCashRegister(19.5, 20,
  [["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]]);
