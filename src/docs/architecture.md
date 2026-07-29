# System Architecture

```
                 React Components
                        │
                        ▼
               Repository Layer
              /                 \
             ▼                   ▼
 ProviderRepository     BookingRepository
             \                 /
              ▼               ▼
          Offline Sync Service
                   │
                   ▼
               Supabase
```

## Design Decisions

- UI never talks directly to Supabase.
- Repository layer abstracts data access.
- Offline Sync Service manages queued operations.
- Geo-obfuscation is isolated inside the services layer.