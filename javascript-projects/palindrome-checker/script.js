/*
 * freeCodeCamp JavaScript Algorithms and Data Structures Certification
 * Project 1: Palindrome Checker
 * Alex Kozlov, 2019
 *
 * A palindrome is a word or sentence that's spelled the same way both 
 * forward and backward, ignoring punctuation, case and spacing.
 *
 * The input string must be filtered to remove all non-alphanumeric 
 * characters (punctuation, spaces and symbols). The palindrome check 
 * must be case-insensitive.
 *
 * Example input strings include:
 *   "racecar", "RaceCar", "race CAR"
 *   "2A3*3a2", "2A3 3a2", "2_A3*3#A2"
 */

"use strict";

/*
 * Helper function to recursively check whether a string is a palindrome.
 */
function _isPalindrome(str) {
  if (str.length <= 1) {
    return true;
  }

  if (str.endsWith(str.charAt(0))) {
    return _isPalindrome(str.slice(1, -1));
  }

  return false;
}

/*
 * Check if the given unfiltered input string is a palindrome.
 * @param {string} str The unfiltered input string.
 * @return {boolean} true if the given string is a palindrome, false otheriwse.
 */
function palindrome(str) {
  const chars = str.toLowerCase().match(/[a-z0-9]+/g);
  const filteredStr = chars.join("");

  return _isPalindrome(filteredStr);
}

/***  Usage Examples  ***/

// Prints true for all of these
console.log("Palindromes :");
console.log(palindrome("eye"));

console.log(palindrome("racecar"));
console.log(palindrome("RaceCar"));
console.log(palindrome("race CAR"));

console.log(palindrome("2A3*3a2"));
console.log(palindrome("2A3 3a2"));
console.log(palindrome("2_A3*3#A2"));

// Prints false for all of these
console.log("\nNon-palindromes :");
console.log(palindrome("blizzard"));
console.log(palindrome("fireball"));
console.log(palindrome("wind"));
console.log(palindrome("ice"));
console.log(palindrome("no"));