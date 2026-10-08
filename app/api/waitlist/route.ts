import { NextResponse } from "next/server";
import { EMAIL_REGEX } from "@/lib/utils";
import { isPlatform } from "@/lib/waitlist";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { email, platform } = (body ?? {}) as { email?: unknown; platform?: unknown };

  if (typeof email !== "string" || email.length > 254 || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }
  if (!isPlatform(platform)) {
    return NextResponse.json({ error: "Please choose a platform." }, { status: 422 });
  }

  // Signups are only logged for now. Connect a datastore or email provider here to persist them.
  console.info("[waitlist] signup", { email: email.trim().toLowerCase(), platform, at: new Date().toISOString() });

  return NextResponse.json({ ok: true }, { status: 201 });
}
