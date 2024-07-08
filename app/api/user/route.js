import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db'

export async function GET() {
  const user = await prisma.user.findFirst({
    include: { stats: true, habits: true }
  })
  return NextResponse.json(user)
}

export async function POST(request) {
  const { name } = await request.json()
  const user = await prisma.user.create({
    data: { name }
  })
  return NextResponse.json(user)
}