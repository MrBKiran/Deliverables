import { supabase } from "../../../lib/supabase";
import type { Provider } from "../../../types/provider";

export class ProviderRepository {

    async getAllProviders(): Promise<Provider[]> {

        const { data, error } = await supabase
            .from("providers")
            .select("*")
            .eq("available", true);

        if (error) {
            console.error("Error fetching providers:", error);
            return [];
        }

        return data as Provider[];
    }

    async getProviderById(id: string): Promise<Provider | undefined> {

        const { data, error } = await supabase
            .from("providers")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching provider:", error);
            return undefined;
        }

        return data as Provider;
    }

    async updateAvailabilityByUserId(
    userId: string,
    available: boolean
): Promise<boolean> {

    console.log("Updating user_id:", userId);
    console.log("New availability:", available);

    const { data, error } = await supabase
        .from("providers")
        .update({ available })
        .eq("user_id", userId)
        .select();

    console.log("Updated rows:", data);
    console.log("Supabase error:", error);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

    async getProviderByUserId(
    userId: string
): Promise<Provider | undefined> {
    const { data, error } = await supabase
        .from("providers")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error("Error fetching provider:", error);
        return undefined;
    }

    return data as Provider;
}
}