# Book a Tour email setup

The Book a Tour form supports Microsoft Graph, standard SMTP, and Resend. The
current Outlook / Microsoft 365 mailbox should use Microsoft Graph with OAuth.
This keeps delivery independent from Vercel and allows the website to move to
any Node.js hosting provider without code changes.

## Outlook / Microsoft 365 (recommended)

Create a Microsoft Entra application, grant the application the Microsoft
Graph `Mail.Send` application permission, and grant tenant admin consent. Add
a client secret and configure:

```env
MS_TENANT_ID=your_microsoft_tenant_id
MS_CLIENT_ID=your_entra_application_client_id
MS_CLIENT_SECRET=your_entra_application_client_secret
MS_SENDER_EMAIL=razan@formulatecreative.com
```

Add the same variables to Vercel now, or to any future Node.js hosting
provider. No code change is required when moving the site.

## Standard SMTP for other mail providers

For a non-Microsoft mailbox, configure these server-side environment variables:

```env
SMTP_HOST=mail.your-domain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=forms@your-domain.com
SMTP_PASSWORD=your_email_password
FORM_FROM_EMAIL=SAIS Dubai <forms@your-domain.com>
```

Use port `465` with `SMTP_SECURE=true`, or port `587` with
`SMTP_SECURE=false`, according to the mail provider's instructions.

The recipient is editable in Sanity under **Admissions → Book a Tour → Form
Section → Recipient Email**. It falls back to `razan@formulatecreative.com`.

Resend remains available as an optional fallback. If SMTP is not configured,
set `RESEND_API_KEY` and `FORM_FROM_EMAIL` instead.

Never commit real passwords or API keys to Git. Add them only through the
hosting provider's environment-variable settings and restart or redeploy the
application afterward.
