/* ---------------- helps handling page offset for pagination --------------- */
function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

module.exports = {
  getOffset
}