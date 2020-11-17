
/*
 * Check whether the given string is a valid US phone number.
 * @param {string} str The phone number string to check.
 * @return {boolean} true if the string is a valid US phone number
 */

export default function telephoneCheck(str) {

  // check for invalid characters
  if (str.match(/[^0-9\s-\(\)]|^-/)) {
    return false;
  }

  // filter out separators (space and dash)
  let filteredStr = str.match(/\d|\(|\)/g).join("");

  // check for ()
  if (filteredStr.match(/\(|\)/)) {
    if (!filteredStr.match(/^\d?\(\d{3}\)/)) {
      return false;
    }
    // filter out ()
    filteredStr = filteredStr.match(/\d/g).join("");
  }

  // check for area code
  if (filteredStr.length == 11) {
    if (filteredStr.charAt(0) == "1") {
      return true;
    }
    return false;
  }

  if (filteredStr.length == 10) {
    return true;
  }

  return false;
}
