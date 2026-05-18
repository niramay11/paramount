import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, comment, timestamp } = await request.json();

    if (!name || !email || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from("testimonials")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        comment: comment.trim(),
        submitted_at: timestamp ?? new Date().toISOString(),
        approved: false,
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // Email notification (optional — only runs if SMTP is configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT ?? "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM ?? `Testimonial Form <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL ?? process.env.SMTP_USER,
          subject: `New Testimonial from ${name}`,
          html: `
            <h2>New Testimonial Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Testimonial:</strong></p>
            <div style="background:#f9f9f9;padding:15px;border-left:4px solid #154565;margin:15px 0;">
              <p style="font-style:italic;margin:0;">"${comment.replace(/\n/g, "<br>")}"</p>
            </div>
            <p><strong>Submitted at:</strong> ${new Date(timestamp).toLocaleString()}</p>
            <p style="color:#888;font-size:12px;">Log in to Supabase to approve this testimonial.</p>
          `,
        });
      } catch (emailError) {
        // Don't fail the request if email fails
        console.error("Email notification failed:", emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// GET /api/testimonial — returns only approved testimonials for public display
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("id, name, comment, submitted_at")
    .eq("approved", true)
    .order("submitted_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
