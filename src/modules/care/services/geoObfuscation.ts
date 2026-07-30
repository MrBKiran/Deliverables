import { hashString } from "../../../utils/hash";

const EARTH_METERS_PER_DEGREE = 111320;
const MIN_DISTANCE = 100;
const MAX_DISTANCE = 500;

export function getObfuscatedLocation(
    providerId: string,
    latitude: number,
    longitude: number
) {
    const hash = hashString(providerId);

    const angleDegrees = hash % 360;
    const angleRadians = angleDegrees * (Math.PI / 180);

    const distance =
        MIN_DISTANCE +
        (hash % (MAX_DISTANCE - MIN_DISTANCE + 1));

    const deltaX = distance * Math.cos(angleRadians);
    const deltaY = distance * Math.sin(angleRadians);

    const deltaLatitude = deltaY / EARTH_METERS_PER_DEGREE;

    const deltaLongitude =
        deltaX /
        (EARTH_METERS_PER_DEGREE *
            Math.cos(latitude * Math.PI / 180));

    return {
        latitude: latitude + deltaLatitude,
        longitude: longitude + deltaLongitude,
    };
}
export function getDistanceMeters(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371000; // Earth's radius in meters

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}