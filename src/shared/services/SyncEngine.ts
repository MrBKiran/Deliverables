import { OfflineQueue } from "./OfflineQueue";
import { SyncState } from "../../types/OfflineOperation";
import { ConflictResolver } from "./ConflictResolver";
import { NetworkService } from "./NetworkService";

export class SyncEngine {

    private queue: OfflineQueue;
    private resolver = new ConflictResolver();
    private network = new NetworkService();

    constructor(queue: OfflineQueue) {
        this.queue = queue;
    }

    async sync(): Promise<boolean> {

        if (!this.network.isOnline()) {
    console.log("Offline. Operations remain queued.");
    return false;
}

        console.log("Starting sync...");

        while (!this.queue.isEmpty()) {

            const operation = this.queue.peek();

            if (!operation) {
                continue;
            }

            operation.state = SyncState.SYNCING;

            console.log("Syncing:", operation.id);

            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );

            // Simulatinh server version
            const simulateConflict = false; // Change this thing to true fer test conflicts

            const serverVersion = simulateConflict
            ? operation.version + 1
            : operation.version;

            if (
                this.resolver.hasConflict(
                    operation.version,
                    serverVersion
                )
            ) {

                operation.state = SyncState.CONFLICT;

                console.log(
                    "Conflict detected:",
                    operation.id
                );
                return false;

            } else {

                operation.version =
                    serverVersion + 1;

                operation.state =
                    SyncState.SUCCESS;

                console.log(
                    "Successfully synced:",
                    operation.id
                );
                this.queue.removeFirst();


            }

            console.log(
                "Finished:",
                operation.id
            );
        }

        console.log("Queue is empty.");
        return true;
    }

    getNetworkService() {
        return this.network;
    }
}