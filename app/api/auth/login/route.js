import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // यशस्वी लॉगिन रिस्पॉन्स
    return NextResponse.json(
      {
        message: "Login successful",
        user: { email, role },
        token: "dummy_token_12345",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}