// File: app/api/application/route.js

import { google } from "googleapis";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // 1. Parse the form data
    const formData = await request.formData();
    
    // 2. Extract form fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const telephone = formData.get("telephone") as string;
    const cellNumber = formData.get("cellNumber") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const document = formData.get("document") as File;
    const timestamp = formData.get("timestamp") as string;

    // 3. Basic validation
    if (!firstName || !lastName || !email || !cellNumber || !position || !document) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 4. Handle file upload
    let documentPath = "";
    let fileBuffer = null;
    
    if (document) {
      const bytes = await document.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
      
      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'resumes');
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (err) {
        console.error("Error creating directory:", err);
      }
      
      // Generate unique filename
      const timestamp = Date.now();
      const originalName = document.name;
      const extension = originalName.split('.').pop();
      const fileName = `${firstName}_${lastName}_${timestamp}.${extension}`;
      documentPath = `/uploads/resumes/${fileName}`;
      
      // Save file
      const filePath = join(uploadsDir, fileName);
      await writeFile(filePath, fileBuffer);
    }

    // 5. Authenticate with Google Sheets
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

    // 6. Prepare the data for the sheet
    const newRow = [
      [
        timestamp, 
        firstName, 
        lastName, 
        email, 
        telephone, 
        cellNumber, 
        position, 
        documentPath
      ],
    ];

    // 7. Append the new row to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "applications!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: newRow,
      },
    });

    // 8. Send email with application details and attachment using Nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // Create transporter
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Send mail
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `Job Applications <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
          subject: `New Job Application: ${firstName} ${lastName} - ${position}`,
          html: `
            <h2>New Job Application Received</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${telephone} (Tel) / ${cellNumber} (Cell)</p>
            <p><strong>Position:</strong> ${position}</p>
            <p><strong>Applied at:</strong> ${new Date(timestamp).toLocaleString()}</p>
            <p>Resume is attached to this email.</p>
          `,
          attachments: document && fileBuffer ? [
            {
              filename: document.name,
              content: fileBuffer,
              contentType: document.type,
            }
          ] : [],
        });

        console.log("Application email sent successfully");
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
    console.error("Error processing application:", error);
    
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