# Viranra Mystics

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full company website/app for "Viranra Mystics" creative agency
- Hero landing section with company branding
- Services section showcasing 6 core services:
  1. AI Agent - intelligent automation and AI-powered tools
  2. Video Editing - professional video editing services
  3. Video Thumbnail - eye-catching thumbnail design
  4. Ads Production - creative ad campaigns and production
  5. Song Video Production - music video creation and production
  6. Pre-Wedding Photography - pre-wedding shoots and photography
- About Us section with company mission and vision
- Portfolio/gallery section showing sample work per service category
- Contact / Get a Quote section with inquiry form
- Navigation with smooth scrolling to each section
- Backend to store service inquiries submitted via the contact form
- Admin view to list all submitted inquiries

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend (Motoko):
   - Data model: ServiceInquiry (name, email, phone, service type, message, timestamp)
   - submitInquiry() - public method to store a new inquiry
   - getInquiries() - query method to retrieve all inquiries (admin use)
2. Frontend (React):
   - App shell with sticky navigation bar (logo + nav links)
   - Hero section with bold tagline, CTA button
   - Services section: 6 service cards with icons, titles, brief descriptions
   - Portfolio section: filterable grid by service category with sample images
   - About section: company story, values
   - Contact section: inquiry form (name, email, phone, service selector, message)
   - Admin page (route /admin) listing all inquiries in a table
   - Smooth scroll behavior, responsive layout
