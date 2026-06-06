import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'GreenWeb Institute API',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
}