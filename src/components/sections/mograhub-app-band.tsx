import type { MograHubAppBand as MograHubAppBandData } from "@/types/sanity";

const defaults: Required<MograHubAppBandData> = {
  eyebrow: "Parent & Student Mobile App",
  title: "Your school in your pocket — download mograHUB",
  description:
    "Attendance, timetable, homework and assignments, exam results and report cards, fee statements and school announcements — all in one app, for parents and students.",
  schoolCodeLabel: "School Code",
  schoolCode: "SAISD",
  androidUrl: "https://play.google.com/store/apps/details?id=com.mogra.hub&hl=en",
  appleUrl: "https://apps.apple.com/ae/app/mograhub/id6736962827",
};

function QrCode({ href, label }: { href: string; label: string }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&format=svg&margin=8&color=216b97&data=${encodeURIComponent(href)}`;

  return (
    <a className="mograhub-band__qr-card" href={href} target="_blank" rel="noreferrer">
      {/* The QR service returns a lightweight SVG that points to the same verified store URL. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qrUrl} alt={`Scan to install mograHUB on ${label}`} />
      <span>{label}</span>
    </a>
  );
}

function GooglePlayMark() {
  return (
    <svg className="mograhub-band__google-play-mark" viewBox="0 0 42 46" aria-hidden="true">
      <path fill="#00d6ff" d="M3 3.2 25.8 23 3 42.8c-1.2-1-2-2.6-2-4.5V7.7c0-1.9.8-3.5 2-4.5Z" />
      <path fill="#ffdc35" d="m25.8 23 7.6-6.6 7.2 4.1c1.9 1.1 1.9 3.9 0 5l-7.2 4.1-7.6-6.6Z" />
      <path fill="#ff3a44" d="M3 42.8 25.8 23l7.6 6.6L7.1 44.5c-1.5.8-3 .2-4.1-1.7Z" />
      <path fill="#00ef79" d="M3 3.2c1.1-1.9 2.6-2.5 4.1-1.7l26.3 14.9-7.6 6.6L3 3.2Z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg className="mograhub-band__apple-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.67 13.81c-.03-2.57 2.1-3.8 2.2-3.86a4.72 4.72 0 0 0-3.72-2.01c-1.56-.17-3.08.94-3.87.94-.81 0-2.03-.92-3.35-.89a4.92 4.92 0 0 0-4.14 2.52c-1.8 3.1-.46 7.66 1.26 10.17.86 1.22 1.86 2.59 3.18 2.54 1.28-.06 1.77-.82 3.32-.82 1.54 0 1.99.82 3.33.79 1.38-.02 2.25-1.23 3.08-2.47a10.1 10.1 0 0 0 1.41-2.86 4.62 4.62 0 0 1-2.71-4.05ZM17.13 6.28A4.58 4.58 0 0 0 18.18 3a4.65 4.65 0 0 0-3 1.56 4.3 4.3 0 0 0-1.06 3.11 3.84 3.84 0 0 0 3.01-1.39Z"
      />
    </svg>
  );
}

export function MograHubAppBand({ section }: { section?: MograHubAppBandData }) {
  const content = { ...defaults, ...section };

  return (
    <section id="mograhub-app" className="mograhub-band" aria-labelledby="mograhub-band-title">
      <div className="mograhub-band__inner">
        <div className="mograhub-band__copy">
          <p className="mograhub-band__eyebrow">{content.eyebrow}</p>
          <h2 id="mograhub-band-title">{content.title}</h2>
          <p className="mograhub-band__description">{content.description}</p>

          <p className="mograhub-band__school-code">
            <span>{content.schoolCodeLabel}</span>
            <strong>{content.schoolCode}</strong>
          </p>

          <div className="mograhub-band__store-links">
            <a href={content.androidUrl} target="_blank" rel="noreferrer">
              <GooglePlayMark />
              <span><small>GET IT ON</small>Google Play</span>
            </a>
            <a href={content.appleUrl} target="_blank" rel="noreferrer">
              <AppleMark />
              <span><small>Download on the</small>App Store</span>
            </a>
          </div>
        </div>

        <div className="mograhub-band__qr-list" aria-label="mograHUB app download QR codes">
          <QrCode href={content.androidUrl} label="Android" />
          <QrCode href={content.appleUrl} label="iPhone / iPad" />
        </div>
      </div>
    </section>
  );
}
