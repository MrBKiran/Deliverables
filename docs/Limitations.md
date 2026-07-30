# Limitations

Although the application successfully demonstrates the core architectural concepts required for the assessment, several features remain partially implemented or require additional refinement.

## 1. Booking Persistence

The booking workflow is currently incomplete.

Although the booking interface is functional, newly created bookings are not consistently persisted to the Supabase `bookings` table. As a result, the booking workflow cannot yet be validated end-to-end.

This issue also affects the ability to fully test synchronization and conflict resolution.

---

## 2. Offline Synchronization

The project includes the architectural foundation for offline synchronization, including:

- Offline Queue
- Synchronization Engine
- Conflict Resolver
- Network Monitoring

However, the complete synchronization pipeline has not yet been fully integrated.

Queued operations are not currently replayed successfully after reconnection.

---

## 3. Conflict Resolution

The conflict resolution workflow was designed but has not been fully implemented.

The intended workflow validates provider availability before synchronizing queued bookings to prevent conflicting updates.

At present, this behaviour remains conceptual and requires further implementation and testing.

---

## 4. Provider Authentication

Provider authentication currently relies on predefined mock user data.

Logging in as a provider automatically authenticates the corresponding mock provider defined in `mockUser.ts`.

The application does not currently allow selecting or associating a specific provider profile during login.

In a production implementation, authenticated users would be linked to provider records stored in the database rather than static mock data.

---

## 5. Mock Authentication

Authentication is implemented using predefined mock users instead of a production authentication service.

This simplifies testing while allowing the project to focus on authorization and architectural design.

---

## 6. Error Handling

While common error scenarios are handled, additional production-level error handling could be implemented, including:

- Automatic retry strategies
- Better recovery from synchronization failures
- More informative user notifications

---