/* ---------------- helps handling page offset for pagination --------------- */
function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}
/* ---------------- helps if after query no rows are selected --------------- */
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows
}