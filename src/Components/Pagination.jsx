export default function Pagination({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) {
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span>{currentPage}</span>

      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>

      <input
        type="number"
        min="1"
        max="10"
        value={itemsPerPage}
        onChange={(e) => {
          if (e.target.value > 10) {
            alert("Items per page cannot be greater than 10");
          }
          setItemsPerPage(e.target.value);
        }}
      />
      <span>Items per page</span>
    </div>
  );
}
