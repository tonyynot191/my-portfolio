import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (name.length > 80) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  if (message.length < 5 || message.length > 5000) {
    return NextResponse.json(
      { error: "Message must be between 5 and 5000 characters." },
      { status: 400 }
    );
  }

  // Save to database first (as a backup, in case email fails)
  const supabase = await createClient();
  const { error: dbError } = await supabase.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
  });

  if (dbError) {
    console.error("DB insert failed:", dbError);
    // Continue anyway — email is the priority
  }

  // Send email
  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "adetony2006@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #111;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${message.replace(
            /\n/g,
            "<br />"
          )}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}