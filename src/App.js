import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar";
import LibraryMusic from "./components/LibraryMusic";
import SearchResults from "./components/SearchResults";
import SongDetail from "./components/SongDetail";
import { fetchSongs, resetResults } from "./redux/slices/searchSlice";
import { ThemeProvider } from "styled-components";
import Theme from "./theme";
import GlobalStyles from "./theme/GlobalStyles";
import { MainSplit } from "./styles";

function App() {
  const dispatch = useDispatch();

  // Obtenemos datos del estado global a través de Redux
  const { results, loading, error, message } = useSelector((state) => state.search);

  // Función para iniciar una búsqueda de canciones
  const handleSearch = (searchSinger) => {
    if (searchSinger.trim()) {
      dispatch(fetchSongs(searchSinger));
    }
  };

  // Función para reiniciar los resultados
  const handleReset = () => {
    dispatch(resetResults());
  };

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header appName="AlyMusic" />
                <SearchBar onSearch={handleSearch} onReset={handleReset} />
                <MainSplit>
                  <LibraryMusic />
                  <SearchResults songs={results}>
                    {loading && <p>Cargando canciones...</p>}
                    {error && <p style={{ color: "red" }}>Error: {error}</p>}
                    {!loading && message && <p>{message}</p>}
                  </SearchResults>
                </MainSplit>
              </>
            }
          />
          <Route path="/song/:songId" element={<SongDetail />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
