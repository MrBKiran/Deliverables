export class ConflictResolver {

    hasConflict(
        localVersion: number,
        serverVersion: number
    ): boolean {

        return localVersion < serverVersion;
    }

}