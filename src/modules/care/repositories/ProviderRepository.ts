import { supabase } from "../../../lib/supabase";
import type { Provider } from "../../../types/provider";

export class ProviderRepository {

    async getAllProviders(): Promise<Provider[]> {

        const { data, error } = await supabase
            .from("providers")
            .select("*");

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
}