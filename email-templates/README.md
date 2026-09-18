# HireMind - OTP Email Template & SMTP Setup

Exact 100% Mockup-Matched HTML Email Template for HireMind OTP Verification.

## File Locations
- **HTML Email Template:** [email-templates/otp-verification.html](file:///d:/Mind%20Hire/frontend/email-templates/otp-verification.html)
- **Node.js / Nodemailer Integration Code:** [email-templates/backend-nodemailer-example.js](file:///d:/Mind%20Hire/frontend/email-templates/backend-nodemailer-example.js)

---

## 🎨 Key Features Implemented:
1. **Top Gradient Accent Bar:** 5px `#2D24D0` to `#4F46E5` top gradient border.
2. **Branding Header:** HireMind logo (`/logo/Mind-hire-Logo.png`) + `HireMind` title + `AI-Powered Hiring Platform` subtitle.
3. **6 Separate Digit Boxes (`d1` to `d6`):** White rounded cards with bold purple digits (`6`, `7`, `1`, `6`, `4`, `9`).
4. **Copy Code Feature (`{{otpRawCode}}`):** Single-click copyable badge (`📋 Copy Code: 671649`) so users can copy the whole code instantly without extra spaces.
5. **No "Go to HireMind" Button:** Omitted as requested.
6. **Security Alert Box:** Amber lock box with warning notice.
7. **"Why HireMind?" Footer Showcase Card:**
   - 4 Features: `AI-Powered Matching`, `Faster Hiring`, `Secure & Reliable`, `Better Insights`.
   - Inner logo & social links sub-footer.

---

## 🛠️ Placeholders Reference for Backend Team

| Placeholder | Example | Description |
| :--- | :--- | :--- |
| `{{userName}}` | `"John"` | User's first name |
| `{{d1}}` ... `{{d6}}` | `"6"`, `"7"`, ... | Individual OTP digits |
| `{{otpRawCode}}` | `"671649"` | Full OTP string for 1-click copy |
| `{{expiryMinutes}}` | `10` | Code expiry minutes |
| `{{year}}` | `2026` | Current year |
| `{{appUrl}}` | `https://hiremind.com` | App base URL |
