import { labelUnit } from '../labelUnit';

test('labelUnit', () => {
  expect(labelUnit('Temperature (m/s)')).toStrictEqual({label:'Temperature',unit:'(m/s)'});
  expect(labelUnit('Tempera ture m/s')).toStrictEqual({label:'Tempera ture',unit:'m/s'});
  expect(labelUnit('Temperature (Rad) m/s')).toStrictEqual({label:'Temperature',unit:'(Rad) m/s'});
});