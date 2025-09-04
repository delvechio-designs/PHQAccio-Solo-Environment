import type { PhqPayload } from "./validation";
import type { Applicant } from "./types";
import { normalizeAddress, normalizeDob, normalizePhone } from "./validation";

export function mapToApplicant(p: PhqPayload): Applicant {
  return {
    firstName: p.first_name.trim(),
    lastName: p.last_name.trim(),
    email: p.email.toLowerCase(),
    phone: normalizePhone(p.phone),
    dateOfBirth: normalizeDob(p.dob),
    ssnLast4: p.ssn_last4,
    ssnFull: p.ssn_full,
    addresses7yr: p.addresses_7yr?.map(normalizeAddress),
    employments10yr: p.employments_10yr?.map(e => ({
      employer: e.employer.trim(),
      startDate: normalizeDob(e.startDate),
      endDate: e.endDate ? normalizeDob(e.endDate) : undefined
    }))
  };
}
