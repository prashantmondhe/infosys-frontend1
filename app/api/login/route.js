
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password, role } = await req.json();

    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 });
    }

  
    if (user.role && user.role !== role) {
      return NextResponse.json({ message: `Access denied. You are not registered as ${role}.` }, { status: 403 });
    }

   
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid password!' }, { status: 401 });
    }

    return NextResponse.json({ 
      message: 'Login successful!', 
      user: { name: user.name, email: user.email, role: user.role } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}