/**
 * Separates the label and its unit
 * @param {string} label label to separate
 * @returns {array} Array with label part and unit part
 */

export function labelUnit(label) {
  //Needs a better implementation
  let split = label.split(/\/?\(/, 2);
  if (split.length === 2) {
    split[1] = split[1].replace(/[()]/, '');
  }
  return { label: split[0], unit: split[1] };
}
