import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { ProviderRepository } from "../repositories/ProviderRepository";

export default function ProviderDashboard() {
    const { user } = useAuth();

    const repository = useMemo(
        () => new ProviderRepository(),
        []
    );

    const [available, setAvailable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        async function loadProvider() {
            if (!user) return;

            const provider =
                await repository.getProviderByUserId(user.id);

            if (provider) {
                setAvailable(provider.available);
            }

            setLoading(false);
        }

        loadProvider();
    }, [repository, user]);

    async function toggleAvailability() {
        
        if (!user) return;

        setUpdating(true);

        const newAvailability = !available;

        const success =
            await repository.updateAvailabilityByUserId(
                user.id,
                newAvailability
            );

        if (success) {
            setAvailable(newAvailability);
        }
        setUpdating(false);
    }

    if (loading) {
        return <p>Loading provider information...</p>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Provider Dashboard</h1>

            <p>
                Welcome, <strong>{user?.name}</strong>
            </p>

            <p>
                Current Status:{" "}
                <strong>
                    {available
                        ? "Available"
                        : "Unavailable"}
                </strong>
            </p>

            <button 
            disabled={updating}
            onClick={toggleAvailability}>
                {updating
                    ? "Updating..."
                    : available
                        ? "Go Offline"
                        : "Go Online"}
            </button>
        </div>
    );
}