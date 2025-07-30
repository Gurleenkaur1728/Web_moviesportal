import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/movies/[id] – Update a movie
export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();
  const { title, releaseYear, actors } = body;

  if (!id || !title || !releaseYear || isNaN(releaseYear)) {
    return new Response(JSON.stringify({ error: 'Invalid data' }), {
      status: 400,
    });
  }

  try {
    const updated = await prisma.movie.update({
      where: { id },
      data: {
        title,
        releaseYear,
        actors,
      },
    });

    return new Response(JSON.stringify(updated), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('PUT error:', err);
    return new Response(JSON.stringify({ error: 'Failed to update movie' }), {
      status: 500,
    });
  }
}

// DELETE /api/movies/[id] – Delete a movie
export async function DELETE(request, { params }) {
  const id = params.id;

  try {
    await prisma.movie.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('DELETE error:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete movie' }), {
      status: 500,
    });
  }
}
