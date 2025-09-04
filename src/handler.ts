import type { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";
import crypto from "crypto";
import pino from "pino";
import { phqSchema } from "./validation";
import { mapToApplicant } from "./mapping";
import { createCase } from "./accio";
import { alert } from "./slack";

const log = pino({ level: process.env.LOG_LEVEL || "info" });
const sha256 = (b: string | Buffer) => crypto.createHash("sha256").update(b).digest("hex");

export const handler: APIGatewayProxyHandlerV2 = async (event): Promise<APIGatewayProxyResultV2> => {
  try {
    if (!event.body) return { statusCode: 400, body: "Missing body" };
    const data = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const parsed = phqSchema.parse(data);
    const applicant = mapToApplicant(parsed);

    const accioPayload = {
      applicant: {
        first_name: applicant.firstName,
        last_name: applicant.lastName,
        email: applicant.email,
        phone: applicant.phone,
        date_of_birth: applicant.dateOfBirth,
        ssn_last4: applicant.ssnLast4,
        ssn_full: applicant.ssnFull
      },
      consent: { ip: parsed.ip, signed_at: parsed.signature_ts }
    };
    const idem = sha256(JSON.stringify(accioPayload));
    const res = await createCase(process.env.ACCIO_BASE_URL || "https://mock.example", accioPayload, idem);

    if (!(res.status >= 200 && res.status < 300 && res.data?.caseId)) {
      await alert(":rotating_light: PHQ→Accio failed", { status: String(res.status) });
      log.error({ msg: "Accio error", status: res.status });
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, caseId: String(res.data.caseId) }),
      headers: { "Content-Type": "application/json" }
    };
  } catch (e) {
    await alert(":rotating_light: PHQ webhook error", { error: (e as Error).message.slice(0,180) });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }
};
