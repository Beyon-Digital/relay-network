import { progressMiddleware as relayProgressMiddleware, ProgressOpts } from 'react-relay-network-modern';

export const progressMiddleware = (options: ProgressOpts) => {
    return relayProgressMiddleware({
        ...options,
        onProgress: (current, total) => {
            console.log("Downloaded: " + current + " B, total: " + total + " B");
            const event = new CustomEvent("loadingProgress", {
                detail: { current, total }
            });
            window.dispatchEvent(event);
        },
    });
};
