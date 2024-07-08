import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db'

export async function POST(request) {
  const data = await request.json()
  const { name, category, value, userId } = data
  try {
    const habit = await prisma.habit.create({
      data: {
        name,
        category,
        value,
        userId
      }
    })
    return NextResponse.json(habit)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create habit', details: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Habit ID is required' }, { status: 400 })
  }

  try {
    await prisma.habit.delete({
      where: { id: id }
    })
    return NextResponse.json({ message: 'Habit deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting habit:', error)
    return NextResponse.json({ error: 'Failed to delete habit', details: error.message }, { status: 500 })
  }
}