# PHQ → Accio (Solo, Testable)

Security-first, serverless pipeline:
- Jotform webhook → API Gateway (HTTPS)
- Lambda validates/normalizes, stores JSON/PDF (S3), maps and POSTs to Accio
- DynamoDB audit row (email/submissionId/caseId/sha256/timestamp)
- Slack Alerts on failures
- Includes **mock Accio** so you can test end-to-end before you have real credentials

## Prerequisites
- Node.js 22 LTS
- pnpm 9 ('corepack enable && corepack prepare pnpm@9 --activate')
- Terraform ≥ 1.7
- AWS account with rights to S3, DDB, Secrets, Lambda, API Gateway
- Slack Incoming Webhook (Optional but recommended for alerts)

## Local Build & Test
```bash
pnpm install
pnpm build
pnpm test