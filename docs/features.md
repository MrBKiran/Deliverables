# Features

Trust Boundary is designed around secure service booking, modular architecture, and offline-first principles. The application demonstrates modern frontend engineering practices while protecting sensitive provider information.

---

## 1. Feature-Based Module Isolation

The application follows a feature-based architecture where each major functionality is implemented as an independent module.

Current modules include:

- Sports Module
- Events Module
- Care Module

Each module contains its own:

- Components
- Pages
- Business logic
- Routing (where applicable)

Shared functionality such as authentication, repositories, and reusable UI components are placed in a shared layer to avoid code duplication.

**Benefits**

- Improved maintainability
- Better scalability
- Independent feature development
- Reduced coupling between modules

---

## 2. Role-Based Access Control (RBAC)

The application implements Role-Based Access Control to ensure users only access features relevant to their role.

Supported roles:

### Customer

Customers can:

- Browse Sports, Events, and Care modules
- View available providers
- Book care services

### Provider

Providers can:

- Access the Provider Dashboard
- Update their availability
- Manage provider-specific information

This separation prevents unauthorized access to provider functionality while maintaining a clean user experience.

---

## 3. Provider Dashboard

A dedicated dashboard allows providers to manage their availability.

Features include:

- View provider information
- Toggle availability status
- Control whether new bookings are accepted

Availability updates are stored in Supabase and immediately reflected in the application.

---

## 4. Privacy-Preserving Geo-Obfuscation

Instead of exposing a provider's exact location, the application displays an obfuscated location before booking confirmation.

The implementation uses deterministic geo-obfuscation, meaning:

- Every provider receives a unique pseudo-location.
- The pseudo-location remains consistent across sessions.
- The displayed location is within 500 meters of the actual location.
- Exact coordinates are revealed only after a successful booking.

This protects provider privacy while still allowing users to identify the general service area.

---

## 5. Booking Workflow

The booking process is designed to be simple while respecting privacy constraints.

Workflow:

1. User selects a provider.
2. The provider's approximate location is displayed.
3. User confirms the booking.
4. Booking information is stored.
5. The provider's exact address and location become visible.

This establishes a clear trust boundary between browsing and confirmed bookings.

---


## 6. Conflict Resolution

During synchronization, the application validates provider availability before committing queued bookings.

If a provider becomes unavailable while the user is offline:

- The booking is marked as conflicted.
- The conflict is reported to the user.
- Invalid bookings are prevented from being committed.

This guarantees database consistency while providing clear feedback to the user.

---

## 7. Repository Pattern

The application separates business logic from database operations using the Repository Pattern.

Repositories currently implemented include:

- ProviderRepository
- BookingRepository

Responsibilities include:

- Fetching provider information
- Creating bookings
- Updating provider availability

This approach improves:

- Code maintainability
- Reusability
- Testability
- Separation of concerns

---



## 8. Supabase Integration

Supabase serves as the backend platform for data persistence.

The application uses Supabase to manage:

- Provider information
- Booking records
- Provider availability

All interactions with Supabase are performed through repository classes, ensuring the presentation layer remains independent of the database implementation.