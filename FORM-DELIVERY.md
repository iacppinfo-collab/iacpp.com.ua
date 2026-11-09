# Form delivery

Contact, membership and partnership forms use the FormSubmit AJAX endpoint for `iacpp.info@gmail.com`. No mailbox password or private API key is stored in the website.

## Activation

Publishing and mailbox activation are separate steps. After the owner authorizes publication, the first submission triggers an activation email from FormSubmit. The mailbox owner must confirm it. Check the spam folder if necessary. Each form may require confirmation; follow the activation messages from the service.

No real submission or activation request was sent during development. Tests intercept all submission requests locally. Do not send a real test application without the owner's permission.

## Delivery states

- A successful HTTP status and an explicit `success: true` or `success: "true"` response are required for acceptance confirmation.
- Acceptance by FormSubmit is not a guarantee of delivery to the recipient's inbox. The site does not claim inbox delivery.
- An activation or verification response is shown separately, not as success.
- Rejected requests, connection failures, unexpected responses and a 20-second timeout retain entered values and provide an email fallback.
- A connection error may occur after the service accepted the request, so the message warns that retrying may duplicate it.
- Pending requests remain locked while changing languages or navigating between sections.

## Privacy and spam

Only the form values and a canonical public page URL are sent. Local filesystem paths and unrelated URL parameters are not included. Drafts and delivery status are held in memory, not browser storage. The form identifies FormSubmit as the processor and warns against including medical data or confidential client information.

A honeypot is included. The integration does not disable the provider's spam controls or configure automatic replies. Browser-side controls cannot replace provider-side spam prevention.

FormSubmit documents retention of submissions for 30 days. See the current provider documentation and privacy policy before changing how sensitive information is collected.

- https://formsubmit.co/documentation
- https://formsubmit.co/ajax-documentation
- https://formsubmit.co/help
- https://formsubmit.co/privacy.pdf

## Verification

Run `tests/site-smoke.cjs` and `tests/form-delivery.cjs` with Playwright available. Set `PLAYWRIGHT_MODULE` to an absolute module path when needed. Both suites mock submission requests and must not send applications to the live service.
