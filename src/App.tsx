import { useAuth } from "./auth/AuthContext";
import Login from "./shared/auth/Login";
import RootNavigator from "./app/navigation/RootNavigator";
import ErrorBoundary from "./modules/care/components/ErrorBoundary";

function App() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Login />;
    }

    return (
    <ErrorBoundary>
        <RootNavigator />
    </ErrorBoundary>
);
}

export default App;