# Trust Boundary

A Privacy Preserving Multi Service Booking Platform React TypeScript Project.

Trust Boundary is a React, TypeScript booking platform designed to showcase privacy-focused location sharing, modular architecture, offline-first development, and other features related to location-based bookings. This platform is a demo application that allows the user to book care providers while protecting their private location data using deterministic location obfuscation. Only once the user successfully books a provider, they can see the real-world location of the provider.

The project was developed to demonstrate knowledge of creating an application with modules isolated from each other, the implementation of secure location sharing algorithms, application synchronization while being offline, as well as several other features related to booking services.

# Table of Contents

- Overview
- Objectives
- Features
- Technologies
- Project Structure

- Auth

- Module Isolation

- Geo Privacy

- Offline Sync

- Repository Pattern

- Database

- Installation

- Future Work

- Author
# Overview
Booking platforms in modern society tend to give away the personal location data of the service provider before the service is booked. While this may be convenient for users, it is, however, a privacy and security concern for service providers.
Trust Boundary is a privacy-preserving booking platform that implements a unique mechanism of withholding the exact physical location of the service provider until the booking is completed. Apart from the innovative location privacy mechanism, Trust Boundary also implements a number of features including: feature-based module isolation, role-based access control, offline-first synchronization mechanisms, repository pattern, error boundaries, skeleton loading, retry mechanisms, and more.
# Objectives
- Create an application with isolated modules that can scale.
- Implement a deterministic geo-obfuscation algorithm.
- Enable offline-first synchronization.
- Showcase exemplary software engineering patterns and practices.
- Demonstrate the use of repository pattern.
# Features
## Module Isolation
- Independent modules including Sports, Events, Care, etc.
- Isolation of features for easy maintenance and readability.
- Shared components among modules.
- Shared routing logic.
- Shared authentication system.
## Auth
- Mock Auth Implementation
- Role-Based Access Control
- Users vs. Providers
- Provider Dashboard
## Provider Dashboard
- View Dashboard
- Update Availability
- Toggle Booking Visibility
## Geo-Privacy
- Deterministic Obfuscation
- Stable Pseudo-Location
- Max Displacement – 500 meters
- Expose Real-Location on Booking
## Offline Synchronization
- Offline Queue
- Auto Sync
- Availability Conflicts
- Synchronization Status
- Availability Checks
## Engineering Hygiene
- Repository Pattern
- Strict TypeScript
- Error Boundary
- Skeleton Loading
- Empty States
- Retry Mechanisms
# Technologies
| Layer | Technologies |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Maps | Leaflet JS |
| Backend | Supabase (PostgreSQL) |
# Project Structure
```
User
│
▼
React Application
│
▼
Feature Modules
(Sports • Events • Care)
│
▼
Authentication & RBAC
│
▼
Repository Layer
│
▼
Supabase
```
The application is structured according to conventional React application structure with isolated feature modules and an isolated repository pattern layer for database query operations.
# Folder Structure
src
├── auth
├── context
├── modules
│  ├── sports
│  ├── events
│  └── care
├── shared
│  ├── repositories
│  ├── services
│  ├── auth
│  ├── components
│  └── types
├── lib
└── App.tsx
# Auth
For demo purposes, the application does not require an authentication service. Instead, there is a mock authentication system that is used to illustrate the login and role-based access control mechanism.
AuthService
├── mockUser.ts
└── AuthContext.tsx
This demo authentication system allows the application to showcase role-based access to certain parts of the application.
# Module Isolation
Every major feature in the application is implemented as an independent module. Currently there are three feature modules:
- Sports Module
- Events Module
- Care Module
Each module contains its unique set of components, pages, and business logic. The business logic for each module is isolated from other modules while the shared components and services are located in the shared directory.
# Geo Privacy
When displaying a care provider on the map, the service does not display their precise geographical location. Instead, there is an obfuscated pseudo-location that is, however, consistent across refreshes. The reason for this is privacy since revealing the exact location of a provider might compromise their safety.
The pseudo-location is generated using a deterministic algorithm. This means that: the same provider will always have the same pseudo-location throughout the application. Furthermore, the pseudo-location will not be more than 500 meters away from the actual location of the provider.
# Offline Synchronization
When the user is not connected to the internet, their bookings are queued and automatically synced when internet connectivity is re-established. In the case of conflicts with the server data, a conflict resolution algorithm resolves the discrepancy and the booking sync is completed.
# Repository Pattern
All database operations go through a set of repositories. Currently, the following repository classes have been implemented:
- ProviderRepository
- BookingRepository
This is just a small subset of possible repository classes. The pattern allows easier database query organization, abstraction, and testability.
# Database
The application uses Supabase (PostgreSQL) as the database:
Tables
└── users
└── providers
└── bookings
The database operations are managed by the repository layer.
# Installation
First, clone the repository

git clone https://github.com/MrBKiran/Deliverables.git
Then, install dependencies
cd Deliverables
npm install
# Environment Variables
Create a .env file in the root directory of the project
VITE_SUPABASE_URL=https://ateottgkqqylkziwycyp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0ZW90dGdrcXF5bGt6aXd5Y3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNDAzMzcsImV4cCI6MjEwMDkxNjMzN30.aG2K6jH1yOpS15f_Va2E44Te_-ATooDHWdePk51iaNw
# Run
Run the following command to start the development server:
npm run dev
To build the project:
npm run build
To preview the production build:
npm run preview


# Demonstrating Conflict Resolution

The application includes offline synchronization with conflict detection.

To reproduce a booking conflict during evaluation:

### Step 1: Start the application

```bash
npm install
npm run dev
```

### Step 2: Log in

Log in as a normal user and navigate to the Care module.

### Step 3: Simulate a conflict:

Open the following file:

```
geo-privacy-demo\src\shared\services\SyncEngine.ts
```

(or whichever file contains the simulated server availability check.)

Locate the boolean value that represents the provider's availability.

Example:

```ts
const simulateConflict = false;
```

Change it to:

```ts
const simulateConflict = true;
```

Save the file.

You will now see that bookings are getting queued and cnflicted but when simualteConflict = true

