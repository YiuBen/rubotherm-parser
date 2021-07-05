import { labelUnit } from './labelUnit';

/**
 * Parses columns from a table
 * @param {array} matrix Cells data extracted from the file
 * @param {number} _startingRow (optional) Starting row of the function
 * @returns {array} Array with objects corresponding to every column
 */

export function parseTable(matrix, options = {}) {
  let { i: startingRow = 0 } = options;
  for (
    startingRow;
    matrix[startingRow][0] !== 'Temperature' && startingRow < matrix.length;
    startingRow++
  );
  const variables = [];
  for (let j = 0; j < matrix[startingRow].length; j++) {
    const values = [];
    let i = startingRow + 1;
    for (i; i < matrix.length; i++) {
      values.push(matrix[i][j]);
    }
    let split = labelUnit(matrix[startingRow][j]);
    let variable = { label: split[0], units: split[1], matrix: values };
    variables.push(variable);
  }
  return variables;
}
