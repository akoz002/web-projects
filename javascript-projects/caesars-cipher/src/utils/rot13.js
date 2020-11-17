
/*
 * Decode a ROT13 cipher encoded string.
 * @param {string} str ROT13 cipher encoded string.
 * @return {string} The decoded string.
 */

export default function rot13(str) {
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
