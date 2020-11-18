
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

export default function checkCashRegister(price, cash, cid) {
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
