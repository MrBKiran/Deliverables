import { supabase } from "../../lib/supabase";

import { OfflineQueue } from "../services/OfflineQueue";
import { SyncEngine } from "../services/SyncEngine";
import { SyncState } from "../../types/OfflineOperation";

import type { BookingStatus } from "../../services/bookingState";
import type { OfflineOperation } from "../../types/OfflineOperation";

import { customerUser } from "../../auth/mockUser";

export class BookingRepository {

    private queue = new OfflineQueue();
    private syncEngine = new SyncEngine(this.queue);

    async updateBookingStatus(
        providerId: string,
        status: BookingStatus
    ): Promise<boolean> {

        const operation: OfflineOperation = {
            id: crypto.randomUUID(),
            providerId,
            bookingStatus: status,
            createdAt: Date.now(),
            version: 1,
            state: SyncState.QUEUED,
        };

        // Store operation locally
        this.queue.enqueue(operation);

        console.log("Operation queued:", operation);

        // If online, save to Supabase
        const network = this.syncEngine.getNetworkService();

        if (network.isOnline()) {

            const { error } = await supabase
                .from("bookings")
                .insert({
                    customer_id: customerUser.id,
                    provider_id: providerId,
                    status: status,
                    version: 1,
                });

            if (error) {
                console.error("Supabase booking error:", error);
            } else {
                console.log("Booking stored in Supabase.");
            }
        }

        // Continue existing sync logic
        await this.syncEngine.sync();

        return true;
    }
}