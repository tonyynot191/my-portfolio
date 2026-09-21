import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");
  const visitorId = req.nextUrl.searchParams.get("visitorId");

  if (!projectId) {
    return NextResponse.json({ error: "projectId required" }, { status: 400 });
  }

  const supabase = await createClient();

  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId);

  let liked = false;
  if (visitorId) {
    const { data } = await supabase
      .from("likes")
      .select("id")
      .eq("project_id", projectId)
      .eq("visitor_id", visitorId)
      .maybeSingle();
    liked = !!data;
  }

  return NextResponse.json({ count: count ?? 0, liked });
}

export async function POST(req: NextRequest) {
  const { projectId, visitorId } = await req.json();

  if (!projectId || !visitorId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("project_id", projectId)
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (existing) {
    await supabase.from("likes").delete().eq("id", existing.id);
  } else {
    await supabase
      .from("likes")
      .insert({ project_id: projectId, visitor_id: visitorId });
  }

  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId);

  return NextResponse.json({ count: count ?? 0, liked: !existing });
}