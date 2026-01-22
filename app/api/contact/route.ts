import { Resend } from "resend";
import { NextResponse } from "next/server";

// NOTE: To send emails to any address, you need to:
// 1. Verify your domain in Resend dashboard (https://resend.com/domains)
// 2. Change the 'from' address below to use your verified domain
// Currently using onboarding@resend.dev which only works for testing
// and can only send to the email that owns the Resend account

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "johnpaullagda08@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      // Provide more specific error messages
      const errorMessage = error.message || "Failed to send email";
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
