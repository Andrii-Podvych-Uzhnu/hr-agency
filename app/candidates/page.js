'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center">Наші кандидати</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                {candidate.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{candidate.name}</h3>
              <p className="text-slate-500 text-sm mb-6">@{candidate.username}</p>
              
              <div className="space-y-3 mb-8">
                <p className="text-sm text-slate-600 font-medium">🏢 {candidate.company.name}</p>
                <p className="text-sm text-slate-600 font-medium">✉️ {candidate.email}</p>
              </div>

              <Link 
                href={`/candidates/${candidate.id}`}
                className="block w-full text-center bg-slate-50 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-colors"
              >
                Переглянути профіль
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}