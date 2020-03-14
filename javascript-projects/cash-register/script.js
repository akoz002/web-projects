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

/*
 * Define a data structure for the currency values.
 */
const CURRENCY_VALUES = {
  "PENNY": 0.01,
  "NICKEL":	0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5, 
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100 };

/*
 * Round a floating point number to two decimal places.
 */
function roundFloat(num) {
  return Math.round(num * 100) / 100;
}

/*
 * Calculate the total "cash-in-drawer" value.
 * @param {Array<array>} cid The "cash-in-drawer" array.
 * @return {number} The total "cash-in-drawer" value.
 */
function getTotalCIDValue(cid) {
  const cidTotalValue = cid.reduce((totalValue, currencyArray) =>
    totalValue + currencyArray[1], 0);
  return roundFloat(cidTotalValue);
}

/*
 * Calculate the required change for a purchase.
 * @param {number} price The purchase price.
 * @param {number} cash The cash payment amount.
 * @param {Array<array>} cid The "cash-in-drawer" array.
 * @return {Object} Object containing "status" string and "change" array.
 */
function checkCashRegister(price, cash, cid) {
  const cidTotalValue = getTotalCIDValue(cid);
  const requiredChange = roundFloat(cash - price);

  if (cidTotalValue == requiredChange) {
    return {"status": "CLOSED", "change": cid};
  }
  
  const changeArray = [];
  const remainingChange = cid.reduceRight((remainingChange, currencyArray) => {

    const currencyAvailable = currencyArray[1];
    if (currencyAvailable == 0) {
      // we have no available currency
      return remainingChange;
    }

    const currencyValue = CURRENCY_VALUES[currencyArray[0]];
    if (remainingChange / currencyValue >= 1) {

      // we could possibly provide change in this currency
      const currencyRequired = (remainingChange*100 - 
        ((remainingChange*100) % (currencyValue*100))) / 100;

      if (currencyAvailable >= currencyRequired) {
        // we have enough currency to cover what is required
        changeArray.push([currencyArray[0], currencyRequired]);
        return roundFloat(remainingChange - currencyRequired);
      }

      // if we don't have enough, provide what we have available
      changeArray.push([currencyArray[0], currencyAvailable]);
      return roundFloat(remainingChange - currencyAvailable);
    }

    // this means the remaining change is less than the currency value,
    // so we can't provide any currency
    return remainingChange;

  }, requiredChange);

  if(remainingChange == 0) {
    return {"status": "OPEN", "change": changeArray};
  }

  return {"status": "INSUFFICIENT_FUNDS", "change": []};
}

/***  Usage Examples  ***/

console.log(checkCashRegister(19.5, 20, 
  [["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(3.26, 100, 
  [["PENNY", 1.01], 
    ["NICKEL", 2.05], 
    ["DIME", 3.1], 
    ["QUARTER", 4.25], 
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(19.5, 20, 
  [["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]]));

console.log(checkCashRegister(19.5, 20, 
  [["PENNY", 0.01], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 1], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]]));

console.log(checkCashRegister(19.5, 20, 
  [["PENNY", 0.5], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]]));