import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Components/Table";
import Pagination from "./Components/Pagination";
import SearchInput from "./Components/SearchInput";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startSearching, setStartSearching] = useState(true);

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        document.querySelector(".searchInput").focus();
      }
    });
  }, []);

  useEffect(() => {
    search();
  }, [currentPage, itemsPerPage]);

  const search = () => {
    if (
      searchInput === "" ||
      searchInput === null ||
      searchInput === undefined
    ) {
      setStartSearching(true);
      setSearchResults([]);
      return;
    }

    if (startSearching) setStartSearching(false);

    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL, {
        params: {
          countryIds: "IN",
          namePrefix: searchInput,
          limit: itemsPerPage,
          offset: itemsPerPage * (currentPage - 1),
        },
        headers: {
          "x-rapidapi-host": import.meta.env.VITE_API_HOST,
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        setSearchResults(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <SearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        search={search}
        loading={loading}
      />

      {loading && <div className="spinner">Loading...</div>}

      <Table
        searchResults={searchResults}
        startSearching={startSearching}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      {!startSearching && searchResults.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
}
