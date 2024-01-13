export const filterData = (
  searchInput: string,
  data: any[],
  columns: any[],
) => {
  let searchString = searchInput.toLowerCase().trim();
  let value: any = [];
  let filtering = [];
  const allRecords = data;
  if (allRecords.length !== 0) {
    filtering = allRecords.filter(rec => {
      if (rec !== undefined) {
        value = [];
        for (let i = 0; i < columns.length; i++) {
          let field = columns[i];
          value.push(String(rec[field]).toLowerCase().trim());
        }
      }
      let match = false;
      for (let i = 0; i < value.length; i++) {
        if (value[i].includes(searchString)) {
          match = true;
        }
      }
      return match;
    });
  }
  return filtering;
};

export const sortingData = (
  filteredData: any,
  orderColumn: string,
  dir: number,
): any => {
  let field = orderColumn;
  let sorting = [];
  const recordsFiltered = filteredData;
  if (recordsFiltered.length !== 0) {
    let type = typeof recordsFiltered[0][field];
    sorting = [...recordsFiltered];
    sorting = sorting.sort((a, b) => {
      // console.log('aaaaaaaaa');
      if (type === 'number') {
        if (dir === 1) {
          return a[field] - b[field];
        } else {
          return b[field] - a[field];
        }
      } else {
        if (dir === 1) {
          if (recordsFiltered[0][field] == null) {
            // console.log('00000', a[field] < b[field]);
            if (a[field] < b[field]) {
              // console.log('1111', a[field] < b[field]);
              return -1;
            } else {
              // console.log('2222', a[field] < b[field]);

              return 1;
            }
          }

          if (a[field] < b[field]) {
            return -1;
          }
          if (a[field] > b[field]) {
            return 1;
          }
          return 0;
        } else {
          if (recordsFiltered[0][field] == null) {
            // console.log('00000', a[field] < b[field]);
            if (a[field] < b[field]) {
              // console.log('1111', a[field] < b[field]);
              return 1;
            } else {
              // console.log('2222', a[field] < b[field]);

              return -1;
            }
          }
          if (a[field] > b[field]) {
            return -1;
          }
          if (a[field] < b[field]) {
            return 1;
          }
          return 0;
        }
      }
    });
  }

  return sorting;
};

export const paginationData = (
  sorted: any,
  currentPage: number,
  limit: number,
) => {
  let startRecord = (currentPage - 1) * limit;
  let endRecord = currentPage * limit;
  let paginateData = sorted.slice(startRecord, endRecord);
  return paginateData;
};

export const recordFrom = (currentPage: number, limit: number) => {
  return (currentPage - 1) * limit + 1;
};

export const recordTo = (currentPage: number, limit: number, total: number) => {
  if (currentPage * limit > total) {
    return total;
  }
  return currentPage * limit;
};
