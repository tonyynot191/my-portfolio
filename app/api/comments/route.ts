import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { projectId, name, email, content } = await req.json();

  // Basic validation
  if (!projectId || !name || !email || !content) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (name.length > 60) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }

  if (content.length < 2 || content.length > 1000) {
    return NextResponse.json(
      { error: "Comment must be between 2 and 1000 characters." },
      { status: 400 }
    );
  }

  // Very basic email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase.from("comments").insert({
    project_id: projectId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    content: content.trim(),
    approved: false,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to save comment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}