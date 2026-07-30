import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import type { UserRole } from "../types/UserRole";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
    children,
    allowedRoles,
}: ProtectedRouteProps) {
    const {
        isAuthenticated,
        role,
    } = useAuth();

    // Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Logged in but doesn't have permission
    if (
        allowedRoles &&
        (!role || !allowedRoles.includes(role))
    ) {
        return (
            <div style={{ padding: "2rem" }}>
                <h2>Access Denied</h2>
                <p>
                    You do not have permission to access this page.
                </p>
            </div>
        );
    }

    return <>{children}</>;
}