import { useAuth } from "../../auth/AuthContext";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const {
        isAuthenticated,
    } = useAuth();

    if (!isAuthenticated) {

        return (
            <p>
                Please log in.
            </p>
        );
    }

    return <>{children}</>;
}