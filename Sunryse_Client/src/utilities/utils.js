/**
 * Returns a number where the digits are the numerical characters in given string
 *
 * @param {string} str The string to parse which contains at least one numerical character
 * @returns {number} A positive integer composed of all numerical characters in str
 */
export default function removeNonNumericalCharactersAndParseToInt(str) {
  if (str === undefined || str === null || typeof str !== 'string') return -1;
  const x = parseInt(str.replace(/\D/g, ''));
  if (isNaN(x)) return -1;
  return x;
}
