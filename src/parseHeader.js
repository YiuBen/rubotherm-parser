/**
 * Parses a cells matrix and returns the meta and the variables
 * @param {array} data Cells matrix extracted from the file
 * @returns {Object} Object containing the meta and ending row
 */

export function parseHeader(data) {
  let meta = {};
  let i = 0;
  let dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  for (i = 0; i < data.length && data[i][0] !== 'Temperature'; i++) {
    for (let j = 0; j < data[i].length; j++) {
      let current = data[i][j];
      if (current && isNaN(current)) {
        if (dateRegex.test(current)) {
          meta.Date = current;
        } else if (j + 1 < data[i].length) {
          if (data[i][j + 1] && !isNaN(data[i][j + 1])) {
            meta[current] = data[i][j + 1];
            continue;
          } else if (
            j + 2 < data[i].length &&
            (!data[i][j + 1] || isNaN(data[i][j + 1])) &&
            data[i][j + 2] &&
            !isNaN(data[i][j + 2])
          ) {
            if (data[i][j + 1]) {
              meta[`${current} ${data[i][j + 1]}`] = data[i][j + 2];
            } else {
              meta[current] = data[i][j + 2];
            }
            j++;
            continue;
          }
        }
        if (i + 1 < data.length && !isNaN(data[i + 1][j])) {
          if (
            j + 1 < data[i + 1].length &&
            data[i + 1][j + 1] &&
            !isNaN(data[i + 1][j + 1])
          ) {
            meta[`${current} corrected`] = data[i + 1][j];
            meta[`${current} uncorrected`] = data[i + 1][j + 1];
          } else {
            meta[current] = data[i + 1][j];
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
