import XLSX from 'xlsx';

/**
 * Converts an excel file to a matrix
 * @param {string} path Path to the excel file
 * @returns {array} Matrix of cells
 */
export function getMatrixFromXLSX(path){
  const workbook = XLSX.readFile(path);
  let csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
  let split = csv.split(/\r?\n/);
  let lines = [];
  for (let i = 0; i<split.length; i++){
    lines[i] = split[i].split(",");
  }
  return lines;
  }

/**
 * Separates the label and its unit
 * @param {string} label label to separate
 * @returns {array} Array with label part and unit part
 */
export function separateUnit(label){
  let split = label.split(/\/?\(/,2);
  if (split.length === 2){
    split[1] = split[1].replace(/[()]/, "");
  }
  return split;
}

/**
 * Parses columns from a table
 * @param {array} data Cells matrix extracted from the file
 * @param {number} _startingRow (optional) Starting row of the function
 * @returns {array} Array with objects corresponding to every column
 */
export function parseTable(data, _startingRow=0){
  for (_startingRow; data[_startingRow][0] !== "Temperature" && _startingRow<data.length; _startingRow++);
  let variables = [];
  for (let j = 0; j<data[_startingRow].length; j++){
    let values = [];
    let i = _startingRow + 1;
    for (i; i<data.length; i++){
      values.push(data[i][j]);
    }
    let split = separateUnit(data[_startingRow][j]);
    let variable = {label:split[0], units:split[1], data:values};
    variables.push(variable);
  }
  return {variables:variables};
}

/**
 * Parses a cells matrix and returns the meta and the variables
 * @param {array} data Cells matrix extracted from the file
 * @returns {Object} Object containing the meta and ending row
 */
export function parseHeader(data)
{
  let meta = {};
  let i = 0;
  let dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  for (i = 0; i<data.length && data[i][0] !== "Temperature"; i++){
    for (let j = 0; j<data[i].length; j++){
      let current = data[i][j];
      if (current && isNaN(current)){
        if (dateRegex.test(current)){
          meta.Date = current;
        }
        else if (j + 1<data[i].length){
          if (data[i][j+1] && !isNaN(data[i][j+1])){
            meta[current] = data[i][j+1];
            continue;
          }
          else if (j + 2<data[i].length && (!data[i][j+1] || isNaN(data[i][j+1])) && (data[i][j+2]) && !isNaN(data[i][j+2])){
            if (data[i][j+1]){
              meta[`${current} ${data[i][j+1]}`] = data[i][j+2];
            }
            else{
              meta[current] = data[i][j+2];
            }
            j++;
            continue;
          }
        }
        if(i + 1<data.length && !isNaN(data[i+1][j])){
          if (j+1 < data[i+1].length && data[i+1][j+1] && !isNaN(data[i+1][j+1])){
            meta[`${current } corrected`] = data[i+1][j];
            meta[`${current } uncorrected`] = data[i+1][j+1];
          }
          else{
            meta[current] = data[i+1][j];
          }
        }
     }
   }
  }
  return {
    meta: meta,
    i: i,
  };
}

export function parse(data){
  let header = parseHeader(data);
  let table = parseTable(data, header.i);
  return {meta:header.meta, variables:table.variables};
}