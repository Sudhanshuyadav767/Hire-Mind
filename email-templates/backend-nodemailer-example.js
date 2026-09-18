/**
 * HireMind - OTP Email Sender (Nodemailer SMTP Integration Example)
 * 
 * Install dependency:
 * npm install nodemailer
 */

const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// 1. Configure SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASS || "your-app-password",
  },
});

/**
 * Send OTP Email Function
 * @param {string} toEmail - Recipient email address
 * @param {string} userName - Recipient user name (e.g., "John")
 * @param {string|number} otpCode - 6-digit OTP code (e.g. "671649" or 671649)
 * @param {number} expiryMinutes - Expiry time in minutes (default: 10)
 */
async function sendOtpEmail(toEmail, userName, otpCode, expiryMinutes = 10) {
  try {
    // Read the HTML template
    const templatePath = path.join(__dirname, "otp-verification.html");
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    // Convert OTP to 6-digit string
    const digitsStr = otpCode.toString().padStart(6, "0");
    const digits = digitsStr.split("");

    const appUrl = process.env.APP_URL || "https://hiremind.com";
    const logoUrl = `${appUrl}/logo/Mind-hire-Logo.png`;

    // Replace dynamic placeholders in pure backend template
    const htmlBody = htmlTemplate
      .replace(/{{logoUrl}}/g, logoUrl)
      .replace(/{{userName}}/g, userName || "User")
      .replace(/{{otpRawCode}}/g, digitsStr)
      .replace(/{{d1}}/g, digits[0] || "6")
      .replace(/{{d2}}/g, digits[1] || "7")
      .replace(/{{d3}}/g, digits[2] || "1")
      .replace(/{{d4}}/g, digits[3] || "6")
      .replace(/{{d5}}/g, digits[4] || "4")
      .replace(/{{d6}}/g, digits[5] || "9")
      .replace(/{{expiryMinutes}}/g, expiryMinutes)
      .replace(/{{year}}/g, new Date().getFullYear())
      .replace(/{{appUrl}}/g, appUrl);

    // Send Mail
    const info = await transporter.sendMail({
      from: '"HireMind Verification" <no-reply@hiremind.com>',
      to: toEmail,
      subject: `${digitsStr} is your HireMind verification code`,
      html: htmlBody,
    });

    console.log("✅ OTP Email sent successfully! Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendOtpEmail };
