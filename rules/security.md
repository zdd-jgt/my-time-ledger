# Security Rules

## Confirmation Required

Ask the user before:

- Security scans against non-local targets.
- Authentication or authorization changes.
- Payment, billing, subscription, purchase, invoice, refund, or money-transfer behavior.
- Adding cloud storage, analytics, third-party SDKs, or external APIs.
- Handling sensitive personal data beyond local-only MVP storage.

## Local Data

- Current MVP direction stores data locally in the browser.
- Do not send ledger data to external services unless a spec explicitly requires it and the user confirms.
- Treat receipt images as sensitive; do not implement upload or sharing without explicit confirmation.

## Secrets

- Do not commit secrets, tokens, private keys, or credentials.
- Do not add real credentials to examples or test fixtures.
- Use environment variables or documented placeholders if external services are introduced later.

## Error Handling

- Avoid exposing stack traces or raw storage errors to users.
- Use user-safe error messages and keep technical details in development logs only.
