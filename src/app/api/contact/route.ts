import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  try {
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error verifying captcha:", error);
    return false;
  }
}

export async function POST(req: Request) {
  const { name, email, subject, message, captchaToken } = await req.json();

  if (!name || !email || !subject || !message) {
    throw new Error("Please Complete fields");
  }

  const isValid = await verifyCaptcha(captchaToken);

  if (isValid) {
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="border-left: 4px solid #0070f3; padding-left: 10px; color: #555;">
          ${message}
        </p>
        <hr style="border: 0; border-top: 1px solid #ccc;">
        <p style="font-size: 0.9em; color: #888;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: subject,
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ message: "Message sent successfully" });
    } catch (error) {
      return NextResponse.json({
        message: "Failed to send message",
        error,
      });
    }
  }
  NextResponse.json({
    message: "Invalid Token",
  });
}
