import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  try {
    const updated = await prisma.movie.update({
      where: { id },
      data,
    });

    return new Response(JSON.stringify(updated), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('PUT error:', err);
    return new Response(JSON.stringify({ error: 'Failed to update movie' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.movie.delete({ where: { id } });

    return new Response(JSON.stringify({ message: 'Movie deleted' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('DELETE error:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete movie' }), { status: 500 });
  }
}
