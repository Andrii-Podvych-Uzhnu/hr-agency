import dbConnect from '@/lib/db';
import Vacancy from '@/lib/models/Vacancy';

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const vacancy = await Vacancy.findById(id);

    if (!vacancy) {
      return Response.json({ error: 'Вакансію не знайдено' }, { status: 404 });
    }

    return Response.json(vacancy);
  } catch (error) {
    return Response.json({ error: 'Невалідний ID' }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const body = await request.json();
    const vacancy = await Vacancy.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!vacancy) {
      return Response.json({ error: 'Вакансію не знайдено' }, { status: 404 });
    }

    return Response.json(vacancy);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    return Response.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const vacancy = await Vacancy.findByIdAndDelete(id);

    if (!vacancy) {
      return Response.json({ error: 'Вакансію не знайдено' }, { status: 404 });
    }

    return Response.json({ message: `Вакансію "${vacancy.title}" видалено` });
  } catch (error) {
    return Response.json({ error: 'Невалідний ID' }, { status: 400 });
  }
}