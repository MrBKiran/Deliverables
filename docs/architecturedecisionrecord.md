# Architecture Decision Record (ADR)

This section documents the key architectural decisions made during the development of Trust Boundary. Each decision includes the rationale behind the choice and the benefits it provides to the overall system.

---

## ADR-001: Feature-Based Module Isolation

### Decision

The application is organized using a feature-based architecture rather than grouping files by type.

```
src/
│
├── modules/
│   ├── sports/
│   ├── events/
│   └── care/
│
└── shared/
```

### Rationale

As the application grows, organizing files by feature keeps all related components, pages, business logic, and utilities together. This improves maintainability and allows developers to work on individual features with minimal impact on other parts of the application.

### Consequences

- Clear separation of business domains
- Easier navigation through the codebase
- Improved scalability
- Reduced coupling between modules

**Trade-offs**

- Shared functionality must be carefully identified to avoid duplication.

---

## ADR-002: Repository Pattern

### Decision

All communication with Supabase is performed through repository classes instead of directly from React components.

Examples include:

- `ProviderRepository`
- `BookingRepository`

### Rationale

Separating database operations from the presentation layer improves maintainability and keeps UI components focused solely on rendering and user interaction.

### Consequences

- Better separation of concerns
- Easier testing
- Simplified maintenance
- Backend implementation can change with minimal impact on the UI

**Trade-offs**

- Introduces additional abstraction layers.

---

## ADR-003: React Context for Authentication State

### Decision

Global authentication state is managed using React Context.

### Rationale

The application requires user information and role data to be accessible throughout multiple modules. React Context provides a lightweight solution without introducing additional state management libraries.

### Consequences


- Centralized authentication state
- Simple implementation
- No external dependencies

**Trade-offs**

- For significantly larger applications, a dedicated state management library may provide more advanced capabilities.

---

## ADR-004: Mock Authentication

### Decision

Authentication is implemented using predefined mock users instead of integrating a production authentication provider.

### Rationale

The primary objective of the assessment is to demonstrate authorization, role-based access control, and architectural design rather than production-ready identity management.

Using mock users allows the project to remain lightweight while focusing on the required assessment objectives.

### Consequences

**Advantages**

- Simplifies project setup
- Eliminates dependency on external authentication services
- Allows reviewers to test role-based functionality immediately

**Trade-offs**

- Not suitable for production deployment.

---

## ADR-005: Deterministic Geo-Obfuscation

### Decision

Provider locations are obfuscated using a deterministic mathematical algorithm before a booking is confirmed.

### Rationale

Randomly generating a new location on every request would cause the provider marker to move each time the page reloads, creating an inconsistent user experience.

A deterministic approach ensures that each provider always appears at the same approximate location until the booking is confirmed.

### Consequences

- Protects provider privacy
- Provides a consistent user experience
- Simple and computationally efficient
- No additional database storage required

**Trade-offs**

- The displayed location is approximate rather than exact.

---

## ADR-006: Offline Queue with Conflict Resolution

### Decision

Bookings created while offline are stored in a local queue and synchronized automatically when connectivity is restored.

Users may lose internet connectivity while creating bookings. Storing pending operations locally ensures no booking requests are lost and improves application reliability.

Provider availability is revalidated during synchronization to detect conflicts before committing data.

### Consequences


- Supports offline operation
- Prevents data loss
- Maintains database consistency
- Improves user experience

**Trade-offs**

- Additional synchronization logic is required.
- Conflict handling introduces extra application complexity.

---

## ADR-007: Supabase as the Backend

### Decision

Supabase was selected as the backend platform.

### Rationale

Supabase provides a managed PostgreSQL database together with a modern developer experience, allowing the project to focus on frontend architecture rather than backend infrastructure.

### Consequences

- Rapid development
- PostgreSQL support
- Easy integration with React
- Minimal backend configuration

**Trade-offs**

- The application depends on an external managed service.

## Limitations


The following limitations remain in the current implementation:

- **Booking Persistence:** New bookings are currently not being persisted to the Supabase `bookings` table. As a result, completed bookings are not reflected in the database, and the end-to-end booking workflow requires further debugging.

- **Offline Synchronization:** The offline queue and synchronization infrastructure has been partially implemented. However, because booking persistence is currently incomplete, the offline synchronization and conflict resolution workflow cannot be fully validated.

- **Conflict Resolution:** The intended design includes validating provider availability before synchronizing queued bookings. This workflow has been designed architecturally but has not been fully implemented or tested.

- **Provider Authentication:** Provider login currently uses predefined mock user data. At present, logging in as a provider automatically authenticates the associated mock provider instead of allowing the user to select a specific provider profile. A production implementation would authenticate the user and then retrieve the corresponding provider profile from the database.

- **Authentication:** The project uses mock authentication for demonstration purposes and does not integrate with a production identity provider.

> **Implementation Note:** For the purpose of this assessment, provider accounts are mapped directly to predefined entries in `mockUser.ts`. This simplifies authentication but does not represent the intended production workflow, where authenticated users would be associated with provider records stored in Supabase.