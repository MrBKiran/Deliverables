# Security Implementation

## Deterministic Geo-Obfuscation

The application protects provider privacy by displaying an approximate location instead of the provider's exact coordinates before a booking is confirmed. The location is generated using a deterministic mathematical algorithm, ensuring that the same provider always appears at the same approximate location.

### Implementation

```typescript
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
    const R = 6371000;

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
```

---

# Algorithm Walkthrough

## Step 1: Import the Hash Function

```typescript
import { hashString } from "../../../utils/hash";
```

The algorithm begins by importing a hashing function.

Instead of generating random values every time, a deterministic hash is created from the provider's unique ID.

**Why?**

- Every provider receives a unique value.
- The value never changes unless the provider ID changes.
- The same provider always produces the same obfuscated location.

---

## Step 2: Define Constants

```typescript
const EARTH_METERS_PER_DEGREE = 111320;
const MIN_DISTANCE = 100;
const MAX_DISTANCE = 500;
```

Three constants are defined.

### EARTH_METERS_PER_DEGREE

One degree of latitude corresponds to approximately **111,320 meters**.

This constant allows the algorithm to convert offsets measured in meters into latitude and longitude values.

### MIN_DISTANCE

```typescript
100
```

The minimum distance that a provider's location may be shifted.

This prevents the pseudo-location from being almost identical to the real location.

### MAX_DISTANCE

```typescript
500
```

The maximum displacement distance.

Keeping the offset within 500 meters ensures users can still identify the provider's approximate service area while protecting the exact location.

---

## Step 3: Receive the Original Coordinates

```typescript
getObfuscatedLocation(
    providerId,
    latitude,
    longitude
)
```

The function accepts:

- Provider ID
- Original latitude
- Original longitude

These values are the inputs used to generate the pseudo-location.

---

## Step 4: Generate a Deterministic Hash

```typescript
const hash = hashString(providerId);
```

The provider ID is converted into a numeric hash.

Example:

```
Provider ID

↓

hashString()

↓

185472381
```

This hash becomes the seed for all future calculations.

Since the provider ID never changes, the hash also remains constant.

---

## Step 5: Compute the Direction

```typescript
const angleDegrees = hash % 360;
```

A circle contains 360 degrees.

The modulo operator converts the large hash value into an angle between

```
0°
and
359°
```

This determines the direction in which the marker will move.

---

## Step 6: Convert Degrees to Radians

```typescript
const angleRadians =
    angleDegrees * (Math.PI / 180);
```

JavaScript's trigonometric functions use radians rather than degrees.

The conversion is therefore required before calculating the coordinate offsets.

---

## Step 7: Compute the Offset Distance

```typescript
const distance =
    MIN_DISTANCE +
    (hash % (MAX_DISTANCE - MIN_DISTANCE + 1));
```

The same hash is reused to determine the displacement distance.

The result always falls between

```
100 meters
and
500 meters
```

This means every provider receives:

- a unique direction
- a unique distance

while remaining deterministic.

---

## Step 8: Convert Polar Coordinates into Cartesian Coordinates

```typescript
const deltaX =
    distance * Math.cos(angleRadians);

const deltaY =
    distance * Math.sin(angleRadians);
```

The calculated angle and distance represent a point in polar coordinates.

Using trigonometric functions:

- cosine calculates horizontal movement
- sine calculates vertical movement

The algorithm now knows how many meters to move east/west and north/south.

---

## Step 9: Convert Meters into Latitude

```typescript
const deltaLatitude =
    deltaY / EARTH_METERS_PER_DEGREE;
```

Latitude is measured in degrees.

The vertical distance is therefore converted from meters into degrees before being added to the original latitude.

---

## Step 10: Convert Meters into Longitude

```typescript
const deltaLongitude =
    deltaX /
    (
        EARTH_METERS_PER_DEGREE *
        Math.cos(latitude * Math.PI / 180)
    );
```

Longitude requires an additional correction.

The distance represented by one degree of longitude becomes smaller closer to the poles.

Multiplying by

```typescript
Math.cos(latitude)
```

adjusts the calculation based on the provider's latitude, ensuring the displacement remains geographically accurate.

---

## Step 11: Return the Obfuscated Coordinates

```typescript
return {
    latitude: latitude + deltaLatitude,
    longitude: longitude + deltaLongitude,
};
```

The calculated offsets are added to the original coordinates.

The returned values represent the provider's pseudo-location that is displayed to users before booking.

The original coordinates remain unchanged.

---

# Distance Verification

The second function verifies the distance between two coordinates.

```typescript
getDistanceMeters(...)
```

It implements the **Haversine Formula**, a standard algorithm used to calculate the shortest distance between two points on the Earth's surface.

This function is primarily used to verify that the generated pseudo-location remains within the expected displacement range (100–500 meters).

---


## Why I specifically used this Algorithm?

A deterministic hash-based geo-obfuscation algorithm was chosen because it provides a simple, efficient, and consistent method for protecting provider locations.

The algorithm begins by generating a numeric hash from the provider's unique ID. This hash acts as a deterministic seed, meaning the same provider will always produce the same output. The hash is then used to derive two values:

- **Direction (0°–359°):** Calculated using the modulo operator (`hash % 360`), ensuring the obfuscated location can lie in any direction around the original position.
- **Distance (100–500 meters):** Calculated using the hash to produce a displacement within a predefined range. This keeps the pseudo-location close enough to indicate the provider's service area while preventing exposure of the exact location.

The direction and distance form a polar coordinate, which is converted into latitude and longitude offsets using trigonometric functions (`cos` and `sin`). These offsets are then added to the original coordinates to generate the obfuscated location. Longitude is additionally adjusted using the cosine of the latitude to account for the Earth's curvature, ensuring the displacement remains approximately the same physical distance regardless of geographic location.

This algorithm was chosen because it satisfies the project's key requirements:

- **Deterministic:** The same provider always appears at the same obfuscated location, providing a consistent user experience.
- **Privacy-preserving:** The actual coordinates are never exposed before booking confirmation.
- **Computationally efficient:** The algorithm performs only basic arithmetic and trigonometric operations, resulting in constant time (**O(1)**) and constant space (**O(1)**) complexity.
- **Stateless:** The obfuscated coordinates are computed on demand, eliminating the need to store additional location data in the database.

Overall, this approach provides an effective balance between location privacy, usability, and implementation simplicity while meeting the functional requirements of the application.