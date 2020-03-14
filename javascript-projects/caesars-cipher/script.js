/*
 * freeCodeCamp JavaScript Algorithms and Data Structures Certification
 * Project 3: Caesars Cipher
 * Alex Kozlov, 2019
 *
 * In Caesars Cipher, also known as Shift Cipher, the meanings of the letters 
 * are shifted by a set amount. This program implements the ROT13 cipher where
 * the letters are shifted by 13 places. E.g. 'A' becomes 'N', 'B' becomes 'O',
 * etc.
 *
 * The program accepts a ROT13 encoded string and returns a decoded string. All
 * letters are assumed to be upper-case. Non-alphabetic characters are not 
 * decoded but are included in the output string as they are.
 */

"use strict";

/*
 * Decode a ROT13 cipher encoded string.
 * @param {string} str ROT13 cipher encoded string.
 * @return {string} The decoded string.
 */
function rot13(str) { 
  const chars = str.split("");
  const shiftAmount = 13;
  const minCharCode = "A".charCodeAt();
  const maxCharCode = "Z".charCodeAt();

  const decodedChars = chars.map(char => {
    if (char.match(/[A-Z]/)) {
      let decodedCharCode = char.charCodeAt() + shiftAmount;
      if (decodedCharCode > maxCharCode) {
        decodedCharCode = decodedCharCode - maxCharCode - 1 + minCharCode;
      }
      return String.fromCharCode(decodedCharCode);
    }
    return char;
  });

  return decodedChars.join("");
}

/***  Usage Examples  ***/

console.log(rot13("LBH QVQ VG!"));
console.log(rot13("SERR PBQR PNZC"));
console.log(rot13("SERR CVMMN!"));
console.log(rot13("SERR YBIR?"));
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));