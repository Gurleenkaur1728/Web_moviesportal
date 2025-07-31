'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import Link from 'next/link';

/**
 * MoviesPage Component
 * Displays a list of movies from the database and allows the user to:
 * - Add a new movie
 * - Edit an existing movie
 * - Delete a movie
 * Uses Prisma (via API routes) for backend integration.
 */
export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [actors, setActors] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingMovieId, setEditingMovieId] = useState(null);

  // Fetch all movies on initial page load
  useEffect(() => {
    fetch('/api/movies')
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to fetch movies');
        }
        return res.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('Failed to load movies.');
        setLoading(false);
      });
  }, []);

  // Handles add or update of a movie
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedActors = actors.trim();
    const parsedYear = parseInt(releaseYear);
    const safeYear = isNaN(parsedYear) || parsedYear <= 0 ? null : parsedYear;

    if (!trimmedTitle || !safeYear) {
      alert('Please enter a valid title and release year.');
      return;
    }

    const payload = {
      title: trimmedTitle,
      releaseYear: safeYear,
      actors: trimmedActors ? trimmedActors.split(',').map(a => a.trim()) : [],
    };

    try {
      let res;
      if (editingMovieId) {
        // PUT request to update existing movie
        res = await fetch(`/api/movies/${editingMovieId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // POST request to add new movie
        res = await fetch('/api/movies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        alert(`Error: ${err.error || 'Failed to save movie'}`);
        return;
      }

      const savedMovie = await res.json();

      // Update state with new or updated movie
      if (editingMovieId) {
        setMovies(movies.map((m) => (m.id === editingMovieId ? savedMovie : m)));
        setEditingMovieId(null);
      } else {
        setMovies([...movies, savedMovie]);
      }

      // Clear form fields
      setTitle('');
      setReleaseYear('');
      setActors('');
    } catch (err) {
      alert('Something went wrong. Check your server or console.');
      console.error(err);
    }
  };

  // Loads selected movie into form for editing
  const handleEdit = (movie) => {
    setTitle(movie.title);
    setReleaseYear(movie.releaseYear?.toString() || '');
    setActors(Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors || '');
    setEditingMovieId(movie.id);
  };

  // Deletes a movie by ID
  const handleDelete = async (id) => {
    await fetch(`/api/movies/${id}`, { method: 'DELETE' });
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-10">
        <Link href="/">
          <button className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            ← Back to Home
          </button>
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center">🎬 IMR Movie List</h1>

        {/* Movie Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-3 py-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <input
            type="number"
            placeholder="Release year"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
            className="px-3 py-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <input
            type="text"
            placeholder="Actors (comma separated)"
            value={actors}
            onChange={(e) => setActors(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {editingMovieId ? 'Update' : 'Add'} Movie
          </button>
        </form>

        {/* Movie List */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="px-4 py-3 border border-gray-200 shadow-sm rounded bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-lg">{movie.title}</div>
                  <div className="text-sm text-gray-600">
                    Year: {movie.releaseYear || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Actors: {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors || 'N/A'}
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
      </main>

      <Footer/>
    </div>
  );
}
