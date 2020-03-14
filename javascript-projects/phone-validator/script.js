/*
 * freeCodeCamp JavaScript Algorithms and Data Structures Certification
 * Project 4: Telephone Number Validator
 * Alex Kozlov, 2019
 *
 * Check whether the given string has the format of a valid US phone
 * number. The following are examples of valid formats:
 *
 * 555-555-5555
 * (555)555-5555
 * (555) 555-5555
 * 555 555 5555
 * 5555555555
 * 1 555 555 5555
 *
 * The area code is required. If the country code is provided it must be
 * equal to "1".
 */

"use strict";

/*
 * Check whether the given string is a valid US phone number.
 * @param {string} str The phone number string to check.
 * @return {boolean} true if the string is a valid US phone number
 */
function telephoneCheck(str) {

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

/***  Usage Examples  ***/

// valid phone numbers
console.log("Valid phone numbers: ");
console.log(telephoneCheck("555-555-5555"));
console.log(telephoneCheck("1 555-555-5555")); 
console.log(telephoneCheck("1 (555) 555-5555"));
console.log(telephoneCheck("5555555555"));
console.log(telephoneCheck("(555)555-5555"));
console.log(telephoneCheck("1(555)555-5555"));
console.log(telephoneCheck("1 555 555 5555"));
console.log(telephoneCheck("1 456 789 4444"));

// invalid phone numbers
console.log("\nInvalid phone numbers: \n");
console.log(telephoneCheck("555-5555"));
console.log(telephoneCheck("5555555"));
console.log(telephoneCheck("1 555)555-5555"));
console.log(telephoneCheck("123**&!!asdf#"));
console.log(telephoneCheck("55555555"));
console.log(telephoneCheck("(6054756961)"));
console.log(telephoneCheck("2 (757) 622-7382"));
console.log(telephoneCheck("0 (757) 622-7382")); 
console.log(telephoneCheck("-1 (757) 622-7382"));
console.log(telephoneCheck("2 757 622-7382"));
console.log(telephoneCheck("10 (757) 622-7382"));
console.log(telephoneCheck("27576227382"));
console.log(telephoneCheck("(275)76227382"));
console.log(telephoneCheck("2(757)6227382"));
console.log(telephoneCheck("2(757)622-7382"));
console.log(telephoneCheck("555)-555-5555"));
console.log(telephoneCheck("(555-555-5555"));
console.log(telephoneCheck("(555)5(55?)-5555"));