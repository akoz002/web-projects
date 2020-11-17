
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

export default function palindrome(str) {
  const chars = str.toLowerCase().match(/[a-z0-9]+/g);
  const filteredStr = chars.join("");

  return _isPalindrome(filteredStr);
}
