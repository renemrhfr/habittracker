import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db'

const clampValue = (value) => Math.min(100, Math.max(0, value));

export async function PUT(request) {
  const data = await request.json()
  const { userId, category, value } = data
  try {
    const stat = await prisma.stats.upsert({
      where: {
        userId_category: {
          userId,
          category
        }
      },
      update: {
        value: clampValue(value),
        lastUpdated: new Date()
      },
      create: {
        userId,
        category,
        value: clampValue(value),
        lastUpdated: new Date()
      }
    })
    return NextResponse.json(stat)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stat', details: error.message }, { status: 500 })
  }
}