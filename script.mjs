import pkg from './dist/index.umd.js';
const { Holo } = pkg;

const colDefs = Array.from({ length: 1000 }, (_, index) => ({
  id: `company_${index}`,
  headerName: `Company ${index + 1}`,
  type: 'text',
  cellStyle: {
    width: 12,
  },
}));

const schemaObject = {};
Array.from({ length: 1000 }).forEach((_el, index) => {
  schemaObject[`company_${index}`] = 'company';
});

export const performanceData = Holo.of()
  .schema(schemaObject)
  .repeat(100000)
  .generate();

export const performanceOptions = {
  defaultColumnDef: {
    editable: false,
  },
  visualOptions: {
    maxHeight: '500px',
    rowHeight: 'md',
    minWidth: 2000,
  },
  columnDefs: colDefs,
};

// eslint-disable-next-line no-console
console.log(performanceOptions, performanceData);
