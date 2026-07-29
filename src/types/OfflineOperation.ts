export const SyncState = {
    QUEUED: "QUEUED",
    SYNCING: "SYNCING",
    SUCCESS: "SUCCESS",
    CONFLICT: "CONFLICT",
    FAILED: "FAILED",
} as const;

export type SyncState =
    (typeof SyncState)[keyof typeof SyncState];

export interface OfflineOperation {
    id: string;

    providerId: string;

    bookingStatus: string;

    createdAt: number;

    version: number;

    state: SyncState;
}