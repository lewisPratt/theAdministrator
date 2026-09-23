/** 
* Capitalizes the first letter of the string passed to it, returning a capitalized string
* @param {string} val - the string that is to be capitalized
* @return {string} The capitalized string
*/
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
