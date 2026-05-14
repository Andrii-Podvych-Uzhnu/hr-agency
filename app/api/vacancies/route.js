import dbConnect from '@/lib/db';
import Vacancy from '@/lib/models/Vacancy';


export async function GET(request) {
 
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (search) {
    
    filter.title = { $regex: search, $options: 'i' };
  }

  
  const vacancies = await Vacancy.find(filter).sort({ createdAt: -1 });

  
  return Response.json(vacancies);
}


export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    
    const vacancy = await Vacancy.create(body);

    return Response.json(vacancy, { status: 201 });
  } catch (error) {
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
     
      return Response.json({ error: messages.join(', ') }, { status: 400 });
    }

    return Response.json(
      { error: 'Помилка сервера' },
      { status: 500 }
    );
  }
}