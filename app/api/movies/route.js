import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
 
// GET /api/movies – Fetch all movies
export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return new Response(JSON.stringify(movies), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('GET /api/movies error:', err);
    return new Response(JSON.stringify({ error: 'Failed to load movies' }), {
      status: 500,
    });
  }
}
 
// POST /api/movies – Add new movie
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, releaseYear, actors } = body;
 
    console.log('Incoming data:', { title, releaseYear, actors });
 
    if (!title || !releaseYear || isNaN(releaseYear)) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
    }
 
    const movie = await prisma.movie.create({
      data: {
        title,
        releaseYear,
        actors,
      },
    });
 
    return new Response(JSON.stringify(movie), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('POST /api/movies error:', err);
    return new Response(JSON.stringify({ error: 'Server error: ' + err.message }), {
      status: 500,
    });
  }
}
 
 