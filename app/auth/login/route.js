import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_KEY = process.env.JWT_KEY;

export async function POST(request) {
  const { password } = await request.json();
  if (password === process.env.NEXT_PUBLIC_APP_PASSWORD) {
    const token = jwt.sign({ authorized: true }, JWT_KEY, { expiresIn: '1d' });
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/'
    });
    return response;
  } else {
    return NextResponse.json(
      { success: false, message: 'Fehler beim Login' },
      { status: 401 }
    );
  }
}