// Bruin Quants backend – simple Node/Express email relay for applications

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const upload = multer();

// Allow basic form posts from anywhere (you can tighten this later)
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/apply", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      email,
      year,
      major,
      gpa,
      experience,
      why,
      projects,
      links,
    } = req.body;

    const resumeFile = req.file;

    // Configure your email transport.
    // Recommended: set BQ_EMAIL_USER to a Gmail address and BQ_EMAIL_PASS to an app password.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BQ_EMAIL_USER,
        pass: process.env.BQ_EMAIL_PASS,
      },
    });

    const lines = [
      "New Bruin Quants application",
      "----------------------------------",
      `Name: ${name}`,
      `Email: ${email}`,
      `Year: ${year}`,
      `Major: ${major}`,
      `GPA: ${gpa || "N/A"}`,
      "",
      "Programming background:",
      experience || "N/A",
      "",
      "Why Bruin Quants?",
      why || "N/A",
      "",
      "Relevant projects / experience:",
      projects || "N/A",
      "",
      "Links:",
      links || "N/A",
    ];

    const mailOptions = {
      from: `"Bruin Quants Applications" <${process.env.BQ_EMAIL_USER}>`,
      to: "gmckellips86@gmail.com",
      subject: `New Bruin Quants Application – ${name}`,
      text: lines.join("\n"),
      attachments: resumeFile
        ? [
            {
              filename: resumeFile.originalname || "resume.pdf",
              content: resumeFile.buffer,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    res.send(`
      <html>
      <body style="font-family: system-ui; background:#030712; color:#e5e7eb; text-align:center; padding:40px">
        <h1>Thanks${name ? ", " + name.split(" ")[0] : ""}!</h1>
        <p>Your application was received. We’ll review it and reach out if there’s a fit.</p>
        <a href="javascript:window.history.back()" style="color:#38bdf8">Back to site</a>
      </body>
      </html>
    `);
  } catch (err) {
    console.error("Error handling application:", err);
    res
      .status(500)
      .send(
        "Something went wrong submitting your application. Please try again later or email us directly."
      );
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bruin Quants backend listening on port ${PORT}`);
});
