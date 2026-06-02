import { useState } from 'react';

const API_URL = 'https://api.tvmaze.com/search/shows?q=';
const placeholderImage = 'https://via.placeholder.com/320x180?text=No+Image';

function cleanSummary(summary) {
  return summary ? summary.replace(/<[^>]+>/g, '') : 'No description available.';
}

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async (term) => {
    setError('');
    setLoading(true);
    setMovies([]);

    try {
      const response = await fetch(`${API_URL}${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error('Unable to reach the search API.');
      }

      const results = await response.json();
      setMovies(results.map((entry) => entry.show));
      if (results.length === 0) {
        setError('No matches found. Try another title.');
      }
    } catch (err) {
      setError(err.message || 'Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      searchMovies(trimmed);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Movie Search App</p>
          <h1>Discover titles with TVMaze</h1>
          <p className="subtitle">
            Search for movies, shows, and entertainment titles using a public API.
          </p>
        </div>
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="search">Search title</label>
          <div className="search-input-group">
            <input
              id="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a movie or show name..."
              aria-label="Search titles"
            />
            <button type="submit" disabled={loading || !query.trim()}>
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </form>
      </header>

      {error && <div className="alert">{error}</div>}

      <main>
        <div className="grid">
          {movies.map((movie) => (
            <article key={movie.id} className="card">
              <img
                src={movie.image?.medium || placeholderImage}
                alt={movie.name}
                className="poster"
              />
              <div className="card-body">
                <h2>{movie.name}</h2>
                <p className="meta">
                  {movie.premiered ? movie.premiered.slice(0, 4) : 'Year N/A'} ·{' '}
                  {movie.type || 'Unknown'}
                </p>
                <p className="rating">
                  Rating: {movie.rating?.average ?? 'N/A'}
                </p>
                <p>{cleanSummary(movie.summary)}</p>
                {movie.genres?.length > 0 && (
                  <p className="genres">Genres: {movie.genres.join(', ')}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
