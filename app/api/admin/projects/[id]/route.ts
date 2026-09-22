import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const { error } = await supabase
    .from("projects")
    .update({
      slug: body.slug,
      title: body.title,
      tagline: body.tagline,
      description: body.description || null,
      problem: body.problem || null,
      solution: body.solution || null,
      role: body.role || null,
      challenges: body.challenges || null,
      tech_stack: body.techStack || [],
      features: body.features || [],
      hero_image: body.heroImage || null,
      live_url: body.liveUrl || null,
      github_url: body.githubUrl || null,
      video_url: body.videoUrl || null,
      status: body.status || "live",
      featured: body.featured || false,
      display_order: body.displayOrder || 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A project with that slug already exists." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}