import { z } from "zod";
import { parsePhoneNumber } from "libphonenumber-js";
import type { NormalizedAddress } from "./types";

export const phqSchema = z.object({
  submission_id: z.string(),
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  dob: z.string(),
  ssn_last4: z.string().regex(/^\d{4}$/).optional(),
  ssn_full: z.string().regex(/^\d{9}$/).optional(),
  phone: z.string().optional(),
  pdf_url: z.string().url().optional(),
  ip: z.string().optional(),
  signature_ts: z.string().optional(),
  addresses_7yr: z
    .array(
      z.object({
        line1: z.string(),
        line2: z.string().optional(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string().optional()
      })
    )
    .optional(),
  employments_10yr: z
    .array(
      z.object({
        employer: z.string(),
        startDate: z.string(),
        endDate: z.string().optional()
      })
    )
    .optional()
});
export type PhqPayload = z.infer<typeof phqSchema>;

export function normalizeDob(dob: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dob)) return dob;
  const m = dob.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return ${m[3]}--;
  throw new Error("Invalid DOB format");
}

export function normalizePhone(p?: string) {
  if (!p) return undefined;
  try {
    const pn = parsePhoneNumber(p, "US");
    if (pn.isValid()) return pn.number;
  } catch {}
  return undefined;
}

export function normalizeAddress(a: NormalizedAddress): NormalizedAddress {
  return {
    line1: a.line1.trim(),
    line2: a.line2?.trim() || undefined,
    city: a.city.trim(),
    state: a.state.trim().toUpperCase(),
    postalCode: a.postalCode.trim(),
    country: (a.country || "US").toUpperCase()
  };
}
