import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { AuthService } from "../shared/auth/AuthService";
import type { UserProfile, UserRole } from "./mockUser";

interface AuthContextType {
    isAuthenticated: boolean;
    user: UserProfile | null;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const authService = useMemo(
        () => new AuthService(),
        []
    );

    const [isAuthenticated, setAuthenticated] = useState(
        authService.isAuthenticated()
    );

    const [user, setUser] = useState<UserProfile | null>(
        authService.getUser()
    );

    function login(role: UserRole) {
        authService.login(role);

        setUser(authService.getUser());

        setAuthenticated(true);
    }

    function logout() {
        authService.logout();

        setUser(null);

        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}