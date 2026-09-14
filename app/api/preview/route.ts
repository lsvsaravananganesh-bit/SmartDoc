import { NextResponse } from "next/server";
import { mergeTemplate } from "@/lib/merge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const template = String(body.template ?? "");
    const row = (body.row ?? {}) as Record<string, string>;
    return NextResponse.json({ content: mergeTemplate(template, row) });
  } catch {
    return NextResponse.json({ error: "Invalid preview request" }, { status: 400 });
  }
}
