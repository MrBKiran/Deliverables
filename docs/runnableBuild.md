# Runnable Build

This section describes the steps required to set up and run the project locally.

---

## Prerequisites

Before running the project, ensure the following software is installed:

- Node.js (v18 or later)
- npm (v9 or later)
- Git
- A Supabase project (or use the provided configuration)

---

## Clone the Repository

```bash
git clone <repository-url>
cd geo-privacy-demo
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholder values with your own Supabase project credentials.

---

## Database Setup

Run the SQL schema provided in:

```text
supabase/schema.sql
```

This creates the required tables:

- Users
- Providers
- Bookings
- Offline Operations
- Sync Logs

---

## Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

The production build will be generated inside the `dist/` directory.

---

## Preview the Production Build

```bash
npm run preview
```

---

## Test Credentials

<table>
  <thead>
    <tr>
      <th align="left">Role</th>
      <th align="left">Email</th>
      <th align="left">Password</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Customer</td>
      <td><code>customer@example.com</code></td>
      <td><code>********</code></td>
    </tr>
    <tr>
      <td>Provider</td>
      <td><code>provider@example.com</code></td>
      <td><code>********</code></td>
    </tr>
  </tbody>
</table>

> Replace these credentials with the actual mock users defined in your project.

---

## Project Structure

```text
geo-privacy-demo/
│
├── docs/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── features/
│   ├── modules/
│   ├── repositories/
│   ├── services/
│   └── types/
│
├── supabase/
│   └── schema.sql
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## Known Limitations

The current implementation includes the core architecture required for the assessment. However, due to the 12-hour development constraint, the following features remain partially implemented:

- Booking persistence to Supabase is incomplete.
- Offline synchronization is not fully integrated.
- Conflict resolution workflow is partially implemented.
- Authentication uses predefined mock users instead of Supabase Authentication.

These limitations are documented in the **Time Log & Limitations** section.