'use client'
import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function CandidateProfile({ params }) {
  const { id } = use(params);
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setCandidate(data));
  }, [id]);

  if (!candidate) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/candidates" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:underline">
          ← Назад до списку
        </Link>
        
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">
          <div className="bg-slate-900 p-12 text-center">
            <div className="w-24 h-24 bg-indigo-600 text-white rounded-3xl flex items-center justify-center text-4xl font-bold mx-auto mb-6">
              {candidate.name.charAt(0)}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{candidate.name}</h1>
            <p className="text-indigo-400 font-medium text-lg">@{candidate.username}</p>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">Контакти</h4>
                <div className="space-y-4">
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Email</span>
                    <span className="text-slate-900 font-bold">{candidate.email}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Телефон</span>
                    <span className="text-slate-900 font-bold">{candidate.phone}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Сайт</span>
                    <span className="text-indigo-600 font-bold">{candidate.website}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-6">Робота та локація</h4>
                <div className="space-y-4">
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Компанія</span>
                    <span className="text-slate-900 font-bold">{candidate.company.name}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Місто</span>
                    <span className="text-slate-900 font-bold">{candidate.address.city}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Вулиця</span>
                    <span className="text-slate-900 font-bold">{candidate.address.street}</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              Надіслати пропозицію
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}