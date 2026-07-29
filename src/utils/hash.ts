export function hashString(text: string): number {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}
//console.log(hashString("provider1"));
//console.log(hashString("provider1"));
//console.log(hashString("provider2"));