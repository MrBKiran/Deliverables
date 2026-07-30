import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import SportsHome from "../../modules/sports/screens/SportsHome";
import EventsHome from "../../modules/events/screens/EventsHome";
import CareHome from "../../modules/care/screens/CareHome";
import ProviderDashboard from "../../modules/care/screens/ProviderDashboard";
import ProtectedRoute from "../../shared/auth/ProtectedRoute";
import { useAuth } from "../../auth/AuthContext";


export default function RootNavigator() {
    const { role } = useAuth();
    return (
        <Routes>
            <Route
                path="care/provider-dashboard"
                element={
                    <ProtectedRoute allowedRoles={["provider"]}>
                        <ProviderDashboard />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<AppLayout />}>

                <Route
                    index
                    element={<Navigate to="/sports" replace />}
                />

                <Route
                    path="sports"
                    element={<SportsHome />}
                />

                <Route
                    path="events"
                    element={<EventsHome />}
                />

                <Route
    path="care"
    element={
        role === "provider" ? (
            <Navigate
                to="/care/provider-dashboard"
                replace
            />
        ) : (
            <ProtectedRoute allowedRoles={["customer"]}>
                <CareHome />
            </ProtectedRoute>
        )
    }
/>

            </Route>
        </Routes>
    );
}