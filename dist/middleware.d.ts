import { Middleware, RelayNetworkLayerOpts } from "react-relay-network-modern";
export declare const dev: boolean;
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
}
/**
 * Function to build an array of middlewares for Relay Network Layer
 *
 * @param {MiddlewareBuilderProps} props - The properties for building the middleware.
 * @returns {Array<Middleware>} - An array of middlewares.
 */
export declare const middlewares: ({ url, apiToken, token, extraHeaders, extraMiddleware }: MiddlewareBuilderProps) => Array<Middleware>;
