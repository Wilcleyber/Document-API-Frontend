import { useState, useEffect } from "react";
import { searchService } from "../services/searchService";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        const data = await searchService.globalSearch(query);
        setResults(data.results || []);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 500); // Aguarda 500ms após a última tecla

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Pesquisar em todos os documentos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {isSearching && <div className="loader">Buscando...</div>}

      {results.length > 0 && (
        <ul className="search-results-dropdown">
          {results.map((res, index) => (
            <li 
              key={index} 
              onClick={() => navigate(`/folder/${res.folder}`)}
              className="result-item"
            >
              <div className="result-header">
                <strong>📄 {res.file}</strong>
                <span className="folder-tag">em {res.folder}</span>
              </div>
              <p className="result-snippet">{res.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}