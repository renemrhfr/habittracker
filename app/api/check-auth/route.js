import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_KEY

export async function GET(req) {
  if (!SECRET_KEY) {
    return NextResponse.json({ error: 'Environment Variables not setup' }, { status: 500 });
  }

  const cookies = parse(req.headers.get('cookie') || '');
  const token = cookies.auth_token;

  if (!token) {
    return NextResponse.json({ error: 'No Token provided' }, { status: 401 });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ authorized: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}