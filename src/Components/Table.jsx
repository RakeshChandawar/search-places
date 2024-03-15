export default function Table({ searchResults, startSearching }) {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.city}</td>
              <td
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <img src="https://flagsapi.com/IN/flat/16.png" />
                {result.country}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="no-data" colSpan="3">
              {startSearching ? "Start Searching" : "No result found"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
