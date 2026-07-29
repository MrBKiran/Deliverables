export interface Provider {
    id: string;
    user_id: string;

    business_name: string;

    latitude: number;
    longitude: number;

    address: string;

    available: boolean;

    created_at?: string;
}