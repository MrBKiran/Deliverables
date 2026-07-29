export class NetworkService {

    private online = true;

    isOnline(): boolean {
        return this.online;
    }

    setOnline(status: boolean): void {
        this.online = status;
    }
}