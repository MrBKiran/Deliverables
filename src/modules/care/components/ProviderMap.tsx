import "./leaflet";

import type { Provider } from "../../../types/provider";
import type { BookingState } from "../../../shared/types/BookingState";
import { getObfuscatedLocation } from "../services/geoObfuscation";

import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
} from "react-leaflet";

interface ProviderMapProps {
    providers: Provider[];
    activeBooking: {
        providerId: string;
        state: BookingState;
    } | null;
    onBookProvider: (provider: Provider) => void;
}
export default function ProviderMap({
    providers,
    activeBooking,
    onBookProvider,
}: ProviderMapProps) {
    if (providers.length === 0) {
        return <p>Loading providers...</p>;
    }

    const center: [number, number] = [
        providers[0].latitude,
        providers[0].longitude,
    ];

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{
                height: "500px",
                width: "100%",
                borderRadius: "10px",
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {providers.map((provider) => {
    const isConfirmed =
        activeBooking?.providerId === provider.id &&
        activeBooking.state === "CONFIRMED";

    const isPending =
        activeBooking?.providerId === provider.id &&
        activeBooking.state === "PENDING";
    
    const isRejected =
        activeBooking?.providerId === provider.id &&
        activeBooking.state === "CONFLICT_REJECTED";

    const location = isConfirmed
    ? {
          latitude: provider.latitude,
          longitude: provider.longitude,
      }
    : getObfuscatedLocation(
          provider.id,
          provider.latitude,
          provider.longitude
      );

    return (
        <Marker
            key={provider.id}
            position={[
                location.latitude,
                location.longitude,
            ]}
        >
            <Popup>
                <h3>{provider.business_name}</h3>

                {isConfirmed ? (
                    <p>
                        <strong>Address:</strong> {provider.address}
                    </p>
                ) : (
                    <p>
                        <strong>Address:</strong> Hidden until booking is
                        confirmed.
                    </p>
                )}

                <p>
                    <strong>Available:</strong>{" "}
                    {provider.available ? "Yes" : "No"}
                </p>

                {isPending && (
                    <p>
                        <strong>Status:</strong> Booking Pending Sync
                    </p>
                )}

                {isRejected && (
                    <p>
                        <strong>Status:</strong> Booking Rejected (Provider already booked)
                    </p>
                )}

                {isConfirmed && (
                    <p>
                        <strong>Status:</strong> Booking Confirmed
                    </p>
                )}

                
                <button
    disabled={isRejected}
    onClick={() => onBookProvider(provider)}
>
    {isRejected ? "Booking Rejected" : "Book Provider"}
</button>
                
            </Popup>
        </Marker>
    );
})}
        </MapContainer>
    );
}