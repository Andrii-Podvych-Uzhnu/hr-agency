import { NextResponse } from 'next/server';
import { getVacancyById, updateVacancy, deleteVacancy } from '@/lib/data';


export async function GET(request, { params }) {
  const { id } = await params;
  const vacancy = getVacancyById(id);

  if (!vacancy) {
    return NextResponse.json(
      { error: 'Вакансію не знайдено' },
      { status: 404 }
    );
  }

  return NextResponse.json(vacancy);
}


export async function PUT(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();

    
    if (!body.title || !body.category || !body.salary) {
      return NextResponse.json(
        { error: "Поля title, category та salary є обов'язковими" },
        { status: 400 }
      );
    }

    const updated = updateVacancy(id, body);

    if (!updated) {
      return NextResponse.json(
        { error: 'Вакансію не знайдено' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Невалідний JSON' },
      { status: 400 }
    );
  }
}


export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteVacancy(id);

  if (!deleted) {
    return NextResponse.json(
      { error: 'Вакансію не знайдено' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: `Вакансію "${deleted.title}" видалено успішно`,
    deleted
  });
}