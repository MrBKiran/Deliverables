import type { OfflineOperation } from "../types/OfflineOperation";

const STORAGE_KEY = "offline_queue";

export class StorageService {

    saveQueue(queue: OfflineOperation[]): void {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(queue)
        );
    }

    loadQueue(): OfflineOperation[] {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        return JSON.parse(data) as OfflineOperation[];
    }

    clearQueue(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
}