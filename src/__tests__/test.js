import {separateUnit, parseHeader, parseTable, getMatrixFromXLSX } from '..';

let meta = {
  "ZP Tem":0,
  "Volume system cc": 0.775784286,
  "Date" : "30/08/2011",
  "Avogadro number": 6.02e+23,
  "Radius of the molecule m": 1.85e-08,
  "Volume of one molecules m3": 2.6508e-23,
  "error on Vsinker %": 0.001,
  "masse of system with Virgin adsorbent 9":6.745413,
  "deviation Pressure": 0.06,
  "masse system without Sample": 6.614395,
  "masse system without Sample (uncorrected)": 6.745378,
  "error on the mass g": 0.000001,
  "volume sinker cc": 4.4458,
  "mass of sample":0.131018,
  "density":1.4,
  "error on the systme volume":0.05,
  "masse of all system (sinker)":26.793972,
  "masse of all system (sinker) (uncorrected)":26.793937,
  "error on P":0.075,
  "molar mass":16,
  "volume Creuset+nacelle": 0.6822,
  "zero point":-0.000035,
  "Volume poreux cc/g": 0.5,
  "Volume adsorbed phase cc/g": 0.065509,
  "initial sinker mass": 20.048594,
  "Total Volume cc/g": 0.747709,
};
describe('test parseHeader', () => {
    it('should return an object', () => {
     expect(parseHeader(getMatrixFromXLSX("excel.xls")).meta).toContainEqual(meta);
    })
    it('should return an array of objects', () => {
      expect(parseTable(getMatrixFromXLSX("excel.xls"))).toContainEqual([]);
    });
    it('should return an array with a label and a unit', () => {
      expect(separateUnit("Temperature (m/s)")).toContain(["Temperature ", "m/s"]);
      expect(separateUnit("Temperature m/s")).toContain(["Temperature ", "m/s"]);
      expect(separateUnit("Temperature (Rad) m/s")).toContain(["Temperature ", "Rad m/s"]);
    });
});