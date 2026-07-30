import { useEffect, useMemo, useState } from "react";
import { useAppState } from "../../../state/AppContext";
import { useAuth } from "../../../auth/AuthContext";

import {
    BookingStatus,
    getVisibleProviderLocation,
} from "../../../services/bookingState";

import { ProviderRepository } from "../repositories/ProviderRepository";
import { BookingRepository } from "../../../shared/repositories/BookingRepository";

import type { Provider } from "../../../types/provider";

export default function Provider() {
    const { logout, user } = useAuth();

    const {
        isOnline,
        setIsOnline,
    } = useAppState();

    // Repository instances
    const providerRepository = useMemo(
        () => new ProviderRepository(),
        []
    );

    const bookingRepository = useMemo(
        () => new BookingRepository(),
        []
    );

    // State
    const [provider, setProvider] =
        useState<Provider | null>(null);

    const [bookingStatus, setBookingStatus] =
        useState<BookingStatus>(
            BookingStatus.PENDING
        );

    // Load provider
    useEffect(() => {
    providerRepository
        .getAllProviders()
        .then((providers) => {
            if (providers.length > 0) {
                setProvider(providers[0]);
            }
        });
}, [providerRepository]);

    if (!provider) {
        return <p>Loading provider...</p>;
    }

    // Customer Actions

    const handlePendingBooking = () => {
        setBookingStatus(BookingStatus.PENDING);
    };

    const handleConfirmBooking = async () => {
        setBookingStatus(BookingStatus.CONFIRMED);

        await bookingRepository.updateBookingStatus(
            provider.id,
            BookingStatus.CONFIRMED
        );
    };

    const handleCancelBooking = () => {
        setBookingStatus(BookingStatus.CANCELLED);
    };

    const visibleProvider =
        getVisibleProviderLocation(
            provider,
            bookingStatus
        );

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "700px",
                margin: "0 auto",
            }}
        >
            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Provider Privacy Demo</h1>

                <button onClick={logout}>
                    Logout
                </button>
            </div>

            <hr />

            {/* User */}

            <h3>User Information</h3>

            <p>
                <strong>Name:</strong>{" "}
                {user?.name}
            </p>

            <p>
                <strong>Role:</strong>{" "}
                {user?.role}
            </p>

            <hr />

            {/* Network */}

            <h3>Network Status</h3>

            <p>
                {isOnline
                    ? "🟢 Online"
                    : "🔴 Offline"}
            </p>

            <button
                onClick={() =>
                    setIsOnline(!isOnline)
                }
            >
                {isOnline
                    ? "Go Offline"
                    : "Go Online"}
            </button>

            <hr />

            {/* Provider */}

            <h2>{provider.business_name}</h2>

            <p>
                <strong>Booking Status:</strong>{" "}
                {bookingStatus}
            </p>

            <hr />

            {/* RBAC */}

            {user?.role === "customer" ? (
                <>
                    <h3>Customer Actions</h3>

                    <button
                        onClick={
                            handlePendingBooking
                        }
                    >
                        Pending
                    </button>

                    <button
                        onClick={
                            handleConfirmBooking
                        }
                        style={{
                            marginLeft: "10px",
                        }}
                    >
                        Confirm Booking
                    </button>

                    <button
                        onClick={
                            handleCancelBooking
                        }
                        style={{
                            marginLeft: "10px",
                        }}
                    >
                        Cancel Booking
                    </button>
                </>
            ) : (
                <>
                    <h3>
                        Provider Dashboard
                    </h3>

                    <p>
                        Current Status:
                        Available
                    </p>

                    <p>
                        Today's Bookings: 3
                    </p>

                    <button>
                        Toggle Availability
                    </button>
                </>
            )}

            <hr />

            {/* Visible Location */}

            <h3>Visible Provider Location</h3>

            <p>
                <strong>Latitude:</strong>{" "}
                {visibleProvider.latitude.toFixed(
                    6
                )}
            </p>

            <p>
                <strong>Longitude:</strong>{" "}
                {visibleProvider.longitude.toFixed(
                    6
                )}
            </p>

            <p>
                <strong>Address:</strong>{" "}
                {visibleProvider.address ??
                    "Hidden until booking confirmation"}
            </p>
        </div>
    );
}