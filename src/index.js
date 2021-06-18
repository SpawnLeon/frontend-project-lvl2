import _ from 'lodash';

import fs from 'fs';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

export default (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const structureDate1 = JSON.parse(data1);
  const structureDate2 = JSON.parse(data2);

  const allKeysStructureDate = [
    ...new Set([...Object.keys(structureDate1), ...Object.keys(structureDate2)]),
  ].sort();

  const diffResult = [];

  allKeysStructureDate.forEach((key) => {
    if (_.has(structureDate1, key) && _.has(structureDate2, key)) {
      if (structureDate1[key] === structureDate2[key]) {
        diffResult.push(`    ${key}: ${structureDate1[key]}`);
      } else {
        diffResult.push(`  - ${key}: ${structureDate1[key]}`);
        diffResult.push(`  + ${key}: ${structureDate2[key]}`);
      }
    } else if (_.has(structureDate1, key) && !_.has(structureDate2, key)) {
      diffResult.push(`  - ${key}: ${structureDate1[key]}`);
    } else {
      diffResult.push(`  + ${key}: ${structureDate2[key]}`);
    }
  });
  return `{
 ${diffResult.join('\n')}`;
};
