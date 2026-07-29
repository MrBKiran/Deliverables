import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

interface AppState {
    isOnline: boolean;
    setIsOnline: (value: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [isOnline, setIsOnline] = useState(true);

    return (
        <AppContext.Provider
            value={{
                isOnline,
                setIsOnline,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppState() {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppState must be used inside AppProvider"
        );
    }

    return context;
}