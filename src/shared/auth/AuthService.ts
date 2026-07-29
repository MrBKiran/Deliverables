import {
    customerUser,
    providerUser,
    mockJwt,
    type UserRole,
} from "../../auth/mockUser";

export class AuthService {

    login(role: UserRole): void {

        const user =
            role === "customer"
                ? customerUser
                : providerUser;

        localStorage.setItem("jwt", mockJwt);

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
    }

    logout(): void {

        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
    }

    isAuthenticated(): boolean {

        return localStorage.getItem("jwt") !== null;
    }

    getUser() {

        const user =
            localStorage.getItem("user");

        return user
            ? JSON.parse(user)
            : null;
    }
}