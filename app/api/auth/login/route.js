import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // युझर प्रमाणीकरण लॉजिक (उदा. डेटाबेस तपासणी)
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // यशस्वी रिस्पॉन्स
    return NextResponse.json(
      { 
        message: "Login successful", 
        user: { email, role },
        token: "dummy_jwt_token_here" 
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