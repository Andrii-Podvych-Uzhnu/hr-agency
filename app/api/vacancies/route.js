import { NextResponse } from 'next/server';
import { vacancies, addVacancy } from '@/lib/data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let result = [...vacancies];

  if (category && category !== 'Всі') {
    result = result.filter(v => v.category === category);
  }

  if (search) {
    result = result.filter(v => 
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.company.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json(result);
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title || !body.category || !body.salary) {
      return NextResponse.json(
        { error: 'Поля title, category та salary є обов\'язковими' },
        { status: 400 }
      );
    }

    if (typeof body.salary !== 'number' || body.salary <= 0) {
      return NextResponse.json(
        { error: 'Зарплата має бути додатнім числом' },
        { status: 400 }
      );
    }

    const newVacancy = addVacancy(body);
    return NextResponse.json(newVacancy, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Невалідний JSON' },
      { status: 400 }
    );
  }
}