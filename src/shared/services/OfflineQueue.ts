import type { OfflineOperation } from "../../types/OfflineOperation";
import { StorageService } from "../../services/StorageService";

export class OfflineQueue {

    private storage = new StorageService();

    private queue: OfflineOperation[];

    constructor() {
        this.queue = this.storage.loadQueue();
    }

    enqueue(operation: OfflineOperation): void {
        this.queue.push(operation);
        this.storage.saveQueue(this.queue);
    }

    peek(): OfflineOperation | undefined {
    return this.queue[0];
    }

    dequeue(): OfflineOperation | undefined {
        const operation = this.queue.shift();
        this.storage.saveQueue(this.queue);
        return operation;
    }

    removeFirst(): void {
    this.queue.shift();
    this.storage.saveQueue(this.queue);
    }

    getAll(): OfflineOperation[] {
        return [...this.queue];
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    clear(): void {
        this.queue = [];
        this.storage.clearQueue();
    }

    
}