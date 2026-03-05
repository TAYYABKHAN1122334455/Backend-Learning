// Mailgen → Responsible ONLY for generating beautiful HTML email layout
import Mailgen from "mailgen";

// Nodemailer → Responsible for actually sending email via SMTP
import nodemailer from "nodemailer";

/*
  ==============================
  📩 MAIN EMAIL SENDING FUNCTION
  ==============================

  options object expected structure:

  {
    email: "user@example.com",
    subject: "Verify your email",
    mailGenContent: { ...template object... }
  }

  This function is reusable for ANY type of email.
*/
export const sendEmail = async (options) => {

  // 1️⃣ Create Mailgen instance
  // This defines how your email design will look globally.
  const mailGenerator = new Mailgen({
    theme: "default", // Built-in theme (you can customize)
    product: {
      name: "Task Manager", // Appears in header/footer
      link: "https://taskmanagerlink.com"
    }
  });

  // 2️⃣ Convert structured template object into HTML email
  // This creates the styled email with button etc.
  const emailHtml = mailGenerator.generate(options.mailGenContent);

  // 3️⃣ Also generate plain text version
  // Important because:
  // - Some email clients don't support HTML
  // - Spam filters prefer both formats
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  // 4️⃣ Create SMTP transporter
  // This creates connection between your backend and Mailtrap (or any SMTP provider)
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST, // SMTP server host
    port: Number(process.env.MAILTRAP_SMTP_PORT), // Convert string → number
    secure: false, // true only if using port 465
    auth: {
      user: process.env.MAILTRAP_SMTP_USER, // SMTP username
      pass: process.env.MAILTRAP_SMTP_PASSWORD // SMTP password
    }
  });

  // 5️⃣ Email structure (actual email object)
  const mailOptions = {
    from: `"Task Manager" <mail.taskmanager@example.com>`, // Sender
    to: options.email, // Receiver email
    subject: options.subject, // Email subject line
    text: emailText, // Plain text fallback
    html: emailHtml  // Main styled email
  };

  try {
    // 6️⃣ Send email to SMTP server
    const response = await transporter.sendMail(mailOptions);

    // messageId confirms email was accepted by SMTP server
    console.log("Email sent successfully:", response.messageId);

    return response; // return response so controller can use it if needed

  } catch (error) {

    // If email fails (wrong credentials / network issue)
    console.error("Email service failed. Check SMTP credentials.");
    console.error(error);

    // Important → Throw error so upper layer can handle it
    throw error;
  }
};

/*
  ==================================
  📧 EMAIL VERIFICATION TEMPLATE
  ==================================

  username → Name of user
  link → Verification URL containing token

  This function RETURNS a structured object.
  Mailgen converts this object → styled HTML.
*/

export const createVerificationTemplate = (username, link) => {
  return {
    body: {

      // This shows: "Hi Tayyab,"
      name: username,

      // Intro paragraph
      intro: "Welcome to Task Manager! Please verify your email.",

      // Action section → Button + Instructions
      action: {
        instructions: "Click the button below to verify your account:",

        // Button configuration
        button: {
          color: "#22BC66", // Button color
          text: "Verify Email", // Button text
          link: link // URL where user is redirected
        }
      },

      // Footer message
      outro: "If you did not create this account, please ignore this email."
    }
  };
};
/*
  ==================================
  🔐 PASSWORD RESET TEMPLATE
  ==================================

  username → Name of user
  link → Reset password link containing token
*/

export const passwordForgottenTemplate = (username, link) => {
  return {
    body: {

      // Greeting line
      name: username,

      // Intro paragraph
      intro: "We received a request to reset your password.",

      // Button section
      action: {
        instructions: "Click the button below to reset your password:",

        button: {
          color: "#E74C3C",
          text: "Reset Password",
          link: link
        }
      },

      // Footer
      outro: "If you did not request this, please ignore this email."
    }
  };
};