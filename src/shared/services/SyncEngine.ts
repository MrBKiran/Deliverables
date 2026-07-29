import { OfflineQueue } from "./OfflineQueue";
import { SyncState } from "../../types/OfflineOperation";
import { ConflictResolver } from "./ConflictResolver";
import { NetworkService } from "./NetworkService";

export class SyncEngine {

    private queue = new OfflineQueue();
    private resolver = new ConflictResolver();
    private network = new NetworkService();

    async sync(): Promise<void> {

        if (!this.network.isOnline()) {
            console.log("Offline. Operations remain queued.");
            return;
        }

        console.log("Starting sync...");

        while (!this.queue.isEmpty()) {

            const operation = this.queue.dequeue();

            if (!operation) {
                continue;
            }

            operation.state = SyncState.SYNCING;

            console.log("Syncing:", operation.id);

            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );

            // Simulate server version
            const serverVersion =
                operation.version +
                Math.floor(Math.random() * 2);

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

            } else {

                operation.version =
                    serverVersion + 1;

                operation.state =
                    SyncState.SUCCESS;

                console.log(
                    "Successfully synced:",
                    operation.id
                );
            }

            console.log(
                "Finished:",
                operation.id
            );
        }

        console.log("Queue is empty.");
    }

    getNetworkService() {
        return this.network;
    }
}