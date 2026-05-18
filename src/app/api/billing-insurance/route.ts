import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: { json: () => any; }) {
  try {
    const formData = await request.json();
    
    const {
      insuranceType,
      accountNumber,
      medicareNumber,
      dob,
      gender,
      firstName,
      lastName,
      timestamp
    } = formData;

    // Basic validation
    if (!firstName || !lastName || !dob || !accountNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Google Sheets
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ auth, version: "v4" });

      const newRow = [
        [timestamp, insuranceType, accountNumber, medicareNumber, 
         dob, gender, firstName, lastName]
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "billing-insurance!A:H",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: newRow,
        },
      });
    } catch (sheetsError) {
      console.error("Google Sheets error:", sheetsError);
      // Continue even if Sheets fails - we'll still try to send the email
    }

    // 2. Send email notification
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `Billing System <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
          subject: `Billing/Insurance Update: ${firstName} ${lastName}`,
          html: `
            <h2>Billing/Insurance Information Updated</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Insurance Type:</strong> ${insuranceType}</p>
            <p><strong>Account Number:</strong> ${accountNumber}</p>
            <p><strong>Medicare Number:</strong> ${medicareNumber || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Submitted at:</strong> ${new Date(timestamp).toLocaleString()}</p>
          `,
        });

        console.log("Billing insurance email sent successfully");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing billing/insurance form:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}