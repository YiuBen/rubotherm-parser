/**
 * Separates the label and its unit
 * @param {string} label label to separate
 * @returns {object} Object containing the unit and label
 */

export function labelUnit(label) {
  // eslint-disable-next-line prefer-named-capture-group
  const unit = (label.match(/(([a-z]+)([/])+|([(]))([a-zA-Z ()/]+)/))[0];
  let newLabel = label;
  if (unit !=='') {
    newLabel = newLabel.replace(unit,'');
    newLabel = newLabel.replace(/ $/,'');
  }
  return { label: newLabel,
           unit: unit,
          };
}
