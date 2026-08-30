import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: body
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 400 }
    );
  }
}
