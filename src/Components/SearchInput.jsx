export default function SearchInput({
  searchInput,
  setSearchInput,
  search,
  loading,
}) {
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="inputContainer">
      <input
        className="searchInput"
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search places..."
        disabled={loading}
      />

      <span className="keyboardShortcut">Ctrl + /</span>
    </div>
  );
}
