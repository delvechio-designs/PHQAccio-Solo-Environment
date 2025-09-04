import axios from "axios";

export async function createCase(baseUrl: string, payload: unknown, idemKey?: string) {
  const url = `${baseUrl.replace(/\/+$/,"")}/v1/cases`;
  const res = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer `,
      "Content-Type": "application/json",
      ...(idemKey ? { "Idempotency-Key": idemKey } : {})
    },
    timeout: 15000,
    validateStatus: () => true
  });
  return res;
}
