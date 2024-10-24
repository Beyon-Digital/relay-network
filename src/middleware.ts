import {
    urlMiddleware,
    retryMiddleware,
    authMiddleware,
    cacheMiddleware,
    uploadMiddleware,
    Middleware,
    RelayRequestAny,
    errorMiddleware,
    loggerMiddleware,
    perfMiddleware,
    RelayNetworkLayerOpts,
} from "react-relay-network-modern";
import { progressMiddleware } from "./progressMiddleware";

// constants
export const dev = process.env.NODE_ENV === "development";

/**
 * Interface for MiddlewareBuilderProps
 */
export interface MiddlewareBuilderProps {
    url: string;
    apiToken: string;
    token?: string;
    extraHeaders?: Record<string, string>;
    extraMiddleware?: Middleware[];
    networkOpts?: RelayNetworkLayerOpts;
};

/**
 * Function to build an array of middlewares for Relay Network Layer
 *
 * @param {MiddlewareBuilderProps} props - The properties for building the middleware.
 * @returns {Array<Middleware>} - An array of middlewares.
 */
export const middlewares = ({ url, apiToken, token, extraHeaders, extraMiddleware }: MiddlewareBuilderProps): Array<Middleware> => {
    const commonHeaders = {
        "Access-Control-Allow-Origin": "true",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Credentials": "true",
        "CLIENT-ID": apiToken,
        "Access-Control-Allow-Headers": "API, Content-Type, Dnt, Origin, User-Agent, csrftoken, X-CSRFToken, Access-Control-Allow-Origin, AUTHORIZATION",
    };

    const devMiddlewares = dev ? [
        errorMiddleware({
            "prefix": "[Relay Network] Error - ",
        }),
        loggerMiddleware({
            "logger": (event: any) => console.log("Relay Request: ", event)
        }),
        perfMiddleware({
            "logger": (event: any) => console.log("Perf: ", event)
        })
    ] : [];

    return [
        cacheMiddleware({
            size: 100, // max 100 requests
            "ttl": 900000, // 250 minutes
            "allowMutations": true,
            "allowFormData": true,
        }),
        urlMiddleware({
            url: () => Promise.resolve(url),
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: (req: RelayRequestAny) => ({
                ...commonHeaders,
                "X-CSRFToken": req.fetchOpts.headers["X-CSRFToken"] ?? "",
                "csrftoken": req.fetchOpts.headers["csrftoken"] ?? "",
                ...extraHeaders
            }),
            "cache": "reload",
            "redirect": "follow",
        }),
        authMiddleware({
            token,
            allowEmptyToken: true,
            header: "AUTHORIZATION",
            "prefix": "Bearer "
        }),
        retryMiddleware({
            fetchTimeout: 360,
            retryDelays: (attempt) => Math.pow(2, attempt + 4) * 100, // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
            beforeRetry: ({ forceRetry, abort, delay, attempt, lastError, req }) => {
                if (attempt > 10) abort();
                console.log("call `forceRelayRetry()` for immediately retry! Or wait " + delay + " ms.");
            },
            statusCodes: [500, 503, 504],
            "logger": (event: any) => console.log("Retry: ", event)
        }),
        progressMiddleware({
            onProgress: (current, total) => {
                console.log("Downloaded: " + current + " B, total: " + total + " B");
            },
            "sizeHeader": "X-Transfer-Size"
        }),
        uploadMiddleware(),
        ...devMiddlewares,
        ...(extraMiddleware ?? [])
    ];
};
