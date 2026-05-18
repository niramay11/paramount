// File: app/api/submit-form/route.js

import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // 1. Destructure the form data from the request body
    const { firstName, lastName, email, phone, subject, message, timestamp } =
      await request.json();

    // Basic validation
    if (!firstName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Authenticate with Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    // 3. Prepare the data in the correct order for the sheet
    const newRow = [
      [timestamp, firstName, lastName, email, phone, subject, message],
    ];

    // 4. Append the new row to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "contact!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: newRow,
      },
    });

    // 5. Send email notification via SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // Create transporter
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Send email
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `Contact Form <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <p><strong>Submitted at:</strong> ${new Date(timestamp).toLocaleString()}</p>
          `,
          // Optional: Text version for email clients that don't support HTML
          text: `
            New Contact Form Submission
            Subject: ${subject}
            Name: ${firstName} ${lastName}
            Email: ${email}
            Phone: ${phone || 'Not provided'}
            Message: ${message}
            Submitted at: ${new Date(timestamp).toLocaleString()}
          `,
        });

        console.log("Contact form email sent successfully");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the whole request if email fails
      }
    } else {
      console.warn("SMTP not configured, skipping email notification");
    }

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    
    let errorMessage = "Something went wrong";
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as any).response === "object" &&
      (error as any).response !== null &&
      "data" in (error as any).response &&
      typeof (error as any).response.data === "object" &&
      (error as any).response.data !== null &&
      "error" in (error as any).response.data &&
      typeof (error as any).response.data.error === "object" &&
      (error as any).response.data.error !== null &&
      "message" in (error as any).response.data.error
    ) {
      errorMessage = (error as any).response.data.error.message;
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}