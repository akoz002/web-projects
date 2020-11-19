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

import rot13 from './utils/rot13';

window.rot13 = rot13;

/***  Usage Examples  ***/

function printRot13(str) {
  console.log(`rot13(${str}); // ` + rot13(str));
}

printRot13("LBH QVQ VG!");
printRot13("SERR PBQR PNZC");
printRot13("SERR CVMMN!");
printRot13("SERR YBIR?");
printRot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
