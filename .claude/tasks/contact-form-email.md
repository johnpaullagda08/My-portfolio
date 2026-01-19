# Contact Form Email Backend

## Goal
Add email functionality to the contact form so submissions are sent to your email.

## Approach
Use **Resend** (modern email API) - free tier includes 100 emails/day, no credit card required.

Alternative considered: Nodemailer with SMTP - requires email password/app password setup, less secure.

## Tasks

- [x] 1. Install Resend package
- [x] 2. Create API route `/app/api/contact/route.ts`
- [x] 3. Update contact form to submit via fetch with loading/success/error states
- [x] 4. Add environment variable for Resend API key

## Implementation Details

### API Route (`/app/api/contact/route.ts`)
```typescript
- Validate required fields (name, email, message)
- Send email via Resend to your email address
- Return success/error JSON response
```

### Form Updates (`/app/contact/page.tsx`)
```typescript
- Add useState for form data, loading, success, error
- Add handleSubmit function with fetch POST to /api/contact
- Show loading spinner on button during submission
- Show success message after submission
- Show error message if failed
```

### Environment Variable
```
RESEND_API_KEY=re_xxxxx
```

## Setup Required (after implementation)
1. Sign up at https://resend.com (free)
2. Get API key from dashboard
3. Add to `.env.local` file

---

## Changes Log

### Completed Implementation

**1. Installed Resend package**
- Added `resend` via npm install

**2. Created API route** (`/app/api/contact/route.ts`)
- POST endpoint that validates name, email, message
- Email format validation
- Sends email via Resend to japs03081995@gmail.com
- Sets reply-to as the sender's email
- Returns JSON success/error responses

**3. Updated contact form** (`/app/contact/page.tsx`)
- Added useState for formData, status, errorMessage
- Added handleSubmit function with fetch POST
- Form inputs now controlled with value/onChange
- Added loading spinner during submission
- Added success message (green) after successful send
- Added error message (red) on failure
- Inputs disabled during loading state
- Added required attribute to all fields

**4. Created environment template** (`.env.example`)
- Template for RESEND_API_KEY

### Setup Required
1. Sign up at https://resend.com (free)
2. Get API key from dashboard
3. Create `.env.local` and add: `RESEND_API_KEY=re_xxxxx`
