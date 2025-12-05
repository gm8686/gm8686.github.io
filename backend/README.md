# Bruin Quants Backend

Simple Node/Express server that accepts application form submissions and emails them to the club.

## Quick start

```bash
cd backend
cp .env.example .env
# edit .env with your Gmail + app password and target inbox
npm install
npm start
```

By default the server listens on **http://localhost:3000** and exposes:

- `POST /api/apply` – used by `apply.html` in the frontend.

## Frontend config

The frontend does **not** hardcode localhost anymore. Instead, it reads
the base URL from `config.js`:

```js
window.BQ_CONFIG = {{
  API_BASE_URL: "http://localhost:3000"
}};
```

For a deployed backend (Render/Railway/etc), change `API_BASE_URL` to your
public backend URL, e.g.:

```js
API_BASE_URL: "https://bruin-quants-backend.onrender.com"
```

## Email delivery

This uses Gmail via Nodemailer:

- `BQ_EMAIL_USER` – the Gmail address that sends the emails.
- `BQ_EMAIL_PASS` – a **Gmail app password** (recommended) or SMTP password.
- `BQ_TARGET_EMAIL` – where applications are delivered (default: `gmckellips86@gmail.com`).
