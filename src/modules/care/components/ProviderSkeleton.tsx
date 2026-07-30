export default function ProviderSkeleton() {
    return (
        <div className="animate-pulse p-6 space-y-6">
            <div className="h-8 w-56 bg-gray-300 rounded"></div>

            <div className="space-y-3">
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
                <div className="h-4 w-64 bg-gray-300 rounded"></div>
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>

            <div className="h-[500px] w-full bg-gray-200 rounded-lg"></div>
        </div>
    );
}