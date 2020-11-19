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

import telephoneCheck from './utils/telephoneCheck';

window.telephoneCheck = telephoneCheck;

/***  Usage Examples  ***/

function printTelephoneCheck(str) {
  console.log(`telephoneCheck(${str}); // ` + telephoneCheck(str));
}

// valid phone numbers
console.log("Valid phone numbers:");
printTelephoneCheck("555-555-5555");
printTelephoneCheck("1 555-555-5555");
printTelephoneCheck("1 (555) 555-5555");
printTelephoneCheck("5555555555");
printTelephoneCheck("(555)555-5555");
printTelephoneCheck("1(555)555-5555");
printTelephoneCheck("1 555 555 5555");
printTelephoneCheck("1 456 789 4444");

// invalid phone numbers
console.log("\nInvalid phone numbers:");
printTelephoneCheck("555-5555");
printTelephoneCheck("5555555");
printTelephoneCheck("1 555)555-5555");
printTelephoneCheck("123**&!!asdf#");
printTelephoneCheck("55555555");
printTelephoneCheck("(6054756961)");
printTelephoneCheck("2 (757) 622-7382");
printTelephoneCheck("0 (757) 622-7382");
printTelephoneCheck("-1 (757) 622-7382");
printTelephoneCheck("2 757 622-7382");
printTelephoneCheck("10 (757) 622-7382");
printTelephoneCheck("27576227382");
printTelephoneCheck("(275)76227382");
printTelephoneCheck("2(757)6227382");
printTelephoneCheck("2(757)622-7382");
printTelephoneCheck("555)-555-5555");
printTelephoneCheck("(555-555-5555");
printTelephoneCheck("(555)5(55?)-5555");
