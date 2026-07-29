import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Provider from "./pages/Provider";

function App() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated
        ? <Provider />
        : <Login />;
}

export default App;