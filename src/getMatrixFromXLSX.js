import XLSX from 'xlsx';

/**
 * Converts an excel file to a matrix
 * @param {string} blob Imported excel file
 * @returns {array} Matrix of cells
 */

export function getMatrixFromXLSX(blob) {
  const workbook = XLSX.read(blob, { type: 'array' });
  let csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
  let lines = csv.split(/\r?\n/);
  let matrix = new Uint8Array();
  for (let i = 0; i < lines.length; i++) {
    matrix[i] = lines[i].split(',');
  }
  return matrix;
}
