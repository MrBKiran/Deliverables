import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./AppLayout.css";


export default function AppLayout() {
    const { logout } = useAuth();
    return (
        <div>
            <header className="navbar">
                <h2>Geo Privacy Super App</h2>

                <nav>
                    <Link to="/sports">Sports</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/care">Care</Link>

                    <button onClick={logout}>
                        Logout
                    </button>
                </nav>
            </header>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}