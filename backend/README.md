# Bruin Quants Backend

Simple Node/Express server that accepts application form submissions and emails them to the club.

## Quick start

```bash
cd backend
cp .env.example .env
# edit .env with your Gmail + app password
npm install
npm start
```

By default the server listens on **http://localhost:3000** and exposes:

- `POST /api/apply` – used by `apply.html` in the frontend.

The frontend form in `apply.html` is currently set to:

```html
<form action="http://localhost:3000/api/apply" method="post" enctype="multipart/form-data">
```

When you deploy the backend (e.g. Render/Railway/Fly.io), update that `action` URL to your deployed endpoint.

## Email delivery

This uses Gmail via Nodemailer:

- `BQ_EMAIL_USER` – the Gmail address that sends the emails.
- `BQ_EMAIL_PASS` – a **Gmail app password** (recommended) or SMTP password.

Applications are sent to:

- `gmckellips86@gmail.com`
