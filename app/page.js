/**
 * MoviesPage Component - IMR Movie List App
 *
 * Description:
 * This React (Next.js) client component handles the full CRUD operations
 * for a movie database using Prisma with MongoDB. Users can:
 *  - View a list of movies
 *  - Add a new movie with title, release year, and actors
 *  - Edit an existing movie's details
 *  - Delete a movie entry
 *
 * Technologies:
 * - React (with useState, useEffect)
 * - Next.js App Router (Client Components + API routes)
 * - Prisma ORM + MongoDB
 * - TailwindCSS for UI styling
 *
 * Author: Gurleen kaur , gurleen kaur mangat , gurleen
 * Course:  Web Development
 * Instructor: mohammed-al-haifi
 * Date: July 30, 2025
 */
'use client';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';
 
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
 
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Welcome to IMR Movie Portal</h2>
        <p className="text-lg text-gray-600 mb-8">
          This is where your movie list will appear.
        </p>
 
        <Link href="/movies">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            🎬 Go to Movie List
          </button>
        </Link>
      </main>
 
      <Footer />
    </div>
  );
}
 