export type UserRole = "customer" | "provider";

export interface UserProfile {
    id: string;
    name: string;
    role: UserRole;
}

export const customerUser: UserProfile = {
    id: "b5e951b7-7fb5-4281-b90d-e3a2725ce838",
    name: "John Doe",
    role: "customer",
};

export const providerUser: UserProfile = {
    id: "2328eacb-1702-4cb3-b53c-df2a6e5c54f7",
    name: "Dr. Sarah Smith",
    role: "provider",
};


export const mockJwt = "mock-jwt-token";