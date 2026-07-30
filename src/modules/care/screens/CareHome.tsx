import { useLocation } from "react-router-dom";
import type { SportsBooking } from "../../../shared/types/SportsBooking";
import { ProviderRepository } from "../repositories/ProviderRepository";
import ProviderMap from "../components/ProviderMap";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Provider } from "../../../types/provider";
import type { BookingState } from "../../../shared/types/BookingState";
import { OfflineQueue } from "../../../shared/services/OfflineQueue";
import { SyncEngine } from "../../../shared/services/SyncEngine";
import { SyncState } from "../../../types/OfflineOperation";
import ProviderSkeleton from "../components/ProviderSkeleton";



export default function CareHome() {
    const location = useLocation();
    const booking = location.state as SportsBooking | undefined;

    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeBooking, setActiveBooking] = useState<{
    providerId: string;
    state: BookingState;
    } | null>(null);

    const [syncStatus, setSyncStatus] = useState<SyncState | null>(null);

    const offlineQueue = useMemo(() => new OfflineQueue(), []);

    const syncEngine = useMemo(
    () => new SyncEngine(offlineQueue),
    [offlineQueue]
    );
    
    const repository = useMemo(
    () => new ProviderRepository(),
    []
);


    const loadProviders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
        const data = await repository.getAllProviders();
        setProviders(data);
    } catch (err: unknown) {
        console.error(err);
        setError("Failed to load providers.");
    } finally {
        setLoading(false);
    }
}, [repository]);

        useEffect(() => {
    loadProviders();
}, [loadProviders]);

    const handleBookProvider = async (provider: Provider) => {
    if (!booking) {
        alert("Please make a sports booking first.");
        return;
    }

    const careBooking = {
        providerId: provider.id,
        providerName: provider.business_name,
        sport: booking.sport,
        date: booking.date,
        time: booking.time,
        createdAt: new Date().toISOString(),
        state: "PENDING" as BookingState,
    };

    console.log("Care Booking:", careBooking);

    offlineQueue.enqueue({
    id: crypto.randomUUID(),
    providerId: provider.id,
    bookingStatus: "PENDING",
    createdAt: Date.now(),
    version: 1,
    state: SyncState.QUEUED,
});

    setSyncStatus(SyncState.QUEUED);

    setActiveBooking({
    providerId: provider.id,
    state: "PENDING",
});

setSyncStatus(SyncState.SYNCING);

const synced = await syncEngine.sync();

if (synced) {
    setSyncStatus(SyncState.SUCCESS);

    setActiveBooking({
        providerId: provider.id,
        state: "CONFIRMED",
    });
} else {
    setSyncStatus(SyncState.CONFLICT);

setActiveBooking({
    providerId: provider.id,
    state: "CONFLICT_REJECTED",
});

alert(
    "Booking could not be synchronized because the provider was already booked."
);
}
};

if (loading) {
    return <ProviderSkeleton />;
}

if (error) {
    return (
        <div className="text-center p-6">
    <h2 className="text-xl font-semibold text-red-600">
        Unable to load providers
    </h2>

    <p className="mt-2 text-gray-600">
        Please check your network connection and try again.
    </p>

    <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={loadProviders}
    >
        Retry
    </button>
</div>
    );
}

if (providers.length === 0) {
    return (
        <div className="text-center p-6">
    <h2 className="text-xl font-semibold">
        No providers available
    </h2>

    <p className="mt-2 text-gray-600">
        There are currently no childcare providers available.
    </p>

    <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={loadProviders}
    >
        Refresh
    </button>
</div>
    );
}
    return (
        <div>
            <h1>Care Module</h1>

            {booking ? (
                <>
                    <h3>Booking Received</h3>

                    <p>
                        <strong>Sport:</strong> {booking.sport}
                    </p>

                    <p>
                        <strong>Date:</strong> {booking.date}
                    </p>

                    <p>
                        <strong>Time:</strong> {booking.time}
                    </p>

                    <hr />

                    {syncStatus && (
    <p>
        <strong>Sync Status:</strong> {syncStatus}
    </p>
)}

                    <ProviderMap
    providers={providers}
    activeBooking={activeBooking}
    onBookProvider={handleBookProvider}
/>
                </>
            ) : (
                <>
                <p>
                    Browse childcare providers.
                </p>
                <ProviderMap
    providers={providers}
    activeBooking={activeBooking}
    onBookProvider={handleBookProvider}
/>
                </>
            )}
        </div>
    );
}