import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API HR.agency працює! Система аналітики готова.',
    timestamp: new Date().toISOString(),
    status: 'success'
  })
}