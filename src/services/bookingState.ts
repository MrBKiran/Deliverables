import { getObfuscatedLocation } from "../modules/care/services/geoObfuscation";

import type { Provider } from "../types/provider";

export const BookingStatus = {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    CANCELLED: "CANCELLED",
} as const;

export type BookingStatus =
    (typeof BookingStatus)[keyof typeof BookingStatus];



export function getVisibleProviderLocation(
    provider: Provider,
    bookingStatus: BookingStatus
) {

    if (bookingStatus === BookingStatus.CONFIRMED) {
        return {
            latitude: provider.latitude,
            longitude: provider.longitude,
            address: provider.address
        };
    }

    const fakeLocation = getObfuscatedLocation(
        provider.id,
        provider.latitude,
        provider.longitude
    );

    return {
        latitude: fakeLocation.latitude,
        longitude: fakeLocation.longitude,
        address: null
    };
}