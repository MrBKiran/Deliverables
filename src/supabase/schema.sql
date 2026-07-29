-- =========================================================
-- Geo Privacy Demo Database Schema
-- =========================================================
-- Supports:
-- • Mock Authentication
-- • Role-Based Access Control (RBAC)
-- • Booking Management
-- • Offline Queue
-- • Version-Based Conflict Resolution
-- =========================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================================
-- USERS
-- =========================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    role TEXT NOT NULL CHECK (
        role IN ('customer', 'provider')
    ),

    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================================
-- PROVIDERS
-- =========================================================
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    business_name TEXT NOT NULL,

    latitude DOUBLE PRECISION NOT NULL,

    longitude DOUBLE PRECISION NOT NULL,

    address TEXT NOT NULL,

    available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================================
-- BOOKINGS
-- =========================================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    provider_id UUID NOT NULL
        REFERENCES providers(id)
        ON DELETE CASCADE,

    status TEXT NOT NULL CHECK (
        status IN (
            'PENDING',
            'CONFIRMED',
            'CANCELLED'
        )
    ),

    -- Incremented after every successful sync.
    -- Used for optimistic concurrency control.
    version INTEGER NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================================
-- OFFLINE OPERATIONS
-- =========================================================
-- Stores operations created while offline.
CREATE TABLE offline_operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    booking_id UUID NOT NULL
        REFERENCES bookings(id)
        ON DELETE CASCADE,

    operation_type TEXT NOT NULL CHECK (
        operation_type IN (
            'CREATE',
            'UPDATE',
            'DELETE'
        )
    ),

    payload JSONB NOT NULL,

    state TEXT NOT NULL CHECK (
        state IN (
            'QUEUED',
            'SYNCING',
            'SUCCESS',
            'FAILED',
            'CONFLICT'
        )
    ),

    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================================
-- SYNC LOGS
-- =========================================================
CREATE TABLE sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    booking_id UUID NOT NULL
        REFERENCES bookings(id)
        ON DELETE CASCADE,

    status TEXT NOT NULL CHECK (
        status IN (
            'SUCCESS',
            'FAILED',
            'CONFLICT'
        )
    ),

    message TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_provider_user
ON providers(user_id);

CREATE INDEX idx_booking_customer
ON bookings(customer_id);

CREATE INDEX idx_booking_provider
ON bookings(provider_id);

CREATE INDEX idx_booking_version
ON bookings(version);

CREATE INDEX idx_offline_booking
ON offline_operations(booking_id);

CREATE INDEX idx_sync_booking
ON sync_logs(booking_id);