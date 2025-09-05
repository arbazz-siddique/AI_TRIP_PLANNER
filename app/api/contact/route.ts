// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string | null;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    // Ensure env vars present
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      console.error("Missing SMTP env vars");
      return NextResponse.json(
        { error: "Server misconfiguration: missing SMTP env vars" },
        { status: 500 }
      );
    }

    // Check if this is a newsletter subscription (only email provided)
    const isSubscription = body.email && !body.name && !body.subject && !body.message;

    if (isSubscription) {
      // Handle newsletter subscription
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: SMTP_USER, // Must use authenticated email
        to: CONTACT_TO,
        subject: "New Newsletter Subscriber",
        text: `A new user subscribed with email: ${body.email}`,
        html: `<p>A new user subscribed with email: <strong>${escapeHtml(body.email!)}</strong></p>`,
      });

      console.log("Subscription email sent:", info.messageId);
      return NextResponse.json({ ok: true, type: "subscription" });
    }

    // Handle contact form submission
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // verify transporter
    try {
      await transporter.verify();
      console.log("SMTP transporter verified");
    } catch (verifyErr) {
      console.error("SMTP transporter verification failed:", verifyErr);
      return NextResponse.json(
        {
          error: "SMTP verification failed",
          detail: (verifyErr as Error).message,
        },
        { status: 500 }
      );
    }

    const mailHtml = `
      <h3>New contact message</h3>
      <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(body.phone ?? "—")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
      <hr/>
      <p>${escapeHtml(body.message).replace(/\n/g, "<br/>")}</p>
    `;

    const info = await transporter.sendMail({
      from: SMTP_USER, // Always use your authenticated email
      to: CONTACT_TO,
      replyTo: `${body.name} <${body.email}>`, // Set reply-to instead
      subject: `[Contact] ${body.subject} — ${body.name}`,
      text: `${body.name} <${body.email}>\n\n${body.message}`,
      html: mailHtml,
    });

    console.log("Email sent:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Error sending contact email:", err);
    return NextResponse.json(
      { error: "Failed to send email", detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}