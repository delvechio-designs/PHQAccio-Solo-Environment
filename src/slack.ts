import axios from "axios";

export async function alert(text: string, fields?: Record<string, string | number>) {
  const url = process.env.SLACK_WEBHOOK_URL_LOCAL;
  if (!url) return;
  await axios.post(url, {
    text,
    attachments: fields
      ? [{ fields: Object.entries(fields).map(([t,v]) => ({ title: t, value: String(v), short: true })) }]
      : undefined
  });
}
