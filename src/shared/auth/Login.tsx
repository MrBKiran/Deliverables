import { useAuth } from "../../auth/AuthContext";

export default function Login() {
    const { login } = useAuth();

    return (
        <div
            style={{
                padding: "40px",
                textAlign: "center",
            }}
        >
            <h1>Geo Privacy Demo</h1>

            <p>Select a role to log in.</p>

            <button
                onClick={() => login("customer")}
            >
                Login as Customer
            </button>

            <button
                onClick={() => login("provider")}
                style={{
                    marginLeft: "10px",
                }}
            >
                Login as Provider
            </button>
        </div>
    );
}