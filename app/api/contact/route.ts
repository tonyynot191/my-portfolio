import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_APPS = ["whatsapp", "whatsapp_business", "telegram", "snapchat"];

export async function POST(req: NextRequest) {
  const { name, email, message, source, phone, preferredApp } = await req.json();

  const isHire = source === "hire";

  // Basic validation
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

    // Phone is required on BOTH forms
  if (!phone || phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { error: "A valid phone number is required." },
      { status: 400 }
    );
  }

  // Preferred app only required on hire
  if (isHire) {
    if (!preferredApp || !ALLOWED_APPS.includes(preferredApp)) {
      return NextResponse.json(
        { error: "Please select a preferred contact app." },
        { status: 400 }
      );
    }
  }

  const sourceValue = isHire ? "hire" : "contact";
  const phoneValue = phone.trim();
  const appValue = isHire ? preferredApp : null;

  const supabase = await createClient();
  const { error: dbError } = await supabase.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    source: sourceValue,
    phone: phoneValue,
    preferred_app: appValue,
  });

  if (dbError) {
    console.error("DB insert failed:", dbError);
  }

  // Human-readable app name for the email
  const appLabel: Record<string, string> = {
    whatsapp: "WhatsApp",
    whatsapp_business: "WhatsApp Business",
    telegram: "Telegram",
    snapchat: "Snapchat",
  };

  const subjectPrefix = isHire ? "[HIRE] " : "";

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "adetony2006@gmail.com",
      replyTo: email,
      subject: `${subjectPrefix}New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #111;">New ${isHire ? "Hire" : "Contact"} Form Submission</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          ${
            isHire && phone
              ? `<p><strong>Phone:</strong> ${phone}</p>
                 <p><strong>Preferred contact:</strong> ${appLabel[appValue!] ?? appValue}</p>`
              : ""
          }
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