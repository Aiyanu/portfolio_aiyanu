import { db } from "@/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function verifyCaptcha(token: string): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: params,
    });
    const data = await res.json();
    // If using reCAPTCHA v3 you may want to check data.score and action
    return Boolean(data.success);
  } catch (err) {
    console.error("verifyCaptcha error:", err);
    return false;
  }
}

function validateInput({ name, email, subject, message }: any) {
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return "All fields are required.";
  }
  // basic email regex (keep simple) — consider a library for robust validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email address.";
  }
  if (subject.length > 200) return "Subject too long.";
  if (message.length > 5000) return "Message too long.";
  return null;
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, captchaToken } = await req.json();

    const inputError = validateInput({ name, email, subject, message });
    if (inputError)
      return NextResponse.json({ message: inputError }, { status: 400 });

    const isValid = await verifyCaptcha(captchaToken);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid captcha token." },
        { status: 401 }
      );
    }

    // build email HTML safely — consider templating and sanitizing message (strip html)
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">${subject}</h2>
        <h3 style="color: #333;">New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="border-left: 4px solid #0070f3; padding-left: 10px; color: #555;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <hr style="border: 0; border-top: 1px solid #ccc;">
        <p style="font-size: 0.9em; color: #888;">This email was sent from your portfolio contact form.</p>
      </div>
    `;

    // Transporter config — Gmail example (app password) or use SMTP provider
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password for Gmail or SMTP password
      },
    });

    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`, // use your verified sending address
      replyTo: email, // replies go to the submitter
      to: process.env.RECEIVER_EMAIL,
      subject: `Portfolio Contact — ${subject}`,
      html: emailContent,
    };

    // send mail
    await transporter.sendMail(mailOptions);

    // save to DB (wrap in try/catch)
    try {
      await db.user.create({
        data: { name, email, subject, message },
      });
    } catch (dbErr) {
      console.error("DB save error:", dbErr);
      // don’t fail the whole request if DB save fails — optionally return 500
    }

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
