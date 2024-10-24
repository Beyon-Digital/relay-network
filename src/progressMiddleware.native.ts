import { progressMiddleware as relayProgressMiddleware, ProgressOpts } from 'react-relay-network-modern';
import { DeviceEventEmitter } from 'react-native';

export const progressMiddleware = (options: ProgressOpts) => {
    return relayProgressMiddleware({
        ...options,
        onProgress: (current, total) => {
            console.log("Downloaded: " + current + " B, total: " + total + " B");
            DeviceEventEmitter.emit('loadingProgress', { current, total });
        },
    });
};
