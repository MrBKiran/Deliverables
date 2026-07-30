import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(): State {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Unexpected UI error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-red-600">
                        Something went wrong
                    </h2>

                    <p className="mt-2 text-gray-600">
                        An unexpected error occurred while rendering this page.
                    </p>

                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={this.handleRetry}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}